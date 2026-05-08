from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import login, logout, authenticate, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import (
    PasswordResetView, PasswordResetDoneView,
    PasswordResetConfirmView, PasswordResetCompleteView
)
from django.contrib import messages
from django.urls import reverse_lazy
from django.views.decorators.http import require_POST

from .forms import (
    StudentRegistrationForm, TutorRegistrationForm,
    LoginForm, UserProfileForm,
    CustomPasswordResetForm, CustomSetPasswordForm
)
from students.models import StudentProfile
from tutors.models import TutorProfile


# ─── Page d'accueil ───────────────────────────────────────────────────────────

def home(request):
    """Landing page — affiche les tuteurs en vedette."""
    # FIX : suppression de l'import inutilisé de Review
    featured_tutors = TutorProfile.objects.filter(
        is_available=True
    ).select_related('user').order_by('-average_rating')[:6]
    return render(request, 'home.html', {'featured_tutors': featured_tutors})


# ─── Inscription ──────────────────────────────────────────────────────────────

def register_choice(request):
    """Laisser l'utilisateur choisir entre inscription étudiant ou tuteur."""
    if request.user.is_authenticated:
        return redirect('dashboard:redirect')
    return render(request, 'accounts/register_choice.html')


def register_student(request):
    if request.user.is_authenticated:
        return redirect('dashboard:redirect')
    if request.method == 'POST':
        form = StudentRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            StudentProfile.objects.create(user=user)
            login(request, user)
            messages.success(request, f"Bienvenue, {user.first_name} ! Votre compte étudiant a été créé.")
            return redirect('dashboard:student')
    else:
        form = StudentRegistrationForm()
    return render(request, 'accounts/register_student.html', {'form': form})


def register_tutor(request):
    if request.user.is_authenticated:
        return redirect('dashboard:redirect')
    if request.method == 'POST':
        form = TutorRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            TutorProfile.objects.create(user=user)
            login(request, user)
            messages.success(request, f"Bienvenue, {user.first_name} ! Votre compte tuteur a été créé.")
            return redirect('dashboard:tutor')
    else:
        form = TutorRegistrationForm()
    return render(request, 'accounts/register_tutor.html', {'form': form})


# ─── Connexion / Déconnexion ──────────────────────────────────────────────────

def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard:redirect')
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, f"Bon retour, {user.first_name or user.username} !")
            next_url = request.GET.get('next', user.get_dashboard_url())
            return redirect(next_url)
        else:
            messages.error(request, "Email ou mot de passe invalide. Veuillez réessayer.")
    else:
        form = LoginForm()
    return render(request, 'accounts/login.html', {'form': form})


# FIX : logout uniquement via POST pour éviter l'attaque CSRF
@require_POST
@login_required
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return redirect('accounts:home')
    return redirect('accounts:profile')  # GET ignoré

# ─── Profil ───────────────────────────────────────────────────────────────────

@login_required
def profile_view(request):
    """Affiche le profil de l'utilisateur connecté."""
    user = request.user

    # Récupération du profil lié (tuteur ou étudiant)
    tutor_profile = None
    student_profile = None
    if user.is_tutor:
        tutor_profile = getattr(user, 'tutorprofile', None)
    else:
        student_profile = getattr(user, 'studentprofile', None)

    context = {
        'profile_user': user,
        'tutor_profile': tutor_profile,
        'student_profile': student_profile,
    }
    return render(request, 'accounts/profile.html', context)


# FIX : edit_profile protégé + formulaire fonctionnel
@login_required
def edit_profile(request):
    """Modification du profil de l'utilisateur connecté."""
    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Profil mis à jour avec succès.")
            return redirect('accounts:profile')
        else:
            messages.error(request, "Veuillez corriger les erreurs ci-dessous.")
    else:
        form = UserProfileForm(instance=request.user)
    return render(request, 'accounts/edit_profile.html', {'form': form})


# ─── Profil public d'un tuteur ────────────────────────────────────────────────

def tutor_public_profile(request, pk):
    """Page publique du profil d'un tuteur — visible par tous."""
    tutor_profile = get_object_or_404(
        TutorProfile.objects.select_related('user'),
        pk=pk,
        user__is_active=True
    )
    # Avis liés au tuteur (si l'app reviews existe)
    reviews = []
    try:
        from reviews.models import Review
        reviews = Review.objects.filter(
            tutor=tutor_profile
        ).select_related('student__user').order_by('-created_at')
    except Exception:
        pass

    context = {
        'tutor': tutor_profile,
        'reviews': reviews,
    }
    return render(request, 'accounts/tutor_public_profile.html', context)


# ─── Réinitialisation du mot de passe ────────────────────────────────────────

class CustomPasswordResetView(PasswordResetView):
    template_name = 'accounts/password_reset.html'
    form_class = CustomPasswordResetForm
    email_template_name = 'accounts/email/password_reset_email.html'
    subject_template_name = 'accounts/email/password_reset_subject.txt'
    success_url = reverse_lazy('accounts:password_reset_done')


class CustomPasswordResetDoneView(PasswordResetDoneView):
    template_name = 'accounts/password_reset_done.html'


class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = 'accounts/password_reset_confirm.html'
    form_class = CustomSetPasswordForm
    success_url = reverse_lazy('accounts:password_reset_complete')


class CustomPasswordResetCompleteView(PasswordResetCompleteView):
    template_name = 'accounts/password_reset_complete.html'