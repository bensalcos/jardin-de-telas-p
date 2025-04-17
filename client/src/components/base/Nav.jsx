import Link from "next/link";
import "@/styles/globals.css";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/base/UserButton";
import { Cart } from "../productos/Cart";
import { ShoppingCart } from "lucide-react";
export default function Nav() {
  return (
    <nav className="shadow-md sticky w-full backdrop-blur-lg">
      <div className="flex flex-row place-content-between p-8 ">
        <Link href={"/"}>
          <h2 className="font-playwrite text-3xl drop-shadow-md">JARDIN DE TELAS</h2>
        </Link>

        <div className="flex flex-row text-primary">
          <Link href="/">
            <Button variant="link">Inicio</Button>
          </Link>
          <Link href="/productos">
            <Button variant="link">Productos</Button>
          </Link>
          <Link href="/nosotros">
            <Button variant="link">Nosotros</Button>
          </Link>
          <Link href="/contacto">
            <Button variant="link">Contacto</Button>
          </Link>
        </div>
        <div className="flex flex-row gap-10">
          <div className="flex">
            <Cart className="align-middle">
              <ShoppingCart />
            </Cart>
          </div>
          <div>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
