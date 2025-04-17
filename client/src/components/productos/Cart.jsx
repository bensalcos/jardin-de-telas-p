// components/Cart.jsx
"use client";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "../../context/CartContext";
import { CartProducts } from "@/components/productos/CartProducts";
import Link from "next/link";
export function Cart() {
  const { cart } = useCart();

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart />
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full">
        <div>
          <SheetHeader>
            <SheetTitle>Carrito</SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-auto">
          {cart.length === 0 ? (
            <p>No hay productos en el carrito</p>
          ) : (
            cart.map((producto) => <CartProducts key={producto.id} producto={producto} />)
          )}
        </div>

        <div className="flex justify-evenly items-center border-t p-4">
          <p className="text-base font-semibold">
            Total: ${cart.reduce((total, item) => total + item.precio * item.cantidad, 0)}
          </p>
          <Link className="ml-4 w-1/3" href={"pagar"}>
            <Button>Pagar</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
