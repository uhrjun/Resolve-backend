from rest_framework import viewsets, generics, mixins, filters
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from django.db.models import Q
from accounts.serializers import UserSerializer
from accounts.models import User
from .models import Project, Issue, Label
from .permissions import IsOwner, IsSubmitter, IsMember, IsAssignee
from .serializers import (
    CreateListProjectSerializer,
    UserSerializer,
    DetailProjectSerializer,
    IssueSerializer,
    DetailIssueSerializer,
    ProjectUpdateSerializer,
    LabelSerializer,
)


class CreateListProjectsView(generics.ListCreateAPIView):
    serializer_class = CreateListProjectSerializer
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()

    def list(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Project.objects.filter(owner=user)
        serializer = CreateListProjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner=user, members=user)
        return serializer.data


class ListParticipatedProjectsView(generics.ListCreateAPIView):
    serializer_class = CreateListProjectSerializer
    permission_classes = [IsAuthenticated]
    queryset = Project.objects.all()

    def list(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Project.objects.filter(members=user)
        serializer = CreateListProjectSerializer(queryset, many=True)
        return Response(serializer.data)


class DetailProjectsView(generics.RetrieveAPIView):
    serializer_class = DetailProjectSerializer
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated]


class UpdateProjectsView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProjectUpdateSerializer
    queryset = Project.objects.all()
    permission_classes = [IsAuthenticated, IsOwner]

    def perform_update(self, serializer):
        instance = self.get_object()
        modified_instance = serializer.save()


class CreateLabel(generics.ListCreateAPIView):
    serializer_class = LabelSerializer
    queryset = Label.objects.all()

    def list (self,requst, *args, **kwargs):
        current_project = self.kwargs["pk"]
        queryset = Label.objects.filter( project = current_project)
        serializer = LabelSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer, *args, **kwargs):
        Current_project = Project.objects.get(id=self.kwargs["pk"])
        serializer.save(project=Current_project)


class LabelDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LabelSerializer
    queryset = Label.objects.all()


# List all issues in a project
class ListCreateProjectIssuesView(generics.ListCreateAPIView):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()
    permission_classes = [IsAuthenticated, IsSubmitter, IsAssignee, IsOwner, IsMember]

    def list(self, request, *args, **kwargs):
        project = self.kwargs["pk"]
        queryset = Issue.objects.filter(project=project)
        serializer = IssueSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def perform_create(self, serializer, *args, **kwargs):
        # Fetches current active model from the url pk
        Current_project = Project.objects.get(id=self.kwargs["pk"])
        serializer.save(submitter=self.request.user, project=Current_project)


# Issue Detial
class IssuesDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DetailIssueSerializer
    queryset = Issue.objects.all()
    permission_classes = [IsSubmitter]

    def perform_update(self, serializer, *args, **kwargs):
        # Fetches current active model from the url pk
        Current_project = Project.objects.get(id=self.kwargs["id"])
        serializer.save(submitter=self.request.user, project=Current_project)


# Display submitted issues
class ListSubmittedProjectIssuesView(generics.ListAPIView):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()
    permission_classes = [IsAuthenticated, IsSubmitter, IsAssignee, IsOwner, IsMember]

    def list(self, request, *args, **kwargs):
        project = self.kwargs["id"]
        user = self.request.user
        queryset = Issue.objects.filter(
            project=project, submitter=user, context={"request": request}
        )
        serializer = IssueSerializer(queryset, many=True)
        return Response(serializer.data)


# Display Assigned issues
class ListAssignedProjectIssuesView(generics.ListAPIView):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()
    permission_classes = [IsAuthenticated, IsSubmitter, IsAssignee, IsOwner, IsMember]

    def list(self, request, *args, **kwargs):
        project = self.kwargs["id"]
        user = self.request.user
        queryset = Issue.objects.filter(
            project=project, assignees=user, context={"request": request}
        )
        serializer = IssueSerializer(queryset, many=True)
        return Response(serializer.data)


class ListUserIssuesView(generics.ListAPIView):
    serializer_class = IssueSerializer
    queryset = Issue.objects.all()
    permission_classes = [IsAuthenticated, IsSubmitter, IsAssignee, IsOwner, IsMember]

    def list(self, request, *args, **kwargs):
        user = self.request.user
        queryset = Issue.objects.filter(assignees=user)
        serializer = IssueSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)
