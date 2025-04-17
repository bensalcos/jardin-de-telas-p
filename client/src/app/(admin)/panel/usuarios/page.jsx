import TablaUsuarios from "@/components/usuarios/TablaUsuarios";
import apiService from "@/lib/ApiService";

export default async function Usuarios() {
  const usuarios = await apiService.get("usuarios");

  return (
    <div>
      <TablaUsuarios usuarios={usuarios} />
    </div>
  );
}
