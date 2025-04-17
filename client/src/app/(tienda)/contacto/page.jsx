import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contacto/contactForm";
import { Textarea } from "@/components/ui/textarea";
export default function Contacto() {
  return (
    <div className="flex flex-col  justify-center mt-10 mb-24">
      <div className="text-center">
        <h1 className="text-2xl">
          <b>Contacto</b>
        </h1>
      </div>
      <div className="flex flex-row place-content-evenly mt-10 w-full">
        <Card className="flex flex-col w-5/12  bg-white">
          <CardHeader>
            <CardTitle className="text-center">
              <h2>Formulario de contacto</h2>
            </CardTitle>
          </CardHeader>
          <CardContent className="mx-auto w-11/12">
            <ContactForm />
          </CardContent>
        </Card>

        <div className="flex w-[500px] flex-col overflow-hidden  gap-10">
          <Card>
            <CardContent>
              <CardHeader>
                <CardTitle>
                  <b>Nuestra Ubicación</b>
                </CardTitle>
              </CardHeader>

              <p>Borgoño, 399, Coquimbo</p>
              <p>
                Atendemos de lunes a viernes desde las <b>10:00 a las 16:00</b> horas
              </p>
              <p>
                y sábados de <b>10:00 a 14:00</b> horas
              </p>
              <p>Telefono: +569 12345678</p>
            </CardContent>
          </Card>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d432.1059849345137!2d-71.33883637173322!3d-29.955053912506447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9691c9c464be0f03%3A0x70dc6622baab0dc1!2sJard%C3%ADn%20de%20telas!5e0!3m2!1ses!2scl!4v1732644788866!5m2!1ses!2scl"
            width="500"
            height="500"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
