import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { SystemAlertsService } from "../../../services/system/system.alerts.service";
import { AlertsTypesEnum } from "../../../models/common/alerts.types.enum";
import { TiendasModalComponent } from "../components/Tiendas-modal/Tiendas-modal.component";
import { TiendaService } from "../../../services/tiendas.service";
import { Tienda } from "../../../models/Tienda";

@Component({
  selector: "app-Tienda",
  templateUrl: "./Tiendas.component.html",
  styleUrls: ["./Tiendas.component.scss"],
})
export class TiendasComponent implements OnInit {
  displayedColumns: string[] = ["sucursal", "direccion","acciones"];
  dataSource= new MatTableDataSource<Tienda>([]);
  data: Tienda[] = [];
  constructor(
    private systemAlerts: SystemAlertsService,
    private tiendaService: TiendaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTiendas();
    
  }

  getTiendas() {
    this.tiendaService.getTiendas().subscribe(
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

  addTienda() {
    const dialogRef = this.dialog.open(TiendasModalComponent, {
      width: "400px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.refresh == true) {
          this.getTiendas();
        }
      }
    });
  }

  editTienda(tienda: Tienda) {
    const dialogRef = this.dialog.open(TiendasModalComponent, {
      width: "400px",
      data: tienda,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.refresh == true) {
          this.getTiendas();
        }
      }
    });
  }

  deleteTienda(id: number) {
    this.tiendaService.deleteTienda(id).subscribe(
      (resp) => {
        if (resp != null && resp.success) {
          this.getTiendas();
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
