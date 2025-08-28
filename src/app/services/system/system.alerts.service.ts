import { Injectable } from '@angular/core';
import swal2 from 'sweetalert2';
import { AlertsTypesEnum } from '../../models/common/alerts.types.enum';


@Injectable({
  providedIn: 'root'
})
export class SystemAlertsService {

  constructor() { }

  /**
	 * Muestra una alerta simple
	 * @param {string} title
   * @param {string} message
   * @param {AlertsTypesEnum} [type=AlertsTypesEnum.success] type es opcional, default = AlertsTypesEnum.success
	 * @returns swal2
	 */
  showMessage(title: string, message: string, type: AlertsTypesEnum = AlertsTypesEnum.success) {
    return swal2.fire({ title: title, text: message, icon: type, heightAuto: false });
    // return (<any>swal2({ title: title, html: message, type: type, heightAuto: false }));
  }
/**
 * 
	 * Muestra una alerta simple
	 * @param {string} title
   * @param {string} message
   * @param {AlertsTypesEnum} [type=AlertsTypesEnum.success] type es opcional, default = AlertsTypesEnum.success
	 * @returns swal2
	 */
showMessageHtml(title: string, message: string, htmlText: string, type: AlertsTypesEnum = AlertsTypesEnum.success) {
  return swal2.fire({ title: title, text: message, html: htmlText, icon: type, heightAuto: false });
  // return (<any>swal2({ title: title, html: message, type: type, heightAuto: false }));
}
    /**
	 * Muestra una alerta simple
	 * @param {string} title title es opcional, default = 'Error!'
   * @param {string} message message es opcional, default = 'Ocurrió un error al consultar los datos.'
	 * @returns swal2
	 */
  showMessageError(error: any = null, title: string = 'Error!', message: string = 'Ocurrió un error al consultar los datos.') {
    if (error != null) { console.log(error); }
    return swal2.fire({ title: title, text: message, icon: AlertsTypesEnum.error, heightAuto: false });
    // return (<any>swal2({ title: title, html: message, type: AlertsTypesEnum.error, heightAuto: false }));
  }

    /**
	 * Muestra una alerta de confirmacion configurable
	 * @param {string} title
   * @param {string} message
   * @param {AlertsTypesEnum} type
   * @param {string} [confirmButtonText]
   * @param {string} [confirmButtonColor='#3085d6'] confirmButtonColor es opcional, default = '#3085d6'
   * @param {boolean} [showCancelButton=false] showCancelButton es opcional, default = false
   * @param {string} [cancelButtonText='Cancelar'] cancelButtonText es opcional, default = 'Cancelar'
   * @param {boolean} [reverseButtons=false] reverseButtons es opcional, default = false
	 * @returns swal2
	 */
  showMessageConfirm(title: string, message: string, type: AlertsTypesEnum, confirmButtonText: string, confirmButtonColor: string = '#5294eb', showCancelButton: boolean = false, cancelButtonText: string = 'Cancelar', reverseButtons: boolean = false){
    return swal2.fire({ title: title, text: message, icon: type,
      confirmButtonText: confirmButtonText,
      showCancelButton: showCancelButton, cancelButtonText: cancelButtonText,
      reverseButtons: reverseButtons, confirmButtonColor: confirmButtonColor, heightAuto: false,
  });
    /*  return <any>swal2({ title: title, html: message, type: type,
                        confirmButtonText: confirmButtonText,
                        showCancelButton: showCancelButton, cancelButtonText: cancelButtonText,
                        reverseButtons: reverseButtons, confirmButtonColor: confirmButtonColor, heightAuto: false,
                    }); */
  }

  /**
	 * Indica si hay una alerta abierta
	 * @returns indicador booleano
	 */
  isVisible() {
    return swal2.isVisible();
  }

  /**
	 * Retorna el enum cancelar
	 * @returns swal.DismissReason.cancel
	 */
  dismissReasonCancel() {
    return swal2.DismissReason.cancel;
  }
}
