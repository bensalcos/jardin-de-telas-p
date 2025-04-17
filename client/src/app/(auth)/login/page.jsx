import UserAuthForm from "@/components/auth/userAuthForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col mx-auto w-1/3">
      <UserAuthForm />
      <div className="flex flex-row justify-start">
        <Button variant="link">
          <Link href="registro">Registro</Link>
        </Button>
        <Button variant="link">
          <Link href="recuperar-clave">¿Olvidó su contraseña?</Link>
        </Button>
      </div>
    </div>
  );
}
