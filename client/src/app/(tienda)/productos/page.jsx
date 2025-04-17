import ProductList from "@/components/productos/ProductList";
import apiService from "@/lib/ApiService";

export default async function Productos() {
  const productos = await apiService.get("productos");
  const categorias = await apiService.get("categorias");
  return (
    <div className="flex flex-row flex-wrap w-5/6 mx-auto mt-[90px] gap-12">
      <div className="flex flex-col w-full p-8">
        <ProductList productos={productos} categorias={categorias} />
      </div>
    </div>
  );
}
