from django.urls import path
from . import views
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'productos', views.ProductoViewSet)
router.register(r'categorias', views.CategoriaViewSet)
router.register(r'imagenes', views.ImagenesViewSet)

urlpatterns = router.urls