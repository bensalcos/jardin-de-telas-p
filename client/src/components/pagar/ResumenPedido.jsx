"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
export function ResumenPedido({ producto }) {
  const { cart, removeFromCart } = useCart();
  var main_img_url = producto.imagenes.find((img) => img.es_principal === true).url;

  return (
    <div className="flex flex-row align-middle gap-2 border-b py-4 text-sm">
      <div className="flex flex-col justify-between w-full">
        <h3 className="text-md font-semibold">{producto.nombre}</h3>
        <div className="flex flex-row gap-6 ">
          <img src={main_img_url} alt="imagen producto" className="w-[50p] h-[50px] object-cover" />

          <p>Cantidad:</p>
          <p>{producto.cantidad}</p>
          <p>Precio: ${producto.precio}</p>
          <Button variant="destructive" className="max-w-[40px]" onClick={() => removeFromCart(producto.id)}>
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
