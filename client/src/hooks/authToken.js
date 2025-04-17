// context/CarritoContext.js
import { createContext, useState, useContext } from "react";

// Crea el contexto para el carrito
const CarritoContext = createContext();

// Proveedor de contexto para el carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find((item) => item.id === producto.id);
      if (itemExistente) {
        return prevCarrito.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item));
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  // Eliminar un producto del carrito
  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Actualizar la cantidad de un producto
  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) => {
      return prevCarrito.map((item) => (item.id === id ? { ...item, cantidad } : item));
    });
  };

  // Vaciar el carrito
  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad, vaciarCarrito }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para acceder al contexto
export const useCarrito = () => useContext(CarritoContext);
