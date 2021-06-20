from django.db import models
from accounts.models import User
from django.utils import timezone


class Project(models.Model):
    project_name = models.CharField(max_length=100)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="project_owner"
    )
    members = models.ManyToManyField(User, related_name="project_members")
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.project_name


class Label(models.Model):
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7)
    project = models.ForeignKey(
        Project,
        related_name="project_labels",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name


class Issue(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    PRIORITY = (
        ("High", ("HIGH")),
        ("Medium", ("MEDIUM")),
        ("Low", ("LOW")),
    )
    priority = models.CharField(max_length=6, choices=PRIORITY, default="LOW")
    assignees = models.ManyToManyField(User, related_name="issue_assignee")
    submitter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="issue_submitter"
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name="project"
    )
    labels = models.ManyToManyField(Label, related_name="issue_labels")
    date_created = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title
