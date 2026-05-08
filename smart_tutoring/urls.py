from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', RedirectView.as_view(url='/accounts/')),  # 👈 مهم

    
    path('students/', include('students.urls')),
    path('reviews/', include('reviews.urls')),
    path('admin/',         admin.site.urls),
    path('accounts/',      include('accounts.urls', namespace='accounts')),
    path('dashboard/',     include('dashboard.urls', namespace='dashboard')),
    path('tutors/',        include('tutors.urls', namespace='tutors')),      # ← ajouter
    path('notifications/', include('notifications.urls', namespace='notifications')),
    path('bookings/',      include('bookings.urls', namespace='bookings')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)