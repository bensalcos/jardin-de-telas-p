import React from "react";

export default function BarraBusqueda({ placeholder, value, onChange }) {
  return (
    <input type="text" placeholder={placeholder} className="border rounded-md p-2 w-full hover:border-blue-600 focus:outline-none focus:border-blue-700" value={value} onChange={onChange} />
  );
}
