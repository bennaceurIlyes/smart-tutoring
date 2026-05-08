from django.urls import path
from . import views

app_name = 'tutors'

urlpatterns = [
    path('', views.tutor_list, name='list'),
    path('<int:pk>/', views.tutor_detail, name='detail'),
     path('search/', views.tutor_search, name='tutor_search'),
    path('<int:pk>/', views.tutor_detail, name='tutor_detail'),
]