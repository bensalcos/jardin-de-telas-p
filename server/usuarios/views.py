from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Usuario,Rol,Direccion
from .serializers import UsuarioSerializer,RolSerializer,DireccionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.select_related("direccion")
    serializer_class = UsuarioSerializer

class RolViewSet(viewsets.ModelViewSet):
    queryset = Rol.objects.all()
    serializer_class = RolSerializer

class DireccionViewSet(viewsets.ModelViewSet):
    queryset = Direccion.objects.all()
    serializer_class = DireccionSerializer    




class UserProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        return Response({
            "id": user.id,
            "correo": user.correo,
            "nombre": user.nombre,
            "apellido": user.apellido,
            "rut": user.rut,
            "rol": user.rol.nombre,
            "direccion": {
                "calle": user.direccion.calle,
                "numero": user.direccion.numero,
                "comuna": user.direccion.comuna,
                "region": user.direccion.region,
            },
            "fecha_nacimiento": user.fecha_nacimiento,
            "telefono": user.telefono
        })