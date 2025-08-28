import { Articulo } from "./Articulo";

export interface CarritoItem {
  articulo: Articulo;
  cantidad: number;
}