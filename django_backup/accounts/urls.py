from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    # ── Page d'accueil ─────────────────────────────────────────────────────
    path('', views.home, name='home'),

    # ── Inscription ────────────────────────────────────────────────────────
    path('register/', views.register_choice, name='register'),
    path('register/student/', views.register_student, name='register_student'),
    path('register/tutor/', views.register_tutor, name='register_tutor'),

    # ── Connexion / Déconnexion ────────────────────────────────────────────
    path('login/', views.login_view, name='login'),
    # FIX : logout maintenant accessible uniquement en POST (voir template)
    path('logout/', views.logout_view, name='logout'),

    # ── Profil ─────────────────────────────────────────────────────────────
    path('profile/', views.profile_view, name='profile'),
    path('profile/edit/', views.edit_profile, name='edit_profile'),

    # ── Profil public d'un tuteur (NOUVEAU) ───────────────────────────────
    path('tutor/<int:pk>/', views.tutor_public_profile, name='tutor_profile'),

    # ── Réinitialisation du mot de passe ───────────────────────────────────
    path('password-reset/',
         views.CustomPasswordResetView.as_view(),
         name='password_reset'),
    path('password-reset/done/',
         views.CustomPasswordResetDoneView.as_view(),
         name='password_reset_done'),
    path('password-reset/confirm/<uidb64>/<token>/',
         views.CustomPasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),
    path('password-reset/complete/',
         views.CustomPasswordResetCompleteView.as_view(),
         name='password_reset_complete'),
]