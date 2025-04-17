"use client";
import date from "date-and-time";
export default function UltimosPedidos({ pedidos }) {
  console.log(pedidos);

  return (
    <div className="flex flex-col">
      <div>
        {pedidos.map((pedido) => (
          <div key={pedido.id}>
            <p>
              Fecha:
              {() => {
                const formatDate = (dateString) => {
                  const date = new Date(dateString);

                  return {
                    fecha: format(date, "dd-MM-yyyy"),
                    hora: format(date, "HH:mm:ss"),
                  };
                };

                const result = formatDate(pedido.fecha_pedido);
                return `${result.fecha} ${result.hora}`;
              }}
              Total:
              {pedido.detalles.reduce((total, item) => total + item.precio * item.cantidad, 0)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
