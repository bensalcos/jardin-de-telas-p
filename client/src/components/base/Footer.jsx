import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-col place-content-evenly mx-auto bg-gray-800 text-secondary text-center py-4 self-end">
      <div className="flex flex-row place-content-around ">
        <div>
          <h6 className="text-light">Tienda</h6>
          <p>Dirección: Borgoño 399, Coquimbo</p>
        </div>
        <div>
          <h6 className="text-light">Horario de atención</h6>
          <p>Lunes – Viernes: 10:00-16:00</p>
          <p>Sábado: 10:00 – 14:00</p>
        </div>
        <div>
          <h6 className="text-light">Contáctenos</h6>
          <p>+569 12345678</p>
          <p>contacto@jardindetelas.cl</p>
        </div>
      </div>

      <div className="flex flex-row place-content-evenly mt-8">
        <p className="mt-4 text-secondary">© 2024 Jardín de Telas. Diseño y desarrollo por Benjamín Salazar.</p>
        <div className="flex flex-row gap-4">
          <Image src={"./visa.svg"} alt="visa" width={58} height={20} />
          <Image src={"./mastercard.svg"} alt="mastercard" width={58} height={20} />
          <Image src={"./webpay.svg"} alt="webpay" width={58} height={20} />
        </div>
      </div>
    </footer>
  );
}
export default Footer;
