from .models import Project, Issue, Label
from rest_framework import serializers
from accounts.models import User
from accounts.serializers import (
    UserSerializer,
    ProjectOwnerSerializer,
    ProjectMemberSerializer,
)
from rest_framework.validators import ValidationError
from rest_framework.compat import distinct
from django.db.models import Q

# Used in issue serializer to display parent project
class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    queryset = Project.objects.all()

    class Meta:
        model = Project
        fields = ["id", "project_name", "owner", "date_created"]


class LabelSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(read_only=True)

    def create(self, validated_data):
        name = validated_data["name"]
        color = validated_data["color"]
        project = validated_data["project"]
        label = Label.objects.create(**validated_data)
        label.save()
        return label

    class Meta:
        model = Label
        fields = [
            "id",
            "project",
            "name",
            "color",
        ]


class CreateListProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    queryset = Project.objects.all()
    members = UserSerializer(read_only=True, many=True, required=False)
    labels = LabelSerializer(read_only=True, many=True, required=False)

    def create(self, validated_data):
        project_name = validated_data["project_name"]
        owner = validated_data["owner"]
        members_data = validated_data.pop("members")
        project = Project.objects.create(**validated_data)
        members = project.members.add(members_data)
        return project

    class Meta:
        model = Project
        fields = ["id", "project_name", "owner", "members", "date_created", "labels"]
        read_only_fields = ["date_created"]


# Project detail to view all issues in it and create new issues
class IssueSerializer(serializers.ModelSerializer):
    submitter = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    assignees = UserSerializer(read_only=True, many=True, required=False)
    labels = LabelSerializer(read_only=True, many=True, required=False)

    def create(self, validated_data):
        issue = Issue(
            title=validated_data["title"],
            description=validated_data["description"],
            priority=validated_data["priority"],
            submitter=validated_data["submitter"],
            project=validated_data["project"],
        )
        issue.save()
        return issue

    class Meta:
        model = Issue
        fields = [
            "id",
            "title",
            "description",
            "priority",
            "labels",
            "submitter",
            "assignees",
            "project",
            "date_created",
        ]
        read_only_fields = ["id", "submitter", "project", "date_created"]


class DetailIssueSerializer(serializers.ModelSerializer):
    submitter = UserSerializer(read_only=True)
    assignees = serializers.PrimaryKeyRelatedField(
        many=True, required=False, queryset=User.objects.all()
    )
    labels = serializers.PrimaryKeyRelatedField(
        many=True, required=False, queryset=Label.objects.all()
    )

    def extra_validation(
        self, project=None, labels=None, assignees=None, submitter=None, user=None
    ):
        if labels and project:
            for label in labels:
                if label.project != project:
                    raise serializers.ValidationError(
                        "Selected label is not from the current project"
                    )
        if assignees and project:
            for assignee in assignees:
                if assignee not in project.members.all():
                    raise serializers.ValidationError(
                        "Selected user is not a member of the current project"
                    )

    def update(self, instance, validated_data):
        project = instance.project
        title = validated_data.get("title")
        description = validated_data.get("description")
        assignees = validated_data.get("assignees")
        labels = validated_data.get("labels")
        self.extra_validation(project=project, assignees=assignees)
        return super().update(instance, validated_data)

    class Meta:
        model = Issue
        fields = [
            "id",
            "title",
            "description",
            "priority",
            "submitter",
            "assignees",
            "labels",
            "project",
            "date_created",
        ]
        read_only_fields = ["id", "submitter", "project", "date_created"]


class DetailProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    members = UserSerializer(many=True, read_only=True)
    issues = IssueSerializer(many=True, read_only=True)
    labels = LabelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "owner",
            "project_name",
            "members",
            "labels",
            "issues",
        ]


"""
The reason the update and detail are 2 different endpoints and serializers is just because its easier to have a 
pk related field on update rather than make a custom many to many serializer update method its a cheap workaround but saves time 
"""


class ProjectUpdateSerializer(serializers.ModelSerializer):
    owner = serializers.PrimaryKeyRelatedField(read_only=True)
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())
    issues = IssueSerializer(many=True, read_only=True)
    labels = LabelSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ["id", "project_name", "owner", "members", "issues", "labels"]