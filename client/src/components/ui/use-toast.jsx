// src/components/ui/use-toast.jsx
"use client";
import React, { useState } from "react";
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastAction, ToastClose } from "./toast";

// Hook para interactuar con los toasts
export function useToast() {
  const [toasts, setToasts] = useState([]);

  // Función para agregar un nuevo toast
  const toast = ({ title, description, variant = "default", duration = 5000 }) => {
    const id = new Date().getTime();
    const newToast = { id, title, description, variant, duration };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Eliminar el toast después de cierto tiempo
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return {
    toast,
    toasts, // Devuelve la lista de toasts activos
    ToastProvider,
    ToastViewport,
    Toast,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastClose,
  };
}
