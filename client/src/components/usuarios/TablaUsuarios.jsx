"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { tiposUsuarios } from "@/constants/tiposUsuarios";
import BarraBusqueda from "@/components/ui/barra-busqueda";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/toast";

export default function TablaUsuarios({ usuarios }) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const usuariosFiltrados = usuarios.filter(
    (usuario) => usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase()) || usuario.apellido.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://api.bensalcos.dev/api/v1/usuarios/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar el usuario: ${response.status}`);
      }
      console.log("Usuario eliminado correctamente");
      toast({
        title: "Usuario eliminado correctamente",
        variant: "success",
      });
    } catch (err) {
      toast({
        title: `Error al eliminar el usuario: ${err.message}`,
        variant: "destructive",
      });
    }
  };

  const confirmDelete = (id) => {
    setSelectedUser(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      handleDelete(selectedUser);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col justify-center align-middle">
      <div className="flex flex-row gap-4 mb-4">
        <BarraBusqueda placeholder="Buscar usuario por nombre/apellido" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <div className="w-1/6">
          <Link href="usuarios/crear-usuario">
            <Button variant="success">Agregar usuario</Button>
          </Link>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Apellido</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>RUT</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuariosFiltrados.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.apellido}</TableCell>
              <TableCell>{usuario.correo}</TableCell>
              <TableCell>{usuario.rut}</TableCell>
              <TableCell>
                <Badge className={tiposUsuarios[usuario.rol]}>{usuario.rol}</Badge>
              </TableCell>
              <TableCell className="flex flex-row gap-2">
                <Link href={`usuarios/${usuario.id}`}>
                  <Button variant="detalles">Detalles</Button>
                </Link>
                <Button variant="destructive" onClick={() => confirmDelete(usuario.id)}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás seguro?</DialogTitle>
          </DialogHeader>
          <p>Esta acción no se puede deshacer. El usuario será eliminado de forma permanente.</p>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
