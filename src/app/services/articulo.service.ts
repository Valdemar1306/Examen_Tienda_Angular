import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Articulo } from '../models/Articulo';
import { ResponseDto } from '../models/common/ResponseDto';

const { urlApi } = environment;
const apiUrl = urlApi + 'Articulo';


@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  // Obtener lista de articulos
  getArticulos(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${apiUrl}/getArticulos`);
  }

  // Obtener un articulo por ID
  getArticuloById(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${apiUrl}/getArticuloById/${id}`);
  }

  // Agregar articulo
  addArticulo(articulo: any): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${apiUrl}/addArticulo`, articulo);
  }

  // Actualizar articulo
  updateArticulo(idArticulo:number, articulo: any): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(`${apiUrl}/updateArticulo/${idArticulo}`, articulo);
  }

  // Eliminar articulo
  deleteArticulo(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(`${apiUrl}/deleteArticulo/${id}`);
  }

}