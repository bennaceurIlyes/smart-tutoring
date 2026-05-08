from django import forms
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils import timezone
from .models import Booking
from tutors.models import TutorProfile, Subject
from accounts.models import User
from accounts.decorators import student_required, tutor_required
from notifications.models import create_notification, Notification


# ─── Forms ─────────────────────────────────────────────────────────────────────
class BookingForm(forms.ModelForm):
    scheduled_time = forms.DateTimeField(
        widget=forms.DateTimeInput(attrs={'class': 'form-control', 'type': 'datetime-local'}),
        input_formats=['%Y-%m-%dT%H:%M']
    )
    duration_minutes = forms.ChoiceField(
        choices=[(30, '30 min'), (60, '1 hour'), (90, '1.5 hours'), (120, '2 hours')],
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    session_type = forms.ChoiceField(
        choices=Booking.SESSION_TYPES,
        widget=forms.Select(attrs={'class': 'form-select'})
    )
    notes = forms.CharField(required=False,
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3,
                                     'placeholder': 'Any specific topics or questions?'}))

    class Meta:
        model = Booking
        fields = ['subject', 'scheduled_time', 'duration_minutes', 'session_type', 'notes']

    def __init__(self, *args, tutor=None, **kwargs):
        super().__init__(*args, **kwargs)
        if tutor:
            self.fields['subject'] = forms.ModelChoiceField(
                queryset=tutor.tutor_profile.subjects.all(),
                widget=forms.Select(attrs={'class': 'form-select'}),
                empty_label="Select a subject"
            )

    def clean_scheduled_time(self):
        dt = self.cleaned_data.get('scheduled_time')
        if dt and dt < timezone.now():
            raise forms.ValidationError("Scheduled time must be in the future.")
        return dt


# ─── Views ─────────────────────────────────────────────────────────────────────
@login_required
@student_required
def book_tutor(request, tutor_pk):
    """Student books a session with a tutor."""
    tutor = get_object_or_404(User, pk=tutor_pk, role='tutor')
    tutor_profile = get_object_or_404(TutorProfile, user=tutor)

    if request.method == 'POST':
        form = BookingForm(request.POST, tutor=tutor)
        if form.is_valid():
            booking = form.save(commit=False)
            booking.student = request.user
            booking.tutor = tutor
            booking.hourly_rate = tutor_profile.hourly_rate
            booking.status = Booking.STATUS_PENDING
            booking.save()

            # Notify tutor
            create_notification(
                user=tutor,
                notification_type=Notification.TYPE_BOOKING_REQUEST,
                title='New Booking Request',
                message=f"{request.user.get_full_name()} has requested a session on {booking.scheduled_time.strftime('%b %d, %Y at %H:%M')}.",
                link=f'/bookings/{booking.pk}/'
            )

            messages.success(request, "Booking request sent! The tutor will confirm shortly.")
            return redirect('bookings:detail', pk=booking.pk)
    else:
        form = BookingForm(tutor=tutor)

    return render(request, 'bookings/booking_form.html', {
        'form': form,
        'tutor': tutor,
        'tutor_profile': tutor_profile,
    })


@login_required
def booking_detail(request, pk):
    booking = get_object_or_404(Booking, pk=pk)
    # Only the student or tutor can view
    if request.user not in [booking.student, booking.tutor] and not request.user.is_admin_user:
        messages.error(request, "You don't have permission to view this booking.")
        return redirect('dashboard:redirect')
    return render(request, 'bookings/booking_detail.html', {'booking': booking})


@login_required
@tutor_required
def confirm_booking(request, pk):
    booking = get_object_or_404(Booking, pk=pk, tutor=request.user, status=Booking.STATUS_PENDING)
    booking.status = Booking.STATUS_CONFIRMED
    booking.save()
    create_notification(
        user=booking.student,
        notification_type=Notification.TYPE_BOOKING_CONFIRMED,
        title='Booking Confirmed!',
        message=f"Your session with {booking.tutor.get_full_name()} on {booking.scheduled_time.strftime('%b %d at %H:%M')} is confirmed.",
        link=f'/bookings/{booking.pk}/'
    )
    messages.success(request, "Booking confirmed successfully.")
    return redirect('bookings:detail', pk=pk)


@login_required
def cancel_booking(request, pk):
    booking = get_object_or_404(Booking, pk=pk)
    if request.user not in [booking.student, booking.tutor]:
        messages.error(request, "Permission denied.")
        return redirect('dashboard:redirect')

    if request.method == 'POST':
        reason = request.POST.get('reason', '')
        booking.status = Booking.STATUS_CANCELLED
        booking.cancellation_reason = reason
        booking.cancelled_by = request.user
        booking.save()

        # Notify the other party
        notify_user = booking.student if request.user == booking.tutor else booking.tutor
        create_notification(
            user=notify_user,
            notification_type=Notification.TYPE_BOOKING_CANCELLED,
            title='Booking Cancelled',
            message=f"The booking on {booking.scheduled_time.strftime('%b %d at %H:%M')} was cancelled.",
            link=f'/bookings/{booking.pk}/'
        )
        messages.warning(request, "Booking cancelled.")
        return redirect('dashboard:redirect')

    return render(request, 'bookings/cancel_confirm.html', {'booking': booking})


@login_required
@tutor_required
def complete_booking(request, pk):
    booking = get_object_or_404(Booking, pk=pk, tutor=request.user, status=Booking.STATUS_CONFIRMED)
    booking.status = Booking.STATUS_COMPLETED
    booking.save()

    # Update tutor lesson count
    try:
        tp = booking.tutor.tutor_profile
        tp.total_lessons += 1
        tp.save(update_fields=['total_lessons'])
    except Exception:
        pass

    create_notification(
        user=booking.student,
        notification_type=Notification.TYPE_BOOKING_COMPLETED,
        title='Session Completed',
        message=f"Your session with {booking.tutor.get_full_name()} is marked complete. Please leave a review!",
        link=f'/reviews/create/{booking.pk}/'
    )
    messages.success(request, "Session marked as completed.")
    return redirect('dashboard:tutor')
def booking_list(request):
    bookings = Booking.objects.filter(student=request.user)
    return render(request, 'bookings/booking_list.html', {'bookings': bookings})