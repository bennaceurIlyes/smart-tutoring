from django.db import models
from django.core.validators import MinValueValidator
from accounts.models import User
from tutors.models import Subject


class Booking(models.Model):
    STATUS_PENDING = 'pending'
    STATUS_CONFIRMED = 'confirmed'
    STATUS_CANCELLED = 'cancelled'
    STATUS_COMPLETED = 'completed'

    STATUS_CHOICES = [
        (STATUS_PENDING, 'Pending'),
        (STATUS_CONFIRMED, 'Confirmed'),
        (STATUS_CANCELLED, 'Cancelled'),
        (STATUS_COMPLETED, 'Completed'),
    ]

    SESSION_TYPES = [
        ('one_time', 'One-time Session'),
        ('recurring', 'Recurring Session'),
        ('package', 'Package (5 sessions)'),
    ]

    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings_as_student')
    tutor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings_as_tutor')
    subject = models.ForeignKey(Subject, on_delete=models.SET_NULL, null=True, related_name='bookings')
    scheduled_time = models.DateTimeField()
    duration_minutes = models.PositiveIntegerField(default=60)
    session_type = models.CharField(max_length=20, choices=SESSION_TYPES, default='one_time')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING)
    hourly_rate = models.DecimalField(max_digits=8, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    notes = models.TextField(blank=True, help_text="Student's notes or questions for the tutor")
    tutor_notes = models.TextField(blank=True, help_text="Tutor's session notes")
    meeting_link = models.URLField(blank=True)
    cancellation_reason = models.TextField(blank=True)
    cancelled_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='cancelled_bookings')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'bookings'
        ordering = ['-scheduled_time']

    def __str__(self):
        return f"{self.student.get_full_name()} ↔ {self.tutor.get_full_name()} | {self.scheduled_time.strftime('%Y-%m-%d %H:%M')}"

    def save(self, *args, **kwargs):
        # Auto-calculate total price
        self.total_price = (self.hourly_rate * self.duration_minutes) / 60
        super().save(*args, **kwargs)

    @property
    def can_be_reviewed(self):
        return self.status == self.STATUS_COMPLETED and not hasattr(self, 'review')

    def get_status_badge(self):
        badges = {
            'pending': 'warning',
            'confirmed': 'success',
            'cancelled': 'danger',
            'completed': 'secondary',
        }
        return badges.get(self.status, 'secondary')