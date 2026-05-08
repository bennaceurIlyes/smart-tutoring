from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom User model with role-based access.
    Roles: student | tutor | admin
    """
    ROLE_STUDENT = 'student'
    ROLE_TUTOR = 'tutor'
    ROLE_ADMIN = 'admin'

    ROLE_CHOICES = [
        (ROLE_STUDENT, 'Student'),
        (ROLE_TUTOR, 'Tutor'),
        (ROLE_ADMIN, 'Admin'),
    ]

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=ROLE_STUDENT)
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True)
    bio = models.TextField(blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.role})"

    @property
    def is_student(self):
        return self.role == self.ROLE_STUDENT

    @property
    def is_tutor(self):
        return self.role == self.ROLE_TUTOR

    @property
    def is_admin_user(self):
        return self.role == self.ROLE_ADMIN or self.is_staff

    def get_dashboard_url(self):
        if self.is_tutor:
            return '/dashboard/tutor/'
        elif self.is_admin_user:
            return '/dashboard/admin/'
        return '/dashboard/student/'