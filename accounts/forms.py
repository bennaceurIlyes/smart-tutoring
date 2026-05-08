from django import forms
from django.contrib.auth.forms import (
    UserCreationForm, AuthenticationForm,
    PasswordResetForm, SetPasswordForm
)
from django.core.exceptions import ValidationError
from .models import User


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _check_email_unique(email, exclude_user=None):
    """Vérifie qu'aucun autre compte n'utilise cet email (insensible à la casse)."""
    qs = User.objects.filter(email__iexact=email)
    if exclude_user:
        qs = qs.exclude(pk=exclude_user.pk)
    if qs.exists():
        raise ValidationError("Un compte avec cet email existe déjà.")
    return email.lower()  # FIX : normalise en minuscules


# ─── Inscription Étudiant ─────────────────────────────────────────────────────

class StudentRegistrationForm(UserCreationForm):
    first_name = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Prénom'}))
    last_name = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nom'}))
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Adresse email'}))
    phone = forms.CharField(
        max_length=20, required=False,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Téléphone (optionnel)'}))
    password1 = forms.CharField(
        label='Mot de passe',
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Mot de passe'}))
    password2 = forms.CharField(
        label='Confirmer le mot de passe',
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirmer le mot de passe'}))

    class Meta:
        model = User
        # FIX : username absent des fields, il est généré dans save()
        fields = ['first_name', 'last_name', 'email', 'phone', 'password1', 'password2']

    def clean_email(self):
        return _check_email_unique(self.cleaned_data.get('email', ''))

    def save(self, commit=True):
        user = super().save(commit=False)
        email = self.cleaned_data['email'].lower()  # FIX : lowercase
        user.username = email
        user.email = email
        user.phone = self.cleaned_data.get('phone', '').strip()
        user.role = User.ROLE_STUDENT
        if commit:
            user.save()
        return user


# ─── Inscription Tuteur ───────────────────────────────────────────────────────

class TutorRegistrationForm(UserCreationForm):
    first_name = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Prénom'}))
    last_name = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nom'}))
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Adresse email'}))
    phone = forms.CharField(
        max_length=20, required=False,
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Numéro de téléphone'}))
    bio = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'placeholder': 'Parlez de vous aux étudiants...',
            'rows': 4
        }))
    password1 = forms.CharField(
        label='Mot de passe',
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Mot de passe'}))
    password2 = forms.CharField(
        label='Confirmer le mot de passe',
        widget=forms.PasswordInput(attrs={'class': 'form-control', 'placeholder': 'Confirmer le mot de passe'}))

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phone', 'bio', 'password1', 'password2']

    def clean_email(self):
        return _check_email_unique(self.cleaned_data.get('email', ''))

    def save(self, commit=True):
        user = super().save(commit=False)
        email = self.cleaned_data['email'].lower()  # FIX : lowercase
        user.username = email
        user.email = email
        user.phone = self.cleaned_data.get('phone', '').strip()
        user.bio = self.cleaned_data.get('bio', '').strip()
        user.role = User.ROLE_TUTOR
        if commit:
            user.save()
        return user


# ─── Connexion ────────────────────────────────────────────────────────────────

class LoginForm(AuthenticationForm):
    username = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Adresse email',
            'autofocus': True
        }))
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Mot de passe'
        }))

    def clean_username(self):
        # FIX : normalise l'email saisi en minuscules avant authentification
        return self.cleaned_data.get('username', '').lower()


# ─── Modification du profil ───────────────────────────────────────────────────

class UserProfileForm(forms.ModelForm):
    first_name = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(
        max_length=50, required=True,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    phone = forms.CharField(
        max_length=20, required=False,
        widget=forms.TextInput(attrs={'class': 'form-control'}))
    bio = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 4}))
    date_of_birth = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}))
    profile_picture = forms.ImageField(
        required=False,
        widget=forms.FileInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone', 'bio', 'date_of_birth', 'profile_picture']

    def clean_profile_picture(self):
        picture = self.cleaned_data.get('profile_picture')
        if picture:
            # Limite la taille du fichier à 2 Mo
            if picture.size > 2 * 1024 * 1024:
                raise ValidationError("L'image ne doit pas dépasser 2 Mo.")
            # Vérifie le type MIME
            allowed = ['image/jpeg', 'image/png', 'image/webp']
            if hasattr(picture, 'content_type') and picture.content_type not in allowed:
                raise ValidationError("Format accepté : JPG, PNG ou WebP.")
        return picture


# ─── Réinitialisation du mot de passe ────────────────────────────────────────

class CustomPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Entrez votre adresse email'
        }))


class CustomSetPasswordForm(SetPasswordForm):
    new_password1 = forms.CharField(
        label='Nouveau mot de passe',
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Nouveau mot de passe'
        }))
    new_password2 = forms.CharField(
        label='Confirmer le nouveau mot de passe',
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirmer le nouveau mot de passe'
        }))