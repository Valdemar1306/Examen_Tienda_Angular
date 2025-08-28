// components/articulos/articulos.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../services/articulo.service';
import { Articulo } from '../../models/Articulo';
import { SystemAlertsService } from '../../services/system/system.alerts.service';
import { AlertsTypesEnum } from '../../models/common/alerts.types.enum';
import { environment } from '../../../environments/environment';
import { CarritoItem } from '../../models/Carrito';
import { GeneralService } from '../../services/general.service';

const { urlApi } = environment;
const apiUrl = urlApi + 'Articulo';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  articulos: Articulo[] = [];
  carrito: CarritoItem[] = [];
  cantidades: { [idArticulo: number]: number } = {}; // control de cantidad por artículo
  

  constructor(private cartService: ArticuloService, private systemAlerts: SystemAlertsService, private generalService: GeneralService) {}

  ngOnInit(): void {
    this.getArticulos();
  }

  getArticulos() {
    this.cartService.getArticulos().subscribe(
      (resp) => {
        console.log(resp)
        if (resp != null && resp.success) {
          this.articulos = resp.generic;
          this.articulos.forEach(a => this.cantidades[a.idArticulo] = 1);
        } else {
          this.articulos = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  agregarAlCarrito(articulo: Articulo) {
    const cantidad = this.cantidades[articulo.idArticulo] || 1;
    const objArticulo = this.carrito.find(i => i.articulo.idArticulo === articulo.idArticulo);
    if (cantidad > 0 && cantidad <= articulo.stock) {      
      const index = this.carrito.findIndex(i => i.articulo.idArticulo === articulo.idArticulo);
      if (index >= 0) {
        if(objArticulo.cantidad + cantidad > articulo.stock){
          this.systemAlerts.showMessage("",`La cantidad de ${articulo.nombre} no puede ser mayor a ${articulo.stock}`,AlertsTypesEnum.info);
        }else{
           this.systemAlerts.showMessage("",`Agregaste ${cantidad} de ${articulo.nombre} al carrito`,AlertsTypesEnum.success);
          this.carrito[index].cantidad += cantidad;
        }
        
      } else {
        if(objArticulo && objArticulo.cantidad + cantidad > articulo.stock){
          this.systemAlerts.showMessage("",`La cantidad de ${articulo.nombre} no puede ser mayor a ${articulo.stock}`,AlertsTypesEnum.info);
          
        }else{
          this.carrito.push({ articulo, cantidad });
           this.systemAlerts.showMessage("",`Agregaste ${cantidad} de ${articulo.nombre} al carrito`,AlertsTypesEnum.success);
        }
        
        
      }     
    }
  }

  comprar() {
    if (this.carrito.length === 0) {
      this.systemAlerts.showMessage("","El carrito está vacío!",AlertsTypesEnum.info);
      return;
    }

    this.generalService.buyCarrito(this.carrito).subscribe(resp=>{
      if (resp != null && resp.success) {
        this.systemAlerts.showMessage("","Compra realizada con éxito!",AlertsTypesEnum.success);
        this.carrito = [];
        this.getArticulos();
      }else{
        this.systemAlerts.showMessageError("","Error!","Ocurrio un error al guardar");
      }
    },err=>{console.log(err)});
  }

  getImagenUrl(url:string){
    console.log(`${apiUrl}/getImagen?fileName=${url}`);
    return `${apiUrl}/getImagen?fileName=${url}`;
  }
}


