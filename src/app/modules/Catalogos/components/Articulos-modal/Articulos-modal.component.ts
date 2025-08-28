import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Articulo } from '../../../../models/Articulo';
import { GeneralService } from '../../../../services/general.service';
import { SystemAlertsService } from '../../../../services/system/system.alerts.service';
import { AlertsTypesEnum } from '../../../../models/common/alerts.types.enum';
import { ArticuloService } from '../../../../services/articulo.service';
import { TiendaService } from '../../../../services/tiendas.service';
import { Tienda } from '../../../../models/Tienda';
// import { ClientesService } from '../../services/clientes.service';


@Component({
  selector: 'app-Articulos-modal',
  templateUrl: './Articulos-modal.component.html',
  styleUrls: ['./Articulos-modal.component.scss']
})
export class ArticuloModalComponent implements OnInit {
  form: FormGroup;
  selectedFile: File | null = null;

  lstTiendas: Tienda[];
  tiendas2: any[]=[];
  idTienda: number=0;
  urlImagen: string="";
  constructor(
    private systemAlerts: SystemAlertsService,
    private fb: FormBuilder,
    private articuloService: ArticuloService,
    public dialogRef: MatDialogRef<ArticuloModalComponent>,
    private tiendasService: TiendaService,
    
    @Inject(MAT_DIALOG_DATA) public data: Articulo | null
  ) {
    console.log(data);
    this.form = this.fb.group({
      id: [data?.idArticulo],
      codigo: [data?.codigo || '', Validators.required],
      nombre: [data?.nombre || '', Validators.required],
      descripcion: [data?.descripcion || ''],
      precio: [data?.precio || '', Validators.required], 
      stock: [data?.stock || '', Validators.required],
      idTienda: [data?.idTienda]
    });
this.urlImagen=data?.urlImagen??"";
    
  }
  ngOnInit(): void {
    this.getTiendas();
    
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      if (this.urlImagen!="") {
        this.urlImagen="";
      }
    }
  }

  onSave() {
    if (this.form.valid) {
      const objArticulo=this.generarObjArticulo();
      if (this.data) {
        this.articuloService.updateArticulo(this.data.idArticulo, objArticulo).subscribe(resp=>{
      if (resp != null && resp.success) {
        this.systemAlerts.showMessage("","Modificado correctamente!",AlertsTypesEnum.success);
        this.close();
      }else{
        this.systemAlerts.showMessageError("","Error!","Ocurrio un error al modificar");
      }
    },err=>{console.log(err)});
      } else {
          this.articuloService.addArticulo(objArticulo).subscribe(resp=>{
      if (resp != null && resp.success) {
        this.systemAlerts.showMessage("","Guardado correctamente!",AlertsTypesEnum.success);
        this.close();
      }else{
        this.systemAlerts.showMessageError("","Error!","Ocurrio un error al guardar");
      }
    },err=>{console.log(err)});
      }
      
    }
  }

  generarObjArticulo(){
    const articulo = this.form.value;
      const formData = new FormData();

      // Datos de texto
      formData.append('idArticulo', articulo.id??0);
      formData.append('nombre', articulo.nombre??"");
      formData.append('codigo', articulo.codigo??"");
      formData.append('descripcion', articulo.descripcion??"");
      formData.append('precio', articulo.precio??0);
      formData.append('stock', articulo.stock??0);
      formData.append('urlImagen', this.urlImagen??"");
      formData.append('idTienda', articulo.idTienda??0);

      // Imagen si se seleccionó
      if (this.selectedFile) {
        formData.append('imagen', this.selectedFile, this.selectedFile.name);
      }
      return formData;
  }

  close(){
    this.dialogRef.close({refresh:true});
  }
  
  getTiendas() {
    this.tiendasService.getTiendas().subscribe(
      (resp) => {
        console.log(resp)
        if (resp != null && resp.success) {
          this.lstTiendas = resp.generic;
          this.tiendas2 = this.lstTiendas.map(t=>({
            value:t.idTienda,
            label: t.sucursal
          }))    
          console.log(this.tiendas2);      
        } else {
          this.lstTiendas = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

