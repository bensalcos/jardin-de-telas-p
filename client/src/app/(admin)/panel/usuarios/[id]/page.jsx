"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UserEditForm from "@/components/dashboard/userEditForm";

export default function DetallesUsuario() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchUsuario = async () => {
      try {
        const response = await fetch(`https://api.bensalcos.dev/api/v1/usuarios/${id}/`);
        if (!response.ok) {
          throw new Error(`Error al obtener el usuario: ${response.status}`);
        }
        const data = await response.json();
        setUsuario(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) return <p>Cargando detalles del usuario...</p>;
  if (error) return <p>Error: {error}</p>;

  const {
    nombre = "N/A",
    apellido = "N/A",
    correo = "N/A",
    telefono = "N/A",
    direccion = "N/A",
    fecha_nacimiento = "N/A",
    genero = "N/A",
    rol = "N/A",
    estado = "N/A",
  } = usuario || {};

  return (
    <div>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>
              Detalles del Usuario: {usuario.nombre} {usuario.apellido}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <CardDescription>
                  <p>
                    <strong>Nombre:</strong> {usuario.nombre}
                  </p>
                  <p>
                    <strong>Apellido:</strong> {usuario.apellido}
                  </p>
                  <p>
                    <strong>Correo:</strong> {usuario.correo}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {usuario.telefono}
                  </p>
                  <p>
                    <strong>Fecha de Nacimiento:</strong> {fecha_nacimiento}
                  </p>
                </CardDescription>
              </div>
              <div>
                <CardDescription>
                  <p>
                    <strong>Rol:</strong> {rol}
                  </p>
                  <p>
                    <strong>Dirección:</strong>
                  </p>
                  <p className="ml-5">Region: {direccion.region}</p>
                  <p className="ml-5">Comuna: {direccion.comuna}</p>
                  <p className="ml-5">Calle: {direccion.calle}</p>
                  <p className="ml-5">Número: {direccion.numero}</p>
                </CardDescription>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <UserEditForm usuario={usuario} />
      </div>
    </div>
  );
}
