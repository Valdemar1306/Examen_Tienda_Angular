import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from '../../../../models/Cliente';
import { GeneralService } from '../../../../services/general.service';
import { SystemAlertsService } from '../../../../services/system/system.alerts.service';
import { AlertsTypesEnum } from '../../../../models/common/alerts.types.enum';
// import { ClientesService } from '../../services/clientes.service';


@Component({
  selector: 'app-Clientes-modal',
  templateUrl: './Clientes-modal.component.html',
  styleUrls: ['./Clientes-modal.component.scss']
})
export class ClientesModalComponent {
  form: FormGroup;

  constructor(
    private systemAlerts: SystemAlertsService,
    private fb: FormBuilder,
    private clientesService: GeneralService,
    public dialogRef: MatDialogRef<ClientesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente | null
  ) {
    console.log(data);
    this.form = this.fb.group({
      id: [data?.idCliente],
      nombre: [data?.nombre || '', Validators.required],
      apellidos: [data?.apellidos || '', Validators.required],
      direccion: [data?.direccion || '', Validators.required]
    });
  }

  onSave() {
    if (this.form.valid) {
      const objCliente=this.generarObjCliente();
      if (this.data) {
        this.clientesService.updateCliente(objCliente).subscribe(resp=>{
      if (resp != null && resp.success) {
        this.systemAlerts.showMessage("","Modificado correctamente!",AlertsTypesEnum.success);
        this.close();
      }else{
        this.systemAlerts.showMessageError("","Error!","Ocurrio un error al modificar");
      }
    },err=>{console.log(err)});
      } else {
          this.clientesService.addCliente(objCliente).subscribe(resp=>{
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

  generarObjCliente(){
    const objCliente: Cliente = {
      idCliente: this.form.get("id")?.value??0,
      nombre: this.form.get("nombre")?.value??"",
      apellidos: this.form.get("apellidos")?.value??"",
      direccion: this.form.get("direccion")?.value??""
    };
    return objCliente;
  }

  close(){
    this.dialogRef.close({refresh:true});
  }
}

