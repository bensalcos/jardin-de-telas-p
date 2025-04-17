import { estadosPedidos } from "@/constants/estadosPedidos";

export default function Estado({ estado }) {
  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${estadosPedidos[estado]}`}
    >
      {estado}
    </span>
  );
}