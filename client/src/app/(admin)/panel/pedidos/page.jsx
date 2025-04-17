import Link from "next/link";
import Estado from "@/components/pedidos/Estado";
import { Button } from "@/components/ui/button";

export default function Pedidos() {
  const { data, loading, error } = useFetchData("productos/");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = (data || []).filter(
    (pedido) => pedido.nombre.toLowerCase().includes(searchQuery.toLowerCase()),
    pedidos.estado.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (loading) {
    return <div>Cargando productos..</div>;
  }
  if (error) {
    console.log("Error:", error);
    return <div>No se pudo cargar la lista de productos.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Pedidos</h1>
    </div>
  );
}
