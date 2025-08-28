import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import pageSettings from '../../config/page-settings';
import { Usuario } from '../../models/Usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
	selector: 'header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {

	@Input() pageSidebarTwo;
	@Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
	@Output() toggleMobileSidebar = new EventEmitter<boolean>();
	@Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
	pageSettings = pageSettings;
	lstNot:any;
	user: Usuario;
	name:string;
	totalNot:number =0;

	mobileSidebarToggle() {
		this.toggleMobileSidebar.emit(true);
	}
	mobileRightSidebarToggle() {
		this.toggleMobileRightSidebar.emit(true);
	}
	toggleSidebarRight() {
		this.toggleSidebarRightCollapsed.emit(true);
	}

	mobileTopMenuToggle() {
		this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
	}

	mobileMegaMenuToggle() {
		this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
	}

	ngOnDestroy() {
		this.pageSettings.pageMobileTopMenuToggled = false;
		this.pageSettings.pageMobileMegaMenuToggled = false;
	}

	ngOnInit(){
	}

	constructor(private renderer: Renderer2, private usuarioService: UsuarioService, private router: Router) {
		this.usuarioService.user.subscribe((x) => {
			this.user = x;
			console.log(this.user)
			this.getValidName();

		});


	}

	salir() {
		localStorage.setItem('menu', null);
		this.usuarioService.logout();
		this.router.navigateByUrl('/login');
	}

	getValidName(){
		if(this.user?.nombre == undefined
		 && this.user?.apellidoPaterno == undefined
		 && this.user?.apellidoMaterno == undefined)
		 {
			this.name = "Usuario";
		 } else {
		   this.name = `${this.user.nombre}  ${this.user.apellidoPaterno} ${this.user.apellidoMaterno}`;
		 }
	 }


}
