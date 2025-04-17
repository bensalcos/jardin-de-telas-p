"use client";
import Link from "next/link";
import { menuItems } from "@/constants/menuItems";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function NavPanel() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/forbidden");
  }

  if (status === "authenticated" && session?.user?.rol != "admin") {
    redirect("/forbidden");
  }
  return (
    <aside className="fixed top-0 left-0 min-w-64 max-w-80 min-h-screen bg-white shadow-zinc-400  shadow-lg">
      <nav className="flex flex-col justify-between min-h-screen p-4">
        <ul className="pt-24 space-y-6">
          <hr />
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex text-gray-800 hover:bg-hover rounded-menu h-10 w-full items-center justify-center"
            >
              <li>{item.title}</li>
            </Link>
          ))}
          <hr />
        </ul>
        <div className="flex text-gray-800 hover:bg-hover rounded-menu h-10 w-full items-center justify-center">
          <Button variant="ghost" onClick={() => signOut()}>
            Salir
          </Button>
        </div>
      </nav>
    </aside>
  );
}
