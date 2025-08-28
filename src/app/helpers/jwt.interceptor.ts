import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private usuarioService: UsuarioService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     // add auth header with jwt if user is logged in and request is to the api url
     const user = this.usuarioService.userValue;
     const isLoggedIn = user && user.jwtToken;
     const isApiUrl = request.url.startsWith(environment.urlApi);
     if (isLoggedIn && isApiUrl) {
         request = request.clone({
             setHeaders: { Authorization: `Bearer ${user.jwtToken}` }
         });
     }

     return next.handle(request);
  }
}
