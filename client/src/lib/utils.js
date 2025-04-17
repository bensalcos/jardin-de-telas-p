import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cleanRut } from "rutlib";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatData(values) {
  const formatedData = {
    nombre: values.nombre,
    apellido: values.apellido,
    email: values.email,
    password: values.password,
    rol: values.rol,
    rut: cleanRut(values.rut),
    direccion: {
      calle: values.calle,
      numero: values.numero,
      comuna: values.comuna,
      region: values.region,
    },
  };

  return formatedData;
}

export const sendToApi = async (endpoint, data, method = "POST") => {
  try {
    // Configuración básica de la solicitud
    const options = {
      method, // Usamos el tipo de request pasado como argumento
      headers: {
        "Content-Type": "application/json", // Especificamos que los datos son en formato JSON
      },
    };

    // Si se pasa un cuerpo (data), lo agregamos a la solicitud
    if (data) {
      options.body = JSON.stringify(data); // Convertimos el objeto a JSON
    }

    // Enviamos la solicitud
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`Error en la solicitud ${method}: ${response.statusText}`);
    }

    const result = await response.json(); // Parseamos la respuesta JSON
    return result; // Retornamos el resultado de la API
  } catch (error) {
    console.error("Error al enviar los datos:", error);
    throw error; // Lanza el error para que quien llame la función lo maneje
  }
};

export async function fetchFromAPI(endpoint, options = {}) {
  const baseUrl = "http://127.0.0.1:8000/api";

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache || "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error.message);
    throw error;
  }
}
