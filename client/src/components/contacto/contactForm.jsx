"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
const name = z.string({
  required_error: "Name is required",
  invalid_type_error: "Name must be a string",
});

const registerSchema = z.object({
  email: z.string().email("Debe ser un correo válido").min(1, "El correo es obligatorio"),
  nombre_apellido: z
    .string()
    .min(1, "El nombre es obligatorio")
    .refine((val) => /^[a-zA-Z ]+$/.test(val), {
      message: "El nombre solo puede contener letras y espacios",
    }),
  telefono: z.string().min(9, "El teléfono es obligatorio"),
  mensaje: z.string().min(1, "El mensaje es obligatorio"),
  mensaje: z
    .string()
    .min(10, {
      message: "El mensaje debe tener al menos 10 caracteres.",
    })
    .max(160, {
      message: "el mensaje debe tener menos de 180 caracteres.",
    }),
});

export function ContactForm() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      nombre_apellido: "",
      telefono: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Datos enviados:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="nombre_apellido"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel>Nombre y apellido</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Nombre y apellido" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl>
                <Input type="email" placeholder="usuario@correo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem className="w-full p-2">
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input type="text" placeholder="+569 12345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensaje"
          render={({ field }) => (
            <FormItem className="w-full p-2 mt-3">
              <FormLabel>Mensaje</FormLabel>
              <FormControl>
                <Textarea placeholder="Mensaje" className="resize  min-h-44 max-h-[400px] max-w-full" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg">
          Enviar
        </Button>
      </form>
    </Form>
  );
}
