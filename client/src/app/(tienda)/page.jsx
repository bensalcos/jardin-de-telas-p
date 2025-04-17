import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
export default function Home() {
  return (
    <div className="h-full">
      <div className="flex flex-row w-4/5 h-screen mt-40 place-content-aroundn justify-center align-middle mx-auto gap-24">
        <div className="flex w-5/12 h-fit">
          <Image src={"/hero.jpg"} width={580} height={700} alt="Foto de telas" />
        </div>

        <div className="flex flex-col w-7/12 gap-6 p-2 justify-center">
          <h3 className="text-4xl font-bold">Encuentra la tela perfecta para tu próximo proyecto</h3>
          <p className="text-xl">
            Desde cortinas hasta retazos únicos, descubre una amplia variedad de telas y accesorios con la mejor
            calidad. Compra en nuestra tienda física o explora el catálogo online.
          </p>
          <Link href="productos">
            <Button variant="outline" size="lg" className="border-[1px] border-black rounded-none">
              Ver catálogo
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col w-full justify-center gap-12 h-screen">
        <div className="flex justify-center">
          <h2>
            <b>Productos más vendidos</b>
          </h2>
        </div>

        <div className="flex flex-row justify-center gap-4">
          <Card className="w-64 h-64">PRODUCTO 1</Card>
          <Card className="w-64 h-64">PRODUCTO 2</Card>
          <Card className="w-64 h-64">PRODUCTO 3</Card>
          <Card className="w-64 h-64">PRODUCTO 4</Card>
        </div>
      </div>
    </div>
  );
}
