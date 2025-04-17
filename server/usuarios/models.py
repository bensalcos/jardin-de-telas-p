from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import RegexValidator
import uuid

class Rol(models.Model):
    id_rol = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre


class CustomUserManager(BaseUserManager):
    #crea usuario normal
    def create_user(self, correo, nombre, apellido,rut, clave=None, **extra_fields):
        if not correo:
            raise ValueError("El correo es obligatorio")
        correo = self.normalize_email(correo)
        user = self.model(
            correo=correo, nombre=nombre, apellido=apellido,rut=rut **extra_fields
        )
        user.set_password(clave)
        user.save(using=self._db)
        return user
    
    #crea superusuario
    def create_superuser(self, correo, nombre, apellido, clave=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(correo, nombre, apellido, clave, **extra_fields)


class Direccion(models.Model):
    id_direccion = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    calle = models.CharField(max_length=200)
    numero = models.CharField(max_length=24, blank=True, null=True)
    comuna = models.CharField(max_length=100)
    region = models.CharField(max_length=100)




class Usuario(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    correo = models.EmailField(unique=True)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    

    rut = models.CharField(
        max_length=20, 
        unique=True, 
        validators=[RegexValidator(r'^\d{1,2}\.\d{3}\.\d{3}-[\d|kK]{1}$', 'Formato de RUT inválido')]
    )
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, related_name="usuarios")
    
    fecha_nacimiento = models.DateField(blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "correo"
    REQUIRED_FIELDS = ["nombre", "apellido", "rut"]

    groups = models.ManyToManyField(
        "auth.Group", related_name="custom_user_groups", blank=True
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission", related_name="custom_user_permissions", blank=True
    )
 
    direccion = models.OneToOneField(Direccion, null=True, blank=True, on_delete=models.SET_NULL)




