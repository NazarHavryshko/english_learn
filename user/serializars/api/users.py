from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.exceptions import ParseError
from rest_framework.utils.serializer_helpers import ReturnDict

User = get_user_model()


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True)
    username = serializers.CharField(max_length=64)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', ]

    @staticmethod
    def validate_email(value):
        email = value.lower()
        if User.objects.filter(email=email).exists():
            raise ParseError(
                'The user with this email is already registered.'
            )

        return email

    @staticmethod
    def validate_username(value):
        username = value.lower()
        if User.objects.filter(username=username).exists():
            raise ParseError(
                'The user with this username is already registered.'
            )

        return username

    @staticmethod
    def validate_password(value):
        validate_password(value)
        return value

    @staticmethod
    def perform_create(serializer):
        user = serializer.save()
        user.set_password(serializer.validated_data['password'])
        user.save()

    @staticmethod
    def create(validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class RetrieveSerializer(serializers.ModelSerializer):
    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['username', ]

