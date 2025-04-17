from django.contrib import admin
from django.urls import path
from django.http import HttpResponse
from django.urls.conf import include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("config.api_urls")),
    path("favicon.ico", lambda x: HttpResponse(status=204)),
]