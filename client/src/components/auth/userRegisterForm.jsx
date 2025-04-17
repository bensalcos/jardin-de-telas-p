"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { formatRut, validateRut } from "rutlib";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { regiones } from "@/constants/regiones";
import { useState } from "react";

const registerSchema = z
  .object({
    email: z.string().email("Debe ser un correo válido").min(1, "El correo es obligatorio"),
    password: z
      .string()
      .min(
        6,
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      ),
    passwordConfirm: z.string(),
    nombre: z
      .string()
      .min(1, "El nombre es obligatorio")
      .refine((val) => /^[a-zA-Z ]+$/.test(val), {
        message: "El nombre solo puede contener letras y espacios",
      }),
    numero: z
      .string()
      .optional()
      .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) > 0), {
        message: "El campo solo puede contener números",
      }),
    dpto: z
      .string()
      .optional()
      .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) > 0), {
        message: "El campo solo puede contener números",
      }),
    calle: z.string().optional(),
    rut: z.string().refine(validateRut, { message: "El rut ingresado no es válido" }),
    apellido: z
      .string()
      .min(1, "El apellido es obligatorio")
      .refine((val) => /^[a-zA-Z ]+$/.test(val), {
        message: "El apellido solo puede contener letras y espacios",
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

export default function UserCreateForm() {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const comunasRegion = regiones.find((region) => parseInt(region.number) === selectedRegion)?.communes || [];

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      nombre: "",
      apellido: "",
      rut: "",
      calle: "",
      numero: "",
      dpto: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values) => {
    console.log("Datos enviados:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className=" p-4">
          <CardHeader>
            <CardTitle className="flex justify-center text-lg">Registro</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-start gap-2">
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem className="w-5/12 p-2">
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
              name="apellido"
              render={({ field }) => (
                <FormItem className="w-5/12 p-2">
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Apellido" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rut"
              render={({ field }) => (
                <FormItem className="w-3/12 p-2">
                  <FormLabel>Rut</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Rut"
                      {...field}
                      onChange={(e) => {
                        const formattedValue = formatRut(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-4/12 p-2">
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
              name="calle"
              render={({ field }) => (
                <FormItem className="w-4/12 p-2">
                  <FormLabel>Calle</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Calle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem className="w-2/12 p-2">
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Número" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dpto"
              render={({ field }) => (
                <FormItem className="w-2/12 p-2">
                  <FormLabel>Departamento</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Departamento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem className="w-3/12 p-2">
                  <FormLabel htmlFor="region">Región</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setSelectedRegion(parseInt(value));
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Región" {...field} />
                      </SelectTrigger>

                      <SelectContent>
                        {regiones.map((region) => (
                          <SelectItem key={region.number} value={region.number.toString()}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comuna"
              render={({ field }) => (
                <FormItem className="w-3/12 p-2">
                  <FormLabel htmlFor="comuna">Comuna</FormLabel>
                  <FormControl>
                    <Select disabled={!selectedRegion} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Comuna" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        {comunasRegion.map((comuna, index) => (
                          <SelectItem key={index} value={comuna.name}>
                            {comuna.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-5/12 p-2">
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" autoComplete="new-password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem className="w-5/12 p-2">
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" autoComplete="new-password" {...field} />
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
              className="text-dark border-dark hover:bg-gray-200"
            >
              Volver
            </Button>

            <Button type="submit" variant="success" size="lg">
              Registrarme
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
