"use client";
import { useSession, signOut } from "next-auth/react";
import { User, LogOut, LogIn } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserButton() {
  const { data: session, status } = useSession();

  return (
    <div className="">
      {session ? (
        <div className="flex flex-col">
          <div className="flex justify-center">
            <span className="font-medium">
              {session?.user?.nombre} {session?.user?.apellido}
            </span>
          </div>
          <div className="flex">
            <Button variant="ghost" onClick={() => signOut()}>
              <LogOut />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      ) : (
        <Link href="/login">
          <Button variant="ghost">
            <LogIn />
            Iniciar Sesion
          </Button>
        </Link>
      )}
    </div>
  );
}
