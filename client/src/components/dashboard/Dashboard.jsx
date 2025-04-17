"use client";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function Dashboard({ ...props }) {
  const { status } = useSession();
  if (status === "loading") {
    return <div>Cargando Dashboard</div>;
  } else if (status === "unauthenticated") {
    return <div>No tienes permisos para ver esta página</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="w-11/12 flex justify-around items-center gap-6 mb-10">
        <Card className="flex flex-col justify-center items-center w-1/3 bg-white shadow-lg rounded-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
          <p className="text-xl font-bold text-blue-500">{/*Object.keys(props.productos).length*/}</p>
        </Card>

        <Card className="flex flex-col justify-center items-center w-1/3 bg-white shadow-lg rounded-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700">Usuarios</h2>
          <p className="text-xl font-bold text-green-500">{/*Object.keys(props.usuarios).length*/}</p>
        </Card>

        <Card className="flex flex-col justify-center items-center w-1/3 bg-white shadow-lg rounded-sm p-6">
          <h2 className="text-lg font-semibold text-gray-700">Pedidos</h2>
          <p className="text-xl font-bold text-red-500">{/*Object.keys(props.pedidos).length*/}</p>
        </Card>
      </div>

      <div className="flex w-11/12 min-h-[400px] gap-28">
        <Card className="flex w-1/2 bg-white shadow-lg rounded-lg p-6">
          <CardContent className="flex flex-col align-middle w-full h-full">
            <CardTitle className="text-center">Últimos pedidos</CardTitle>
            <CardContent></CardContent>
          </CardContent>
        </Card>

        <Card className="flex w-1/2 bg-white shadow-lg rounded-lg p-6">
          <CardContent className="flex flex-col align-middle w-full h-full">
            <CardTitle className="text-center">Ventas</CardTitle>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
