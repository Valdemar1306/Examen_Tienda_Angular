import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import Swal from "sweetalert2";
import pageSettings from "../../config/page-settings";
import { Usuario } from "../../models/Usuario";
import { UsuarioService } from "../../services/usuario.service";
import pageMenus from '../../config/page-menus';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnDestroy  {
  usuario: any;
  pass: string;
  menus = pageMenus;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    pageSettings.pageWithFooter = false;
    pageSettings.pageWithoutSidebar = true;
    pageSettings.pageEmpty = true;

    let userStatus:any = localStorage.getItem("user");
    if (userStatus != "" && userStatus != null) {
      this.usuarioService.userSubject.next(JSON.parse(userStatus));
      this.router.navigateByUrl("/home");
    }
  }


  goToHome() {
    // const menu = localStorage.getItem('menu');
    // let menus = JSON.parse(menu);

    pageSettings.pageWithFooter = true;
    pageSettings.pageWithoutSidebar = false;
    pageSettings.pageEmpty = false;

    this.router.navigateByUrl("/home");
  }

  ngOnDestroy(): void {
    pageSettings.pageWithFooter = true;
    pageSettings.pageWithoutSidebar = false;
    pageSettings.pageEmpty = false;
  }



  login() {
    if (
      (this.usuario == "admin") &&
      this.pass == "demo"
    ) {
      this.usuarioService.setMenu(this.menus);
      localStorage.setItem('menu', JSON.stringify(this.menus));
      this.router.navigate(['/home']);

    }
  }
}
