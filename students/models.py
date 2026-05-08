from django.db import models
from accounts.models import User


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    grade_level = models.CharField(max_length=50, blank=True)
    school = models.CharField(max_length=100, blank=True)
    learning_goals = models.TextField(blank=True)
    preferred_session_duration = models.PositiveIntegerField(default=60, help_text="Minutes")
    timezone = models.CharField(max_length=50, default='UTC')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'student_profiles'

    def __str__(self):
        return f"Student: {self.user.get_full_name()}"

    def get_total_lessons(self):
        return self.user.bookings_as_student.filter(status='completed').count()

    def get_upcoming_lessons(self):
        from bookings.models import Booking
        from django.utils import timezone
        return self.user.bookings_as_student.filter(
            status='confirmed',
            scheduled_time__gte=timezone.now()
        ).order_by('scheduled_time')