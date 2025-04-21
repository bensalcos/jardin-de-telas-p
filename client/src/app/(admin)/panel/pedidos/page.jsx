"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Estado from "@/components/pedidos/Estado";
import { Button } from "@/components/ui/button";
import apiService from "@/lib/ApiService"; // Asegúrate de que apiService esté bien importado

export default function Pedidos() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("productos");
        setData(response.data); // Suponiendo que la respuesta tiene la propiedad `data`
        setLoading(false);
      } catch (err) {
        setError(err.message || "Error al cargar los productos");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = (data || []).filter(
    (pedido) => pedido.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || pedido.estado.toLowerCase().includes(searchQuery.toLowerCase()) // El filtro ahora es OR
  );

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    console.log("Error:", error);
    return <div>No se pudo cargar la lista de productos.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Pedidos</h1>
      <div>
        <input
          type="text"
          placeholder="Buscar por nombre o estado"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 border rounded"
        />
      </div>
      <div>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((pedido) => (
            <div key={pedido.id} className="border p-4 mb-4">
              <h2 className="text-xl font-semibold">{pedido.nombre}</h2>
              <Estado estado={pedido.estado} /> {/* Muestra el estado */}
              <Link href={`/pedidos/${pedido.id}`}>
                <Button variant="outline" className="mt-2">
                  Ver detalles
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <div>No se encontraron productos.</div>
        )}
      </div>
    </div>
  );
}
