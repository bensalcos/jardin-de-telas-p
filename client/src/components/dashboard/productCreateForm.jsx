"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const registerSchema = z.object({
  nombre: z.string(),
  SKU: z.string(),
  descripcion: z.string(),
  precio: z.string(),
});

export default function ProductCreateForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: "",
      SKU: "",
      descripcion: "",
      precio: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Datos enviados:", values);
  };

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const response = await fetch("https://api.bensalcos.dev/api/v1/categorias/");
        if (!response.ok) {
          throw new Error(`Error en la petición: ${response.statusText}`);
        }
        const data = await response.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error obteniendo categorías:", error.message);
      }
    };

    cargarCategorias();
  }, []);
  console.log("Categorias:", categorias, categorias.type);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className=" p-4">
          <CardHeader>
            <CardTitle className="flex justify-center text-lg">Agregar producto nuevo</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-start gap-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem className="w-12/12 p-2">
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="SKU"
              render={({ field }) => (
                <FormItem className="w-12/12 p-2">
                  <FormLabel>SKU</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="SKU" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem className="w-12/12 p-2">
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="precio"
              render={({ field }) => (
                <FormItem className="w-12/12 p-2">
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Precio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="precio"
              render={({ field }) => (
                <FormItem className="w-12/12 p-2">
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        {categorias.map((categoria) => (
                          <SelectItem key={categoria.id} value={categoria.id}>
                            {categoria.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center flex-row gap-12">
            <Button
              type="button"
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="text-dark border-dark hover:bg-gray-200 onClick={() => window.history.back()}"
            >
              Volver
            </Button>

            <Button type="submit" size="lg">
              Guardar Producto
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
