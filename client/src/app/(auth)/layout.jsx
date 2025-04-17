import "@/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
  variable: "--font-inter",
});

export default function AuthLayout({ children }) {
  return (
    <html lang="es">
      <body className="${inter.variable} bg-[#EEEDEB]">
        <div className="min-h-screen flex items-center justify-center">
          <main className="w-full max-w-5xl p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
