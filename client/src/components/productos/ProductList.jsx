"use client";
import { ProductCard } from "./ProductCard";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ProductList({ productos, categorias }) {
  const productosArray = Object.values(productos); // Aseguramos que sea un array
  const categoriasArray = Object.values(categorias); // Convertimos a array si no lo es

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const filteredProducts = productosArray.filter((producto) => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(producto.categoria.id);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-row place-content-between gap-8">
      <div className="flex flex-col w-3/12 h-full justify-start">
        <Card className="min-w-[200px]">
          <CardHeader>
            <CardTitle>Selecciona categorías</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-start gap-4">
              {categoriasArray.map((categoria) => (
                <div key={categoria.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={categoria.id}
                    checked={selectedCategories.includes(categoria.id)}
                    onCheckedChange={() => toggleCategory(categoria.id)}
                  />
                  <Label
                    htmlFor={categoria.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {categoria.nombre}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col w-9/12 justify-end">
        <div>
          <input
            type="text"
            placeholder={"Buscar productos..."}
            className="border rounded-md p-2 w-full hover:border-blue-600 focus:outline-none focus:border-blue-700"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-row flex-wrap gap-4 mt-8 mx-auto">
          {filteredProducts.map((producto) => (
            <ProductCard key={producto.id} {...producto} />
          ))}
        </div>
      </div>
    </div>
  );
}
