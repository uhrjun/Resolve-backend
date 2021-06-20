from django.urls import reverse
from rest_framework.test import APITestCase
from .models import User
from rest_framework import status
from rest_framework.authtoken.models import Token


class AccountsTest(APITestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            "testuser", "test@example.com", "testpassword"
        )
        self.create_url = reverse("account-create")

    def test_create_user(self):
        data = {
            "username": "foobar",
            "email": "foobar@example.com",
            "password": "somepassword",
        }
        response = self.client.post(self.create_url, data, format="json")
        user = User.objects.latest("id")
        token = Token.objects.get(user=user)
        self.assertEqual(response.data["token"], token.key)
        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], data["username"])
        self.assertEqual(response.data["email"], data["email"])
        self.assertFalse("password" in response.data)

    def test_create_user_with_short_password(self):
        # Ensures password length is more >=8
        data = {"username": "foobar", "email": "foobar@example.com", "password": "foo"}
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["password"]), 1)

    def test_create_user_with_no_password(self):
        data = {"username": "foobar", "email": "foobar@example.com", "password": ""}
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["password"]), 1)

    def test_create_user_with_too_long_username(self):
        data = {
            "username": "foo" * 30,
            "email": "foobar@example.com",
            "password": "somepassword",
        }
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["username"]), 1)

    def test_create_user_with_no_username(self):
        data = {
            "username": "",
            "email": "foobar@example.com",
            "password": "somepassword",
        }
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["username"]), 1)

    def test_create_user_with_preexisting_username(self):
        data = {
            "username": "testuser",
            "email": "foobar@example.com",
            "password": "somepassword",
        }
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["username"]), 1)

    def test_create_user_with_preexisting_email(self):
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "somepassword",
        }
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["email"]), 1)

    def test_create_user_with_invalid_email(self):
        data = {"username": "testuser", "email": "foobar", "password": "somepassword"}
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["email"]), 1)

    def test_create_user_with_no_email(self):
        data = {"username": "testuser", "email": "", "password": "somepassword"}
        response = self.client.post(self.create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data["email"]), 1)
