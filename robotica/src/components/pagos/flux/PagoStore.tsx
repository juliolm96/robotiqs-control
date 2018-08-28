import PagoDispatcher from './PagoDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

let CONCEPTOS: Interfaces.ConceptoPago[] = [];
let MIEMBROS: Interfaces.SocioVista[] = [];
let PAGOS: Interfaces.Pago[] = [];
let PAGO_SELECCIONADO: Interfaces.PagoVista = {
  cantidad: 0,
  conceptoPagoId: 0,
  fecha: '',
  id: 0,
  importe: 0,
  miembroId: 0,
  numero: 0,
  precio: 0,
  concepto_letra: '',
  numero_miembro: 0
};
let CONCEPTO_SELECCIONADO: Interfaces.ConceptoPago = {
  clave: '',
  concepto: '',
  id: 0,
  numero_clases: 0,
  precio: 0
};

let PAGO:  Interfaces.Pago = {
  conceptoPagoId: 0,
  miembroId: 0,
  cantidad: 0,
  fecha: '',
  id: 0,
  importe: 0,
  numero: 0,
  precio: 0
};

class PagoStore extends EventEmitter {

    constructor() {
      super();

      PagoDispatcher.register(this.dispatcherCallback.bind(this));
    }

    getConceptos(): Interfaces.ConceptoPago[] {
      return CONCEPTOS;
    }

    getConceptoId(_concepto: string): number {

      for (var i = 0; i < CONCEPTOS.length; i++) {
        if (_concepto === CONCEPTOS[i].concepto) {
          return CONCEPTOS[i].id;
        }
      }
      return 0;

    }

    getMiembros(): Interfaces.SocioVista[] {
      return MIEMBROS;
    }

    getConceptoSeleccionado(): Interfaces.ConceptoPago {
      return CONCEPTO_SELECCIONADO;
    }

    getPagos(): Interfaces.Pago[] {
      return PAGOS;
    }

    getPagoSeleccionado(): Interfaces.PagoVista {
      return PAGO_SELECCIONADO;
    }

    submit() {

      let result: any = confirm('TOTAL A PAGAR: ' + (PAGO.precio * PAGO.cantidad));
      if (result === true) {
        HTTP.post(CONST.BACKEND + 'pagos', PAGO).then(
          function(response: any) {
            if (response.status > 199 && response.status < 300) {
              alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
              window.location.href = '/';
            } else {
              alert('SUCEDIO UN ERROR AL REGISTRAR LOS DATOS');
              return response;
            }
        }).catch((error) => {
          console.warn(error);
          alert('error al registrar PAGO, \nVerifique los campos');
        });
      } else {
        alert('El pago ha sido cancelado');
      }

    }

    update(objeto: Interfaces.ActualizacionPago) {
      HTTP.put(CONST.BACKEND + 'pagos', objeto).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
            window.location.href = 'http://localhost:3000/';
          } else {
            alert('SUCEDIO UN ERROR AL REGISTRAR LOS DATOS');
            return response;
          }
      }).catch((error) => {
        console.warn(error);
        alert('error al actualizar PAGO');
      });
    }

    addChangeListener(eventName: string, callback: any) {
        this.on(eventName, callback);
    }

    removeChangeListener(eventName: string, callback: any) {
        this.removeListener(eventName, callback);
    }

    dispatcherCallback(action: Interfaces.Action) {

        switch (action.actionType) {
          case 'LOAD_CONCEPTOS':
            CONCEPTOS = action.value;
            break;
          case 'SET_CONCEPTO_ID':
            PAGO.conceptoPagoId = action.value;
            break;
          case 'LOAD_MIEMBROS':
            MIEMBROS = action.value;
            break;
          case 'SET_MIEMBRO_ID':
            PAGO.miembroId = action.value;
            break;
          case 'SET_CANTIDAD':
            PAGO.cantidad = action.value;
            break;
          case 'SET_PRECIO':
            PAGO.precio = action.value;
            break;
          case 'SET_IMPORTE':
            PAGO.importe = action.value;
            break;
          case 'LOAD_CONCEPTO_SELECCIONADO':
            CONCEPTO_SELECCIONADO = action.value;
            break;
          case 'LOAD_PAGOS':
            PAGOS = action.value;
            break;
          case 'LOAD_PAGO_BY_ID':
            PAGO_SELECCIONADO = action.value;
            break;
          case 'UPDATE_PAGO':
            this.update(action.value);
            break;
          default:

            break;

        }
        this.emit('STORE_' + action.actionType);
    }

}

export default new PagoStore();
