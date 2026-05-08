from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from accounts.models import User


class Subject(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=50, blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text="Bootstrap icon class")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'subjects'
        ordering = ['name']

    def __str__(self):
        return self.name


class TutorProfile(models.Model):
    EXPERIENCE_CHOICES = [
        ('0-1', 'Less than 1 year'),
        ('1-3', '1–3 years'),
        ('3-5', '3–5 years'),
        ('5+', '5+ years'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='tutor_profile')
    subjects = models.ManyToManyField(Subject, blank=True, related_name='tutors')
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    experience_years = models.CharField(max_length=10, choices=EXPERIENCE_CHOICES, default='0-1')
    education = models.TextField(blank=True, help_text="Degrees and certifications")
    teaching_style = models.TextField(blank=True)
    languages = models.CharField(max_length=200, blank=True, help_text="Comma-separated languages")
    timezone = models.CharField(max_length=50, default='UTC')
    is_available = models.BooleanField(default=True)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    total_reviews = models.PositiveIntegerField(default=0)
    total_lessons = models.PositiveIntegerField(default=0)
    response_time = models.CharField(max_length=50, default='Within 24 hours')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'tutor_profiles'
        ordering = ['-average_rating']

    def __str__(self):
        return f"Tutor: {self.user.get_full_name()}"

    def update_rating(self):
        """Recalculate average rating from reviews."""
        from reviews.models import Review
        reviews = Review.objects.filter(booking__tutor=self.user, is_approved=True)
        if reviews.exists():
            avg = reviews.aggregate(models.Avg('rating'))['rating__avg']
            self.average_rating = round(avg, 2)
            self.total_reviews = reviews.count()
        else:
            self.average_rating = 0.00
            self.total_reviews = 0
        self.save(update_fields=['average_rating', 'total_reviews'])

    def get_upcoming_bookings(self):
        from bookings.models import Booking
        from django.utils import timezone
        return self.user.bookings_as_tutor.filter(
            status='confirmed',
            scheduled_time__gte=timezone.now()
        ).order_by('scheduled_time')


class TutorAvailability(models.Model):
    DAY_CHOICES = [
        (0, 'Monday'), (1, 'Tuesday'), (2, 'Wednesday'),
        (3, 'Thursday'), (4, 'Friday'), (5, 'Saturday'), (6, 'Sunday'),
    ]

    tutor = models.ForeignKey(TutorProfile, on_delete=models.CASCADE, related_name='availability')
    day_of_week = models.IntegerField(choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'tutor_availability'
        ordering = ['day_of_week', 'start_time']
        unique_together = ['tutor', 'day_of_week', 'start_time']

    def __str__(self):
        return f"{self.tutor.user.get_full_name()} - {self.get_day_of_week_display()} {self.start_time}–{self.end_time}"