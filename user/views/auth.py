from django.contrib.auth import get_user_model
from drf_spectacular.utils import extend_schema_view, extend_schema
from rest_framework import generics

from rest_framework.authtoken.views import ObtainAuthToken

from rest_framework.permissions import AllowAny, IsAuthenticated

from user.serializars.api import users as user_s

User = get_user_model()


@extend_schema_view(
    post=extend_schema(summary='Registration', tags=['User']),
)
class RegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = user_s.RegistrationSerializer



@extend_schema_view(
    post=extend_schema(summary='Login', tags=['User']),
)
class LoginView(ObtainAuthToken):
    permission_classes = [AllowAny]


@extend_schema_view(
    get=extend_schema(summary='Get user name', tags=['User']),
)
class UsernameView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = user_s.RetrieveSerializer

    def get_queryset(self):
        return User.objects.filter(pk=self.request.user.pk)
