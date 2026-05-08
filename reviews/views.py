from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django import forms
from .models import Review
from bookings.models import Booking
from accounts.decorators import student_required


class ReviewForm(forms.ModelForm):
    rating = forms.ChoiceField(
        choices=[(i, f"{i} Star{'s' if i > 1 else ''}") for i in range(1, 6)],
        widget=forms.RadioSelect(attrs={'class': 'rating-radio'})
    )
    comment = forms.CharField(required=False,
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 4,
                                     'placeholder': 'Share your experience with this tutor...'}))

    class Meta:
        model = Review
        fields = ['rating', 'comment']


@login_required
@student_required
def create_review(request, booking_pk):
    booking = get_object_or_404(Booking, pk=booking_pk, student=request.user, status='completed')

    if hasattr(booking, 'review'):
        messages.info(request, "You have already reviewed this session.")
        return redirect('dashboard:student')

    if request.method == 'POST':
        form = ReviewForm(request.POST)
        if form.is_valid():
            review = form.save(commit=False)
            review.booking = booking
            review.student = request.user
            review.tutor = booking.tutor
            review.save()
            messages.success(request, "Review submitted! Thank you for your feedback.")
            return redirect('dashboard:student')
    else:
        form = ReviewForm()

    return render(request, 'reviews/create_review.html', {'form': form, 'booking': booking})