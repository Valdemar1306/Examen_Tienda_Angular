import { Component, OnInit } from "@angular/core";
import { ClientesModalComponent } from "../components/Clientes-modal/Clientes-modal.component";
import { MatDialog } from "@angular/material/dialog";
import { Cliente } from "../../../models/Cliente";
import { MatTableDataSource } from "@angular/material/table";
import { GeneralService } from "../../../services/general.service";
import { SystemAlertsService } from "../../../services/system/system.alerts.service";
import { AlertsTypesEnum } from "../../../models/common/alerts.types.enum";

@Component({
  selector: "app-Clientes",
  templateUrl: "./Clientes.component.html",
  styleUrls: ["./Clientes.component.scss"],
})
export class ClientesComponent implements OnInit {
  displayedColumns: string[] = ["nombre", "apellidos", "direccion", "acciones"];
  dataSource= new MatTableDataSource<Cliente>([]);
  data: Cliente[] = [];
  constructor(
    private systemAlerts: SystemAlertsService,
    private clientesService: GeneralService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getClientes();
    
  }

  getClientes() {
    this.clientesService.getClientes().subscribe(
      (resp) => {
        console.log(resp)
        if (resp != null && resp.success) {
          this.data = resp.generic;
          this.dataSource.data = this.data;
        } else {
          this.dataSource.data = [];
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addCliente() {
    const dialogRef = this.dialog.open(ClientesModalComponent, {
      width: "400px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.refresh == true) {
          this.getClientes();
        }
      }
    });
  }

  editCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClientesModalComponent, {
      width: "400px",
      data: cliente,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.refresh == true) {
          this.getClientes();
        }
      }
    });
  }

  deleteCliente(id: number) {
    this.clientesService.deleteCliente(id).subscribe(
      (resp) => {
        if (resp != null && resp.success) {
          this.getClientes();
          this.systemAlerts.showMessage(
            "",
            "Eliminado correctamente!",
            AlertsTypesEnum.success
          );
        } else {
          this.systemAlerts.showMessageError(
            "",
            "Error!",
            "Ocurrio un error al eliminar"
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
