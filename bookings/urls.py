from django.urls import path
from . import views

app_name = 'bookings'

urlpatterns = [
    path('book/<int:tutor_pk>/', views.book_tutor, name='book'),
    path('<int:pk>/', views.booking_detail, name='detail'),
    path('<int:pk>/confirm/', views.confirm_booking, name='confirm'),
    path('<int:pk>/cancel/', views.cancel_booking, name='cancel'),
    path('<int:pk>/complete/', views.complete_booking, name='complete'),
    path('', views.booking_list, name='list'),
]