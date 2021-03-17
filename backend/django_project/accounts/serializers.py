from rest_framework import serializers
from rest_framework.serializers import ImageField
from rest_framework.validators import UniqueValidator
from .models import User


class UserSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
        ]


class ProjectOwnerSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "owner"]


class ProjectMemberSerializer(serializers.ModelSerializer):
    members = UserSerializer(read_only=True, many=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "members"]


class UserRegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        required=True,
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )
    password = serializers.CharField(min_length=8, write_only=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data["username"],
            validated_data["email"],
            validated_data["password"],
            first_name=self.validated_data["first_name"],
            last_name=self.validated_data["last_name"],
        )
        return user

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "first_name", "last_name")
