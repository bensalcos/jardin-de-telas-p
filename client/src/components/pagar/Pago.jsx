"use client";
import { useSession } from "next-auth/react";
import { useCart } from "../../context/CartContext";
import { CartProducts } from "../productos/CartProducts";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { ResumenPedido } from "./ResumenPedido";
export default function Pago() {
  const { data: session, status } = useSession();
  const { cart } = useCart();
  const [formaDePago, setFormaDePago] = useState([]);

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex align-middle justify-center">
        <h2>Cargando...</h2>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="w-screen h-screen flex align-middle justify-center">
        <h2>Para realizar un pago debe haber iniciado sesión</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-9/12 mx-auto">
      <div className="flex flex-row w-full p-8 gap-8 mx-auto">
        <div className="flex flex-col w-2/6  gap-8">
          <div>
            <Card>
              <CardHeader>
                <h5>Dirección de envío</h5>
              </CardHeader>
              <CardContent>
                <p>Region: {session?.user?.direccion?.region || "Región no especificada"}</p>
                <p>Comuna: {session?.user?.direccion?.comuna || "Comuna no especificada"}</p>
                <p>Calle: {session?.user?.direccion?.calle || "Calle no especificada"}</p>
                <p>Número: {session?.user?.direccion?.numero || "Número no especificado"}</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <h5>Método de pago</h5>
              </CardHeader>
              <CardContent>
                <Checkbox id={1} checked={"webpay"} onCheckedChange={() => setFormaDePago("webpay")} />
                <Label
                  htmlFor={1}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {"Webpay"}
                </Label>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <Card>
            <CardHeader>
              <h5>Resumen del pedido</h5>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p>No hay productos en el carrito</p>
              ) : (
                cart.map((producto) => (
                  <ResumenPedido className="min-w-[300px]" key={producto.id} producto={producto} />
                ))
              )}
              <p className="font-semibold">
                Total: ${cart.reduce((total, item) => total + item.precio * item.cantidad, 0)}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-center">
        <Button size="lg" className="max-w-[250px]">
          Confirmar Pago
        </Button>
      </div>
    </div>
  );
}
