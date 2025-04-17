from django.urls import path, include
from rest_framework.routers import SimpleRouter
from . import views

router = SimpleRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'roles', views.RolViewSet)
router.register(r'direccion', views.DireccionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('perfil/', views.UserProfileView.as_view(), name='profile'),
]
