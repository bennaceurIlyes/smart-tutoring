from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from django.db.models import Count, Avg, Sum
from accounts.decorators import student_required, tutor_required, admin_required
from bookings.models import Booking
from accounts.models import User
from tutors.models import TutorProfile
from reviews.models import Review
from notifications.models import Notification


@login_required
def dashboard_redirect(request):
    """Redirect user to the appropriate dashboard based on role."""
    user = request.user
    if user.is_admin_user:
        return redirect('dashboard:admin')
    elif user.is_tutor:
        return redirect('dashboard:tutor')
    return redirect('dashboard:student')


@login_required
@student_required
def student_dashboard(request):
    user = request.user
    now = timezone.now()

    upcoming = Booking.objects.filter(
        student=user,
        status='confirmed',
        scheduled_time__gte=now
    ).select_related('tutor', 'subject').order_by('scheduled_time')[:5]

    recent = Booking.objects.filter(
        student=user
    ).select_related('tutor', 'subject').order_by('-scheduled_time')[:10]

    pending = Booking.objects.filter(student=user, status='pending').count()
    completed_total = Booking.objects.filter(student=user, status='completed').count()
    total_spent = Booking.objects.filter(
        student=user, status='completed'
    ).aggregate(total=Sum('total_price'))['total'] or 0

    # Sessions needing review
    needs_review = Booking.objects.filter(
        student=user,
        status='completed'
    ).exclude(review__isnull=False)[:3]

    return render(request, 'dashboard/student_dashboard.html', {
        'upcoming_bookings': upcoming,
        'recent_bookings': recent,
        'pending_count': pending,
        'completed_total': completed_total,
        'total_spent': total_spent,
        'needs_review': needs_review,
    })


@login_required
@tutor_required
def tutor_dashboard(request):
    user = request.user
    now = timezone.now()

    upcoming = Booking.objects.filter(
        tutor=user,
        status='confirmed',
        scheduled_time__gte=now
    ).select_related('student', 'subject').order_by('scheduled_time')[:5]

    pending_requests = Booking.objects.filter(
        tutor=user, status='pending'
    ).select_related('student', 'subject').order_by('created_at')

    recent_reviews = Review.objects.filter(
        tutor=user, is_approved=True
    ).select_related('student').order_by('-created_at')[:5]

    total_earnings = Booking.objects.filter(
        tutor=user, status='completed'
    ).aggregate(total=Sum('total_price'))['total'] or 0

    try:
        tutor_profile = user.tutor_profile
    except Exception:
        tutor_profile = None

    return render(request, 'dashboard/tutor_dashboard.html', {
        'upcoming_bookings': upcoming,
        'pending_requests': pending_requests,
        'recent_reviews': recent_reviews,
        'total_earnings': total_earnings,
        'tutor_profile': tutor_profile,
    })


@login_required
@admin_required
def admin_dashboard(request):
    # Platform stats
    total_students = User.objects.filter(role='student').count()
    total_tutors = User.objects.filter(role='tutor').count()
    total_bookings = Booking.objects.count()
    total_revenue = Booking.objects.filter(
        status='completed'
    ).aggregate(total=Sum('total_price'))['total'] or 0

    recent_users = User.objects.order_by('-date_joined')[:10]
    recent_bookings = Booking.objects.select_related('student', 'tutor', 'subject').order_by('-created_at')[:10]
    pending_bookings = Booking.objects.filter(status='pending').count()

    booking_stats = {
        'pending': Booking.objects.filter(status='pending').count(),
        'confirmed': Booking.objects.filter(status='confirmed').count(),
        'completed': Booking.objects.filter(status='completed').count(),
        'cancelled': Booking.objects.filter(status='cancelled').count(),
    }

    return render(request, 'dashboard/admin_dashboard.html', {
        'total_students': total_students,
        'total_tutors': total_tutors,
        'total_bookings': total_bookings,
        'total_revenue': total_revenue,
        'recent_users': recent_users,
        'recent_bookings': recent_bookings,
        'pending_bookings': pending_bookings,
        'booking_stats': booking_stats,
    })
def tutor_search(request):
    tutors = User.objects.filter(groups__name='Tuteur')
    query = request.GET.get('q', '')
    if query:
        tutors = tutors.filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(tutorprofile__bio__icontains=query)
        )
    return render(request, 'accounts/tutor_list.html', {'tutors': tutors, 'query': query})

def book_session(request, tutor_id):
    return render(request, 'dashboard/book_session.html', {'tutor_id': tutor_id})