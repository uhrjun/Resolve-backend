from django.urls import path, include
from issues.views import (
    CreateListProjectsView,
    ListParticipatedProjectsView,
    DetailProjectsView,
    UpdateProjectsView,
    ListCreateProjectIssuesView,
    IssuesDetailView,
    ListSubmittedProjectIssuesView,
    ListAssignedProjectIssuesView,
    ListUserIssuesView,
    CreateLabel,
    LabelDetail,
)


urlpatterns = [
    # Swapping id with pk in certain instances
    # This is because the default drf lookup is for pk to filter against
    path("projects/", CreateListProjectsView.as_view()),
    path("projects/member/", ListParticipatedProjectsView.as_view()),
    path("projects/<int:pk>/", DetailProjectsView.as_view()),
    path("projects/<int:pk>/update/", UpdateProjectsView.as_view()),
    path("projects/<int:pk>/update/labels/", CreateLabel.as_view()),
    path("projects/<int:id>/update/labels/<int:pk>/", LabelDetail.as_view()),
    path("issues/user", ListUserIssuesView.as_view()),
    path("projects/<int:pk>/issues/", ListCreateProjectIssuesView.as_view()),
    #"DetailView" not really just used this to update the data didnt wanna make a custom many2many 
    # relation updater so this just takes primarykey values
    #So its an update view 
    path("projects/<int:id>/issues/<int:pk>/", IssuesDetailView.as_view()),
    path("projects/<int:id>/issues/assigned/", ListAssignedProjectIssuesView.as_view()),
    path(
        "projects/<int:id>/issues/submitted/", ListSubmittedProjectIssuesView.as_view()
    ),
]