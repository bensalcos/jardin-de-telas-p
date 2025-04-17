"use server";
import apiService from "@/lib/ApiService";

export default async function getProduct(id) {
  const producto = await apiService.get("productos/id");
  return producto;
}
