"use client";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function TablaInventario({ productos }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = (productos || []).filter(
    (producto) =>
      producto.SKU.toLowerCase().includes(searchQuery.toLowerCase()) ||
      producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-4">
        <div className="w-5/6">
          <input
            type="text"
            placeholder="Buscar producto por SKU o nombre"
            className="border rounded-md p-2 w-full border-gray-300  hover:border-blue-400  focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-1/6">
          <Link href={"inventario/crear-producto/"}>
            <Button variant="success">Agregar producto</Button>
          </Link>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell>{producto.SKU}</TableCell>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>{producto.categoria.nombre}</TableCell>
                <TableCell className="flex flex-row gap-2">
                  <Link href={`inventario/${producto.id}`}>
                    <Button variant="detalles">Detalles</Button>
                  </Link>
                  <Button variant="destructive">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center mt-4 text-gray-500">No se encontraron productos.</div>
      )}
    </div>
  );
}
