from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
    }


def get_and_auth_user(username, password):
    user = authenticate(username=username, password=password)
    if username != username or password != password:
        raise serializers.ValidationError("Invalid username or password")
    else:
        return user
