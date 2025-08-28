// Core Module
import { Router, NavigationEnd, ActivatedRoute, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import * as global from './config/globals';

// Main Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { PanelComponent } from './components/panel/panel.component';
import { FloatSubMenuComponent } from './components/float-sub-menu/float-sub-menu.component';


// Component Module
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Select2Module } from 'ng-select2-component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { HomeComponent } from './modules/home/home.component';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { LoginComponent } from './modules/login/login.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { UsuarioService } from './services/usuario.service';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthGuard } from './helpers/auth.guard';


import localeES from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { ArticulosComponent } from './modules/Catalogos/Articulos/Articulos.component';
import { ClientesComponent } from './modules/Catalogos/Clientes/Clientes.component';
import { TiendasComponent } from './modules/Catalogos/Tiendas/Tiendas.component';
import { ClientesModalComponent } from './modules/Catalogos/components/Clientes-modal/Clientes-modal.component';
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from '@angular/material/dialog';

import { CdkOverlayOrigin } from "@angular/cdk/overlay";
import { ArticuloModalComponent } from './modules/Catalogos/components/Articulos-modal/Articulos-modal.component';
import { TiendasModalComponent } from './modules/Catalogos/components/Tiendas-modal/Tiendas-modal.component';
import { CarritoComponent } from './modules/Carrito/Carrito.component';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SidebarRightComponent,
    TopMenuComponent,
    FooterComponent,
    PanelComponent,
    FloatSubMenuComponent,
    HomeComponent,
    LoginComponent,
    ArticulosComponent,
    ClientesComponent,
    TiendasComponent,
    ClientesModalComponent,
    ArticuloModalComponent,
    TiendasModalComponent,
    CarritoComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    LoadingBarRouterModule,
    NgbModule,
    NgxChartsModule,
    NgxDatatableModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    HttpClientModule,
    Select2Module,
    MatTableModule,
    MatDialogModule,
    CdkOverlayOrigin,
 
],

  exports: [

  ],
  providers: [Title, {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
  constructor(private router: Router, private titleService: Title, private route: ActivatedRoute, private user: UsuarioService) {
    router.events.subscribe((e) => {
    });
  }
}
