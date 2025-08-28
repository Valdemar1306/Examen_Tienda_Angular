import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemAlertsService } from '../../../../services/system/system.alerts.service';
import { AlertsTypesEnum } from '../../../../models/common/alerts.types.enum';
import { Tienda } from '../../../../models/Tienda';
import { TiendaService } from '../../../../services/tiendas.service';


@Component({
  selector: 'app-Tiendas-modal',
  templateUrl: './Tiendas-modal.component.html',
  styleUrls: ['./Tiendas-modal.component.scss']
})
export class TiendasModalComponent {
  form: FormGroup;

  constructor(
    private systemAlerts: SystemAlertsService,
    private fb: FormBuilder,
    private tiendasService: TiendaService,
    public dialogRef: MatDialogRef<TiendasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tienda | null
  ) {
    console.log(data);
    this.form = this.fb.group({
      id: [data?.idTienda],
      sucursal: [data?.sucursal || '', Validators.required],
      direccion: [data?.direccion || '']      
    });
  }

  onSave() {
    if (this.form.valid) {
      const objTienda=this.generarObjTienda();
      if (this.data) {
        this.tiendasService.updateTienda(objTienda).subscribe(resp=>{
      if (resp != null && resp.success) {
        this.systemAlerts.showMessage("","Modificado correctamente!",AlertsTypesEnum.success);
        this.close();
      }else{
        this.systemAlerts.showMessageError("","Error!","Ocurrio un error al modificar");
      }
    },err=>{console.log(err)});
      } else {
          this.tiendasService.addTienda(objTienda).subscribe(resp=>{
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

  generarObjTienda(){
    const objTienda: Tienda = {
      idTienda: this.form.get("id")?.value??0,
      sucursal: this.form.get("sucursal")?.value??"",      
      direccion: this.form.get("direccion")?.value??""
    };
    return objTienda;
  }

  close(){
    this.dialogRef.close({refresh:true});
  }
}

