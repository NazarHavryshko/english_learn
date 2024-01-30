from django.shortcuts import render


def home(request):
    return render(request, 'frontend/index.html')


def registration(request):
    return render(request, 'frontend/registration.html')


def login(request):
    return render(request, 'frontend/login.html')
