"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast, useToast } from "@/hooks/use-toast";

const recoverySchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
});

export default function UserPasswordRecoveryForm() {
  const form = useForm({
    resolver: zodResolver(recoverySchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Datos enviados:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-center">Recuperar contraseña</CardTitle>
            <hr />
            <Card className="bg-yellow-50 p-2">
              Ingresa tu correo electrónico para recibir un enlace de recuperación de contraseña.
            </Card>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="usuario@correo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button type="submit" variant="default" size="lg" className="bg-dark hover:bg-hover ">
              Enviar correo
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
