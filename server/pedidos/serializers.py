from rest_framework import serializers
from .models import Pedido, DetallePedido, Producto

class DetallePedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetallePedido
        fields = ['id_detalle','producto', 'cantidad', 'precio_unitario']

class PedidoSerializer(serializers.ModelSerializer):
    detalles = DetallePedidoSerializer(required=False,many=True)

    class Meta:
        model = Pedido
        fields = ['id_pedido','usuario',  'estado', 'detalles', 'fecha_pedido']

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')
        pedido = Pedido.objects.create(**validated_data)
        
        for detalle_data in detalles_data:
            producto = Producto.objects.get(id=detalle_data['producto'].id)
            
            if producto.stock < detalle_data['cantidad']:
                raise serializers.ValidationError(
                    f"El producto '{producto.nombre}' no tiene suficiente stock. Disponible: {producto.stock}."
                )
            
            producto.stock -= detalle_data['cantidad']
            producto.save()

               
            DetallePedido.objects.create(pedido=pedido, **detalle_data)
    


        return pedido
