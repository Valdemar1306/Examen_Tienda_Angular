import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { SystemAlertsService } from "../../../services/system/system.alerts.service";
import { AlertsTypesEnum } from "../../../models/common/alerts.types.enum";
import { Articulo } from "../../../models/Articulo";
import { ArticuloModalComponent } from "../components/Articulos-modal/Articulos-modal.component";
import { ArticuloService } from "../../../services/articulo.service";
import { environment } from "../../../../environments/environment";

const { urlApi } = environment;
const apiUrl = urlApi + 'Articulo';

@Component({
  selector: "app-Articulos",
  templateUrl: "./Articulos.component.html",
  styleUrls: ["./Articulos.component.scss"],
})
export class ArticulosComponent implements OnInit {
  displayedColumns: string[] = ["nombre", "codigo", "descripcion", "precio", "imagen", "stock", "tienda", "acciones"];
  dataSource= new MatTableDataSource<Articulo>([]);
  data: Articulo[] = [];
  constructor(
    private systemAlerts: SystemAlertsService,
    private articulosService: ArticuloService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getArticulos();
    
  }

  getArticulos() {
    this.articulosService.getArticulos().subscribe(
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

  addArticulo() {
    const dialogRef = this.dialog.open(ArticuloModalComponent, {
      width: "400px",
      data: null,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.refresh == true) {
          this.getArticulos();
        }
      }
    });
  }

  editArticulo(articulo: Articulo) {
    const dialogRef = this.dialog.open(ArticuloModalComponent, {
      width: "400px",
      data: articulo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.refresh == true) {
          this.getArticulos();
        }
      }
    });
  }

  deleteArticulo(id: number) {
    this.articulosService.deleteArticulo(id).subscribe(
      (resp) => {
        if (resp != null && resp.success) {
          this.getArticulos();
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

  getImagenUrl(url:string){
    console.log(`${apiUrl}/getImagen?fileName=${url}`);
    return `${apiUrl}/getImagen?fileName=${url}`;
  }

  

}
