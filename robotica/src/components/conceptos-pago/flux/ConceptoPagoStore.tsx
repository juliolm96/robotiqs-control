import ConceptoPagoDispatcher from './ConceptoPagoDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

let CONCEPTO_PAGO: Interfaces.ConceptoPago = {
  clave: '',
  concepto: '',
  id: 0,
  numero_clases: 0,
  precio: 0
};

let CONCEPTOS_PAGO: Interfaces.ConceptoPago[];
let CONCEPTO_PAGO_ACTUAL: Interfaces.ConceptoPago;

class ConceptoPagoStore extends EventEmitter {

  constructor() {
    super();

    ConceptoPagoDispatcher.register(this.dispatcherCallback.bind(this));
    this.submitConceptoPago = this.submitConceptoPago.bind(this);
    this.updateConceptoPago = this.updateConceptoPago.bind(this);
  }

  submitConceptoPago() {
    HTTP.post(CONST.BACKEND + 'conceptos_pago', CONCEPTO_PAGO).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
          window.location.href = 'http://localhost:3000/';
        }
        return response;
    }).catch((error) => {
      alert('error al registrar Concepto Pago, \nVerifique los campos');
    });
  }

  updateConceptoPago() {
    HTTP.put(CONST.BACKEND + 'conceptos_pago', CONCEPTO_PAGO).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
          window.location.href = 'http://localhost:3000/';
        }
        return response;
    }).catch((error) => {
      alert('error al registrar Concepto Pago, \nVerifique los campos');
    });
  }

  getConceptosPago(): Interfaces.ConceptoPago[] {
    return CONCEPTOS_PAGO;
  }

  getConceptoPagoActual(): Interfaces.ConceptoPago {
    return CONCEPTO_PAGO_ACTUAL;
  }

  wakeUp() {
    // Metodo para activar la tienda
  }

  addChangeListener(eventName: string, callback: any) {
    this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
    this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action) {
    switch (action.actionType) {
      case 'SET_CLAVE':
        CONCEPTO_PAGO.clave = action.value;
        break;
      case 'SET_CONCEPTO':
        CONCEPTO_PAGO.concepto = action.value;
        break;
      case 'SET_NUMERO_CLASES':
        CONCEPTO_PAGO.numero_clases = action.value;
        break;
      case 'SET_PRECIO':
        CONCEPTO_PAGO.precio = action.value;
        break;
      case 'SET_ID':
        CONCEPTO_PAGO.id = action.value;
        break;
      case 'SUBMIT_CONCEPTO_PAGO':
        this.submitConceptoPago();
        break;
      case 'LOAD_CONCEPTOS_PAGO':
        CONCEPTOS_PAGO = action.value;
        break;
      case 'UPDATE_CONCEPTO_PAGO':
        this.updateConceptoPago();
        break;
      case 'SHOW_CONCEPTO_PAGO':
        CONCEPTO_PAGO_ACTUAL = action.value;
        break;
      default:

        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new ConceptoPagoStore();
