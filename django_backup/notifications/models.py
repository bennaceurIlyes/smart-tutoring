from django.db import models
from accounts.models import User


class Notification(models.Model):
    TYPE_BOOKING_REQUEST = 'booking_request'
    TYPE_BOOKING_CONFIRMED = 'booking_confirmed'
    TYPE_BOOKING_CANCELLED = 'booking_cancelled'
    TYPE_BOOKING_COMPLETED = 'booking_completed'
    TYPE_NEW_REVIEW = 'new_review'
    TYPE_GENERAL = 'general'

    TYPE_CHOICES = [
        (TYPE_BOOKING_REQUEST, 'Booking Request'),
        (TYPE_BOOKING_CONFIRMED, 'Booking Confirmed'),
        (TYPE_BOOKING_CANCELLED, 'Booking Cancelled'),
        (TYPE_BOOKING_COMPLETED, 'Booking Completed'),
        (TYPE_NEW_REVIEW, 'New Review'),
        (TYPE_GENERAL, 'General'),
    ]

    ICON_MAP = {
        TYPE_BOOKING_REQUEST: 'bi-calendar-plus',
        TYPE_BOOKING_CONFIRMED: 'bi-calendar-check',
        TYPE_BOOKING_CANCELLED: 'bi-calendar-x',
        TYPE_BOOKING_COMPLETED: 'bi-check-circle',
        TYPE_NEW_REVIEW: 'bi-star',
        TYPE_GENERAL: 'bi-bell',
    }

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default=TYPE_GENERAL)
    title = models.CharField(max_length=200)
    message = models.TextField()
    link = models.CharField(max_length=200, blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'notifications'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"

    def get_icon(self):
        return self.ICON_MAP.get(self.notification_type, 'bi-bell')

    def mark_read(self):
        if not self.is_read:
            self.is_read = True
            self.save(update_fields=['is_read'])


def create_notification(user, notification_type, title, message, link=''):
    """Helper to create a notification."""
    return Notification.objects.create(
        user=user,
        notification_type=notification_type,
        title=title,
        message=message,
        link=link,
    )