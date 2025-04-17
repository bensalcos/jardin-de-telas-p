"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ProductoPage = () => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { id } = router.query; // Obtener el id de la URL

  useEffect(() => {
    if (!id) return; // Esperar a que 'id' esté disponible

    // Función para obtener los detalles del producto
    const fetchProducto = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://www.bensalcos.dev/api/v1/productos/${id}`); // Ajusta la URL de la API según corresponda
        if (!res.ok) {
          throw new Error("Error al cargar el producto");
        }
        const data = await res.json();
        setProducto(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]); // Volver a ejecutar cuando el id cambie

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!producto) return <p>Producto no encontrado.</p>;

  return (
    <div>
      <h1>{producto.nombre}</h1>
      <p>{producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      <img src={producto.imagen} alt={producto.nombre} />
    </div>
  );
};

export default ProductoPage;
