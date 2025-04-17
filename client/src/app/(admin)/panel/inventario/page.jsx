import TablaInventario from "@/components/inventario/TablaInventario";
import apiService from "@/lib/ApiService";

export default async function Inventario() {
  const productos = await apiService.get("productos");

  return (
    <div>
      <TablaInventario productos={productos} />
    </div>
  );
}
