import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { ResultPaginacion } from '../models/common/ResultPaginacion';
import { Usuario } from '../models/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

const { urlApi } = environment;
const url = urlApi + 'Usuario/';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private menuActual = new BehaviorSubject<any>({});
  public menuActual$ = this.menuActual.asObservable();

  public userSubject: BehaviorSubject<Usuario>;
  public user: Observable<Usuario>;

  public permisos = new BehaviorSubject<any>([]);
  public permisos$ = this.permisos.asObservable();

  menu = [];

  constructor(private http:HttpClient, private router: Router, private route: ActivatedRoute) {
    this.userSubject = new BehaviorSubject<Usuario>(null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): Usuario {
    return this.userSubject.value;
  }

  login(user){
    return this.http.post(`${url}Login`, user)
    .pipe(map((response:any) => {
      //console.warn(response);
      this.userSubject.next(response);
      localStorage.setItem("user", JSON.stringify(response));
      return response;
    }))
    .toPromise();
  }

  setMenu(menu){
    this.menuActual.next(menu)
  }

  logout() {
    this.userSubject = new BehaviorSubject<Usuario>(null);
    this.user = this.userSubject.asObservable();
    this.permisos = new BehaviorSubject<any>([]);
    this.permisos$ = this.permisos.asObservable();
    localStorage.removeItem('user')
    this.router.navigate(['/login']);
  }

}
