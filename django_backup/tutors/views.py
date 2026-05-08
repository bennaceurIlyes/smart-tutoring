from django.shortcuts import render, get_object_or_404
from django.db.models import Q
from .models import TutorProfile, Subject
from accounts.models import User


def tutor_list(request):
    """Browse and search tutors."""
    tutors = TutorProfile.objects.filter(is_available=True).select_related('user').prefetch_related('subjects')

    # ── Filters ──────────────────────────────────────────────────────────────
    subject_id = request.GET.get('subject')
    min_rate = request.GET.get('min_rate')
    max_rate = request.GET.get('max_rate')
    min_rating = request.GET.get('min_rating')
    query = request.GET.get('q', '').strip()
    sort = request.GET.get('sort', '-average_rating')

    if query:
        tutors = tutors.filter(
            Q(user__first_name__icontains=query) |
            Q(user__last_name__icontains=query) |
            Q(subjects__name__icontains=query) |
            Q(user__bio__icontains=query)
        ).distinct()

    if subject_id:
        tutors = tutors.filter(subjects__id=subject_id)

    if min_rate:
        tutors = tutors.filter(hourly_rate__gte=min_rate)

    if max_rate:
        tutors = tutors.filter(hourly_rate__lte=max_rate)

    if min_rating:
        tutors = tutors.filter(average_rating__gte=min_rating)

    # Sort
    allowed_sorts = ['-average_rating', 'average_rating', 'hourly_rate', '-hourly_rate', '-total_lessons']
    if sort in allowed_sorts:
        tutors = tutors.order_by(sort)

    subjects = Subject.objects.all()

    return render(request, 'tutors/tutor_list.html', {
        'tutors': tutors,
        'subjects': subjects,
        'selected_subject': subject_id,
        'query': query,
        'sort': sort,
        'min_rate': min_rate or '',
        'max_rate': max_rate or '',
        'min_rating': min_rating or '',
        'total_count': tutors.count(),
    })


def tutor_detail(request, pk):
    """Tutor public profile page."""
    tutor_profile = get_object_or_404(
        TutorProfile.objects.select_related('user').prefetch_related('subjects', 'availability'),
        pk=pk
    )
    reviews = tutor_profile.user.reviews_received.filter(is_approved=True).select_related('student')[:10]
    return render(request, 'tutors/tutor_detail.html', {
        'tutor': tutor_profile,
        'reviews': reviews,
    })
def tutor_search(request):
    query = request.GET.get('q', '')
    subject = request.GET.get('subject', '')
    
    # Récupérer tous les tuteurs (groupe 'Tuteur')
    tutors = User.objects.filter(groups__name='Tuteur').select_related('tutorprofile')
    
    # Filtrer par recherche
    if query:
        tutors = tutors.filter(
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query) |
            Q(tutorprofile__bio__icontains=query)
        )
    
    # Filtrer par matière
    if subject:
        tutors = tutors.filter(tutorprofile__subjects__name__icontains=subject)
    
    return render(request, 'dashboard/tutor_search.html', {
        'tutors': tutors,
        'query': query,
        'subject': subject,
    })