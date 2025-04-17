import "@/styles/globals.css";
import { Inter } from "next/font/google";
import NavPanel from "@/components/base/NavPanel";
import { Providers } from "@/app/Providers";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({
  subsets: ["latin"],
  weights: [400, 500, 600, 700],
  variable: "--font-inter",
});

export default async function AdminLayout({ children }) {
  return (
    <Providers>
      <html lang="es">
        <body className="h-full ${inter.variable}">
          <div className="flex">
            <NavPanel />
            <main className="ml-64 flex-1 p-6 ">{children}</main>
            <Toaster />
          </div>
        </body>
      </html>
    </Providers>
  );
}
