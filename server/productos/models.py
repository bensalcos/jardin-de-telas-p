from django.db import models
import uuid


class Categoria(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    
class Dimensiones(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    largo = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    ancho = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    peso = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    

class Producto(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    SKU = models.CharField(max_length=50, unique=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    categoria = models.ForeignKey(Categoria, related_name='productos', on_delete=models.CASCADE, to_field='id')
    dimensiones = models.ForeignKey(Dimensiones, related_name='productos', on_delete=models.SET_NULL, null=True, blank=True, to_field='id')



class Imagen(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    url = models.URLField(max_length=255)
    es_principal = models.BooleanField(default=False)
    orden = models.PositiveIntegerField(default=0)
    producto = models.ForeignKey(Producto, related_name='imagenes', on_delete=models.CASCADE, to_field='id')



