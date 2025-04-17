from rest_framework import serializers
from .models import Producto, Categoria, Dimensiones, Imagen

class ImagenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Imagen
        fields = ['id', 'url', 'es_principal', 'orden']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = "__all__"

class DimensionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dimensiones
        fields = "__all__"

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer()
    dimensiones = DimensionesSerializer(required=False)
    imagenes = ImagenSerializer(required=False, many=True)
    
    class Meta:
        model = Producto
        fields = ['id', 'SKU', 'nombre', 'descripcion', 'precio', 'stock', 'categoria', 'dimensiones', 'imagenes']
        
    def create(self, validated_data):
        # Extraer datos de categoría
        categoria_data = validated_data.pop('categoria')
        categoria, _ = Categoria.objects.get_or_create(**categoria_data)
        # Extraer datos de imágenes (si existen)
        imagenes_data = validated_data.pop('imagenes', [])
        # Extraer y manejar datos de dimensiones (si existen)
        dimensiones_data = validated_data.pop('dimensiones', None)
        dimensiones = Dimensiones.objects.create(**dimensiones_data) if dimensiones_data else None

        # Crear el producto
        producto = Producto.objects.create(
            categoria=categoria,
            dimensiones=dimensiones,
            **validated_data
        )

        # Crear imágenes asociadas al producto
        for imagen_data in imagenes_data:
            
            imagen_data['producto'] = producto
            Imagen.objects.create(**imagen_data)

        return producto

    def update(self, instance, validated_data):
        # Manejo de categoría
        categoria_data = validated_data.pop('categoria', None)
        if categoria_data:
            Categoria.objects.update_or_create(
                id=categoria_data.get('id', instance.categoria.id),
                defaults=categoria_data
            )

        # Manejo de dimensiones
        dimensiones_data = validated_data.pop('dimensiones', None)
        if dimensiones_data:
            if instance.dimensiones:
                for attr, value in dimensiones_data.items():
                    setattr(instance.dimensiones, attr, value)
                instance.dimensiones.save()
            else:
                instance.dimensiones = Dimensiones.objects.create(**dimensiones_data)

        # Manejo de imágenes (usar set() si se necesita actualizar las imágenes existentes)
        imagenes_data = validated_data.pop('imagenes', None)
        if imagenes_data:
            # Eliminar imágenes existentes y agregar las nuevas
            instance.imagenes.all().delete()  # Borra las imágenes anteriores
            for imagen_data in imagenes_data:
                imagen_data['producto'] = instance  # Asociar el producto actualizado
                Imagen.objects.create(**imagen_data)

        # Actualizar otros campos del producto
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
