import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export function ProductCard({ ...producto }) {
  var main_img_url = producto.imagenes.find((img) => img.es_principal === true).url;
  const { addToCart } = useCart();
  const handleAddToCart = () => {
    addToCart(producto);
  };
  return (
    <Card className="flex flex-col place-content-between min-w-[270px] w-[32%] min-h-[350px]">
      <Link href={`productos/${producto.id}`}>
        <CardHeader>
          <img src={main_img_url} alt="" className="w-[150p] h-[150px] object-cover" />
          <CardTitle className="text-xl">{producto.nombre}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mt-1">Precio: ${parseInt(producto.precio)}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <Button className="w-full " onClick={handleAddToCart}>
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
