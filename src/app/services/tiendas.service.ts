import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Tienda } from '../models/Tienda';
import { ResponseDto } from '../models/common/ResponseDto';

const { urlApi } = environment;
const apiUrl = urlApi + 'Tienda';


@Injectable({
  providedIn: 'root'
})
export class TiendaService {

  constructor(private http:HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  // Obtener lista de tiendas
  getTiendas(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${apiUrl}/getTiendas`);
  }

  // Obtener un tienda por ID
  getTiendaById(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${apiUrl}/getTiendaById/${id}`);
  }

  // Agregar tienda
  addTienda(tienda: Tienda): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${apiUrl}/addTienda`, tienda);
  }

  // Actualizar tienda
  updateTienda(tienda: Tienda): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(`${apiUrl}/updateTienda/${tienda.idTienda}`, tienda);
  }

  // Eliminar tienda
  deleteTienda(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(`${apiUrl}/deleteTienda/${id}`);
  }

}