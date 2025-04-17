// app/productos/page.js
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function Nosotros() {
  return (
    <div className="flex flex-row place-content-evenly mt-10 w-full">
      <Card className="flex flex-col w-5/12  bg-white">
        <CardHeader>
          <CardTitle className="text-center">
            <h2>Nosotros</h2>
          </CardTitle>
        </CardHeader>
        <CardContent className="mx-auto w-11/12">
          <p>
            "Desde 2008, nuestra tienda ha sido el lugar donde las ideas cobran vida a través de las telas. Con más de
            15 años de trayectoria, nos hemos convertido en un rincón especial para quienes buscan inspiración, calidad
            y atención personalizada. Atendida con dedicación por su dueña, nuestra tienda nació con la pasión de
            ofrecer una amplia variedad de telas, retazos únicos, cortinas a medida y tapices de calidad. Cada rincón de
            nuestro local está lleno de opciones para proyectos de decoración, moda y manualidades, pensadas para
            creativos de todos los niveles. Nos enorgullece ser un espacio cercano y acogedor, donde cada cliente
            encuentra no solo productos, sino también asesoría y apoyo para dar forma a sus ideas. Nuestra misión es
            simple: ayudarte a encontrar esa pieza especial que hará la diferencia en tus proyectos. Con años de
            experiencia, seguimos evolucionando sin perder nuestra esencia artesanal, adaptándonos a las necesidades de
            quienes confían en nosotros. Gracias por ser parte de nuestra historia y por permitirnos seguir compartiendo
            esta pasión por las telas contigo."
          </p>
        </CardContent>
      </Card>

      <div className="flex w-[500px] flex-col overflow-hidden  gap-10">
        <Image src={"/local.png"} alt="placeholder" width={440} height={800} />
      </div>
    </div>
  );
}
