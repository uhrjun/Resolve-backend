from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["POST", "DELETE", "PUT", "PATCH", "GET"]:
            return obj.owner == request.user

        return request.method in permissions.SAFE_METHODS


class IsMember(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["GET"]:
            return obj.members == request.user


class IsSubmitter(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["POST", "DELETE", "PUT", "PATCH", "GET"]:
            return obj.submitter == request.user

        return request.method in permissions.SAFE_METHODS


class IsAssignee(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ["GET"]:
            return obj.submitter == request.user
