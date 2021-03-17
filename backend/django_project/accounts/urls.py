from django.conf.urls import url
from django.urls import path, include
from .views import UserRegister

urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path("register/", UserRegister.as_view()),
]
