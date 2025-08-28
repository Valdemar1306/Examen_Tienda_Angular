
export class Articulo {
  idArticulo: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  precio: number;
  imagen?: string;
  urlImagen?: string;
  stock: number;
  idTienda?: number;
  sucursal?: string;
}