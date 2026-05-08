from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    path('', views.dashboard_redirect, name='redirect'),
    path('student/', views.student_dashboard, name='student'),
    path('tutor/', views.tutor_dashboard, name='tutor'),
    path('admin/', views.admin_dashboard, name='admin'),
    path('tutors/search/', views.tutor_search, name='tutor_search'),
    path('book-session/<int:tutor_id>/', views.book_session, name='book_session'),
    path('student/', views.student_dashboard, name='student_dashboard'),
    path('tutor/',   views.tutor_dashboard,   name='tutor_dashboard'),
]