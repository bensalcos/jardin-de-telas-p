import uuid
from django.db import models
from productos.models import Producto
from usuarios.models import Usuario

class Pedido(models.Model):
    class EstadoPedido(models.TextChoices):
        PENDIENTE = 'pendiente'
        EN_PROCESO = 'enviado',
        COMPLETADO = 'completado'
        CANCELADO = 'cancelado'

    id_pedido = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="pedidos")
    forma_pago = models.CharField(max_length=50)
    estado = models.CharField(max_length=20, choices=EstadoPedido.choices, default=EstadoPedido.PENDIENTE)
    fecha_pedido = models.DateTimeField(auto_now_add=True)
    fecha_entrega = models.DateField(null=True, blank=True)
    observaciones = models.TextField(blank=True, null=True)
    
        

class DetallePedido(models.Model):
    id_detalle = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="detalle_pedido")
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.PositiveIntegerField()
    total_detalle = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        # Calcular el total del detalle antes de guardar
        self.total_detalle = self.cantidad * self.precio_unitario
        super().save(*args, **kwargs)
