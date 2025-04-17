from rest_framework import serializers
from .models import Usuario, Direccion, Rol
from django.contrib.auth.hashers import make_password


class DireccionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Direccion
        fields = "__all__"


class RolSerializer(serializers.ModelSerializer):
    
        class Meta:
            model = Rol
            fields = "__all__"


class UsuarioSerializer(serializers.ModelSerializer):
    rol = serializers.CharField()  
    direccion = DireccionSerializer(required=False)

    class Meta:
        model = Usuario
        fields = ["id", "correo", "telefono", "nombre", "apellido", "rut", "rol", "password", "direccion"]

    def create(self, validated_data):

        rol_nombre = validated_data.pop("rol")

        try:
            rol = Rol.objects.get(nombre=rol_nombre)
        except Rol.DoesNotExist:
            raise serializers.ValidationError({"rol": "El rol proporcionado no existe."})


        direccion_data = validated_data.pop('direccion', None)
        direccion, _ = Direccion.objects.get_or_create(**direccion_data)

        
        validated_data["rol"] = rol
        validated_data["password"] = make_password(validated_data["password"])
        usuario = Usuario.objects.create(direccion=direccion,**validated_data)


        return usuario


























    def update(self, instance, validated_data):
        rol_nombre = validated_data.pop("rol", None)

        # Actualizar el rol si se proporcionó uno nuevo
        if rol_nombre:
            try:
                rol = Rol.objects.get(nombre=rol_nombre)
                instance.rol = rol
            except Rol.DoesNotExist:
                raise serializers.ValidationError({"rol": "El rol proporcionado no existe."})

        # Actualizar los atributos del usuario
        for attr, value in validated_data.items():
            if attr == "password":
                setattr(instance, attr, make_password(value))
            else:
                setattr(instance, attr, value)

        # Verificar si se proporcionó una dirección nueva
        direccion_data = validated_data.get('direccion')
        if direccion_data:
            # Si hay una dirección, actualizamos la existente
            if instance.direccion:
                for key, value in direccion_data.items():
                    setattr(instance.direccion, key, value)
                instance.direccion.save()
            else:
                # Si no existe dirección asociada, creamos una nueva
                direccion_data['usuario'] = instance
                Direccion.objects.create(**direccion_data)

        instance.save()
        return instance