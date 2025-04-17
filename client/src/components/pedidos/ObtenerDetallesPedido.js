


const detallesPedidos = [
  {
    pedidoId: 1,
    estado: "entregado",
    detalles: [
      { id_detalles: 1, producto_id: 101, cantidad: 2, precio_unitario: 7500, nombre_producto: "Producto A", sku: "A001" },
      { id_detalles: 2, producto_id: 102, cantidad: 1, precio_unitario: 15000, nombre_producto: "Producto B", sku: "B002" },
    ],
    total: 30000,
  },
  {
    pedidoId: 2,
    estado: "pendiente",
    detalles: [
      { id_detalles: 3, producto_id: 103, cantidad: 3, precio_unitario: 5000, nombre_producto: "Producto C", sku: "C003" },
      { id_detalles: 4, producto_id: 104, cantidad: 2, precio_unitario: 10000, nombre_producto: "Producto D", sku: "D004" },
    ],
    total: 35000,
  },
  {
    pedidoId: 3,
    estado: "enviado",
    detalles: [
      { id_detalles: 5, producto_id: 105, cantidad: 1, precio_unitario: 25000, nombre_producto: "Producto E", sku: "E005" },
    ],
    total: 25000,
  },
  {
    pedidoId: 4,
    estado: "enviado",
    detalles: [
      { id_detalles: 6, producto_id: 106, cantidad: 4, precio_unitario: 7500, nombre_producto: "Producto F", sku: "F006" },
    ],
    total: 30000,
  },
  {
    pedidoId: 5,
    estado: "pendiente",
    detalles: [
      { id_detalles: 7, producto_id: 107, cantidad: 2, precio_unitario: 17500, nombre_producto: "Producto G", sku: "G007" },
      { id_detalles: 8, producto_id: 108, cantidad: 1, precio_unitario: 20000, nombre_producto: "Producto H", sku: "H008" },
    ],
    total: 55000,
  },
  {
    pedidoId: 6,
    estado: "pendiente",
    detalles: [
      { id_detalles: 9, producto_id: 109, cantidad: 3, precio_unitario: 13333, nombre_producto: "Producto I", sku: "I009" },
    ],
    total: 40000,
  },
  {
    pedidoId: 7,
    estado: "pendiente",
    detalles: [
      { id_detalles: 10, producto_id: 110, cantidad: 1, precio_unitario: 45000, nombre_producto: "Producto J", sku: "J010" },
    ],
    total: 45000,
  },
  {
    pedidoId: 8,
    estado: "cancelado",
    detalles: [
      { id_detalles: 11, producto_id: 111, cantidad: 2, precio_unitario: 25000, nombre_producto: "Producto K", sku: "K011" },
    ],
    total: 50000,
  },
  {
    pedidoId: 9,
    estado: "pendiente",
    detalles: [
      { id_detalles: 12, producto_id: 112, cantidad: 3, precio_unitario: 18333, nombre_producto: "Producto L", sku: "L012" },
    ],
    total: 55000, 
  },
  {
    pedidoId: 10,
    estado: "pendiente",
    detalles: [
      { id_detalles: 13, producto_id: 113, cantidad: 2, precio_unitario: 30000, nombre_producto: "Producto M", sku: "M013" },
    ],
    total: 60000, 
  },
];

export function ObtenerDetallesPedido(pedidoId) {
  const pedido = detallesPedidos.find((pedido) => pedido.pedidoId === parseInt(pedidoId));
  return pedido ? pedido : [];
}