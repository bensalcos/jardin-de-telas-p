"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ObtenerDetallesPedido } from "@/components/pedidos/ObtenerDetallesPedido";
import Estado from "@/components/pedidos/Estado";

export default function DetallesPedido() {
  const params = useParams();
  const router = useRouter();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const fetchPedido = async () => {
      setPedido(ObtenerDetallesPedido(params.id));
    };

    fetchPedido();
  }, [params.id]);
  console.log(pedido);

  if (!pedido) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex  align-middle text-2xl font-bold mb-6">
        Detalles del Pedido #{params.id} <Estado estado={pedido.estado} />{" "}
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cantidad
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio unitario
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedido.detalles.map((item) => (
                <tr key={item.producto_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.producto_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.nombre_producto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.cantidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${item.precio_unitario}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    ${item.precio_unitario * item.cantidad}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-800">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-800">
                  ${pedido.detalles.reduce((total, item) => total + item.precio_unitario * item.cantidad, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
