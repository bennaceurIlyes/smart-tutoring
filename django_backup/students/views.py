from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404
from .models import StudentProfile

@login_required
def profile(request):
    profile = get_object_or_404(StudentProfile, user=request.user)
    return render(request, 'students/profile.html', {'profile': profile})

@login_required
def edit_profile(request):
    profile = get_object_or_404(StudentProfile, user=request.user)
    if request.method == 'POST':
        # handle form
        pass
    return render(request, 'students/edit_profile.html', {'profile': profile})