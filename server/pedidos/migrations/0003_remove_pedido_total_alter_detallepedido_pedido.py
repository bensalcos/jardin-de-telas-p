# Generated by Django 5.1 on 2024-12-06 13:09

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("pedidos", "0002_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="pedido",
            name="total",
        ),
        migrations.AlterField(
            model_name="detallepedido",
            name="pedido",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="detalles",
                to="pedidos.pedido",
            ),
        ),
    ]
