"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { regiones } from "@/constants/regiones";
import { useState } from "react";
import { formatRut, validateRut } from "rutlib";
import { useSession } from "next-auth/react";

const registerSchema = z
  .object({
    email: z.string().email("Debe ser un correo válido").min(1, "El correo es obligatorio"),
    password: z.string().min(6, "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"),
    passwordConfirm: z.string(),
    nombre: z
      .string()
      .min(1, "El nombre es obligatorio")
      .refine((val) => /^[a-zA-Z ]+$/.test(val), { message: "El nombre solo puede contener letras y espacios" }),
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
    region: z.string().optional(),
    comuna: z.string().optional(),
    rol: z.string(),
    calle: z.string().optional(),
    telefono: z
      .string()
      .optional()
      .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0), {
        message: "El campo solo puede contener números",
      }),
    rut: z.string(),
    apellido: z
      .string()
      .min(1, "El apellido es obligatorio")
      .refine((val) => /^[a-zA-Z ]+$/.test(val), { message: "El apellido solo puede contener letras y espacios" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Las contraseñas no coinciden",
    path: ["passwordConfirm"],
  });

export default function UserCreateForm() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const comunasRegion = regiones.find((region) => parseInt(region.number) === selectedRegion)?.communes || [];
  const [rol, setRol] = useState(null);
  const roles = ["vendedor", "cliente", "admin"];
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      nombre: "",
      apellido: "",
      rut: "",
      calle: "",
      numero: "",
      telefono: "",
      dpto: "",
      password: "",
      passwordConfirm: "",
      region: "",
      comuna: "",
      rol: "",
    },
  });

  const onSubmit = async (values) => {
    const formattedValues = {
      nombre: values.nombre,
      apellido: values.apellido,
      rut: values.rut,
      correo: values.email,
      telefono: values.telefono,
      direccion: {
        calle: values.calle,
        numero: values.numero,
        region: values.region,
        comuna: values.comuna,
      },
      password: values.password,
      rol: values.rol,
    };
    console.log(formattedValues);
    try {
      const response = await fetch(`https://api.bensalcos.dev/api/v1/usuarios/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(formattedValues),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error(`Error al actualizar el usuario: ${response.status}`);
      }
      const data = await response.json();
      toast({
        title: "Usuario creado correctamente",
        variant: "success",
      });
      window.history.back();
    } catch (err) {
      toast({
        title: `Error al actualizar el usuario: ${err.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="p-4">
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
              name="telefono"
              render={({ field }) => (
                <FormItem className="w-4/12 p-2">
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="+56912345678" {...field} />
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
                    <Input type="text" placeholder="Departamento" autoComplete="Departamento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rol"
              render={({ field }) => (
                <FormItem className="w-2/12 p-2">
                  <FormLabel htmlFor="region">Rol</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        setRol(value);
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rol" {...field} />
                      </SelectTrigger>

                      <SelectContent>
                        {roles.map((rol) => (
                          <SelectItem key={roles.indexOf(rol)} value={rol}>
                            {rol}
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
            <Button type="button" onClick={() => window.history.back()} variant="outline" size="lg" className="text-dark border-dark hover:bg-gray-200">
              Volver
            </Button>
            <Button type="submit" variant="default" size="lg">
              Guardar Usuario
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
