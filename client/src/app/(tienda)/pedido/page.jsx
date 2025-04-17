"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Pedido() {
  const { data: session, status } = useSession();

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("https://www.api.bensalcos.dev/api/v1/pedidos/", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setPedidos(data))
        .catch((error) => console.error("Error fetching pedidos:", error));
    }
  }, [status, session]);

  if (status === "loading") {
    return (
      <div className="w-screen h-screen flex align-middle justify-center">
        <h2>Cargando...</h2>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="w-screen h-screen flex align-middle justify-center">
        <h2>Para ver sus pedidos debe haber iniciado sesión primero</h2>
      </div>
    );
  }

  return (
    <div>
      <h4></h4>
    </div>
  );
}
