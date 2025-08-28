import { DOCUMENT } from '@angular/common';
import { ElementRef, Injectable, Renderer2, RendererFactory2, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() {}

  show() {    
    let el =  document.getElementById("page-loader");
    el.classList.add("show");
  }

  hide() {    
    let el =  document.getElementById("page-loader");
    el.classList.remove("show");
  }
}
