from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response
from .models import Producto,Categoria,Imagen
from .serializers import ProductoSerializer,CategoriaSerializer,ImagenSerializer
from rest_framework.permissions import IsAuthenticated



class ImagenesViewSet(viewsets.ModelViewSet):
    queryset = Imagen.objects.all()
    serializer_class = ImagenSerializer
    
    



class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def update(self, request, *args, **kwargs):

        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    def retrieve(self, request, pk=None):

        try:
            producto = self.get_object()  # Obtiene el objeto basado en el `pk`
            serializer = self.get_serializer(producto)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Producto.DoesNotExist:
            return Response({"detail": "Producto no encontrado."}, status=status.HTTP_404_NOT_FOUND)

    def partial_update(self, request, pk=None):

        try:
            producto = self.get_object()  # Obtiene el objeto basado en el `pk`
            serializer = self.get_serializer(producto, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Producto.DoesNotExist:
            return Response({"detail": "Producto no encontrado."}, status=status.HTTP_404_NOT_FOUND)
        
        

    def destroy(self, request, *args, **kwargs):

        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

    
    def create(self, request, *args, **kwargs):
        data = request.data
        if "nombre" not in data or not data["nombre"].strip():
            return Response({"error": "El nombre es obligatorio"}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)
