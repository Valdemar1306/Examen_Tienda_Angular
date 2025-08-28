import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ClientesComponent } from './modules/Catalogos/Clientes/Clientes.component';
import { ArticulosComponent } from './modules/Catalogos/Articulos/Articulos.component';
import { TiendasComponent } from './modules/Catalogos/Tiendas/Tiendas.component';
import { CarritoComponent } from './modules/Carrito/Carrito.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
   { path: 'login', data: {title: 'Login' }, component: LoginComponent },

   { path: 'home', data: {title: 'Home' }, component: CarritoComponent },

   { path: 'catalogo/clientes', data: {title: 'Clientes' }, component: ClientesComponent },

   { path: 'catalogo/articulos', data: {title: 'Articulos' }, component: ArticulosComponent },

   { path: 'catalogo/tiendas', data: {title: 'Tiendas' }, component: TiendasComponent },

];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})


export class AppRoutingModule { }
