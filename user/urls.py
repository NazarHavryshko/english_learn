from django.urls import path

from user.views import auth

urlpatterns = [
    path('user/registration/', auth.RegistrationView.as_view(), name='registration'),
    path('user/login/', auth.LoginView.as_view(), name="login"),
    path('user/username/', auth.UsernameView.as_view(), name="username"),
]


