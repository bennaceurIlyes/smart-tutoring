from functools import wraps
from django.shortcuts import redirect
from django.contrib import messages


# ─── Helpers ──────────────────────────────────────────────────────────────────

def _redirect_to_login(request):
    """Redirige vers la page de login en conservant l'URL courante dans ?next="""
    return redirect(f'/accounts/login/?next={request.path}')


# ─── Décorateurs de rôle ──────────────────────────────────────────────────────

def student_required(view_func):
    """Autorise uniquement les étudiants authentifiés."""
    # FIX : on n'imbrique plus @login_required à l'intérieur
    # On gère nous-mêmes is_authenticated + is_student en une seule passe
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return _redirect_to_login(request)
        if not request.user.is_student:
            messages.error(request, "Cette section est réservée aux étudiants.")
            return redirect('dashboard:redirect')
        return view_func(request, *args, **kwargs)
    return wrapper


def tutor_required(view_func):
    """Autorise uniquement les tuteurs authentifiés."""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return _redirect_to_login(request)
        if not request.user.is_tutor:
            messages.error(request, "Cette section est réservée aux tuteurs.")
            return redirect('dashboard:redirect')
        return view_func(request, *args, **kwargs)
    return wrapper


def admin_required(view_func):
    """Autorise uniquement les administrateurs authentifiés."""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return _redirect_to_login(request)
        if not request.user.is_admin_user:
            messages.error(request, "Vous n'avez pas la permission d'accéder à cette page.")
            return redirect('dashboard:redirect')
        return view_func(request, *args, **kwargs)
    return wrapper


def verified_required(view_func):
    """Autorise uniquement les comptes dont l'email est vérifié."""
    @wraps(view_func)
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return _redirect_to_login(request)
        if not request.user.is_verified:
            messages.warning(
                request,
                "Veuillez vérifier votre adresse email avant d'accéder à cette page."
            )
            return redirect('accounts:home')
        return view_func(request, *args, **kwargs)
    return wrapper