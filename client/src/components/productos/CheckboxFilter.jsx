"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";

export default function CheckboxFilter() {
  const [filters, setFilters] = useState([]);

  const handleCheckboxChange = (category) => {
    setFilters((prev) => (prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold p-2">Categorías</h2>
      <ul className="mt-4 p-4 space-y-2">
        {["Todos", "Retazos", "Cortinas", "Tapices"].map((category) => (
          <li key={category}>
            <label className="flex items-center space-x-2">
              <Checkbox checked={filters.includes(category)} onCheckedChange={() => handleCheckboxChange(category)} />
              <span>{category}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
