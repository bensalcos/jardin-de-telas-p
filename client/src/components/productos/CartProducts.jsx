"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export function CartProducts({ producto }) {
  const { cart, removeFromCart } = useCart();
  var main_img_url = producto.imagenes.find((img) => img.es_principal === true).url;

  return (
    <div className="flex flex-row align-middle gap-4 border-b py-4">
      <div>
        <img src={main_img_url} alt="imagen producto" className="w-[150p] h-[150px] object-cover" />
      </div>
      <div className="flex flex-col justify-between w-full">
        <h3 className="text-lg font-semibold">{producto.nombre}</h3>
        <div className="flex items-center gap-2">
          <p>Cantidad:</p>
          <p>{producto.cantidad}</p>
        </div>
        <p className="font-semibold">Precio: ${producto.precio * producto.cantidad}</p>
        <Button size="sm" variant="destructive" className="max-w-[300px]" onClick={() => removeFromCart(producto.id)}>
          Remover
        </Button>
      </div>
    </div>
  );
}
