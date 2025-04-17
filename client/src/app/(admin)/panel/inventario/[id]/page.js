"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DetallesProducto() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://api.bensalcos.dev/api/v1/productos/${id}/`);
        if (!response.ok) {
          throw new Error(`Error al obtener el producto: ${response.status}`);
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  if (loading) return <p>Cargando detalles del producto...</p>;
  if (error) return <p>Error: {error}</p>;

  const {
    SKU = "N/A",
    nombre = "N/A",
    descripcion = "N/A",
    precio = "N/A",
    stock = "N/A",
    categoria = "N/A",
    dimensiones = "N/A",
    imagenes = "N/A",
  } = producto || {};

  return (
    <div>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {SKU} - {nombre}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CardDescription>
                  <p>
                    <strong>Nombre:</strong> {nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {descripcion}
                  </p>
                  <p>
                    <strong>Correo:</strong> {precio}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {stock}
                  </p>
                  <p>
                    {imagenes.map((imagen, index) => (
                      <img key={index} src={imagen.url} alt={`Imagen ${index}`} />
                    ))}
                  </p>
                </CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
