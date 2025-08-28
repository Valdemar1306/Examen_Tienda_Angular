import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente';
import { ResponseDto } from '../models/common/ResponseDto';
import { CarritoItem } from '../models/Carrito';

const { urlApi } = environment;
const apiUrl = urlApi + 'General';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http:HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  // Obtener lista de clientes
  getClientes(): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${apiUrl}/getClientes`);
  }

  // Obtener un cliente por ID
  getClienteById(id: number): Observable<ResponseDto> {
    return this.http.get<ResponseDto>(`${apiUrl}/getClienteById/${id}`);
  }

  // Agregar cliente
  addCliente(cliente: Cliente): Observable<ResponseDto> {
    return this.http.post<ResponseDto>(`${apiUrl}/addCliente`, cliente);
  }

  // Actualizar cliente
  updateCliente(cliente: Cliente): Observable<ResponseDto> {
    return this.http.put<ResponseDto>(`${apiUrl}/updateCliente/${cliente.idCliente}`, cliente);
  }

  // Eliminar cliente
  deleteCliente(id: number): Observable<ResponseDto> {
    return this.http.delete<ResponseDto>(`${apiUrl}/deleteCliente/${id}`);
  }

  buyCarrito(Carrito:CarritoItem[]){
    return this.http.post<ResponseDto>(`${apiUrl}/buyCarrito`, Carrito);
  }

}
