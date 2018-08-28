import Dispatcher from './RCDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
// import * as HTTP from '../../../services/HTTP';
// import { CONST } from '../../../constantes/CONST';

let SOCIOS_LIST: Interfaces.Socio[] = [];
let PAQUETES_LIST: Interfaces.PaqueteVista[] = [];
let MODELOS_LIST: Interfaces.ModeloVista[] = [];
let MODELOS_CLASE_LIST: Interfaces.Modelo_Clase[] = [];
let CLASES_LIST: Interfaces.Clase[] = [];
let ACTIVIDADES_LIST: Interfaces.ActividadVista [] = [];

class RCStore extends EventEmitter {

  constructor() {
    super();

    Dispatcher.register(this.dispatcherCallback.bind(this));
  }

  wakeUp() {
    //
  }

  getSociosList(): Interfaces.Socio[] {
    return SOCIOS_LIST;
  }

  getNombreSocio(id: number): string {
    for (var i = 0; i < SOCIOS_LIST.length; i++) {
      if (SOCIOS_LIST[i].id === id) {
        return SOCIOS_LIST[i].nombre + ' ' + SOCIOS_LIST[i].apellido_paterno + ' ' + SOCIOS_LIST[i].apellido_materno;
      }
    }

    return '';
  }

  getClases(): Interfaces.Clase[] {
    return CLASES_LIST;
  }

  getClaseIdByFecha(fecha: string): number {

    for (var i = 0; i < CLASES_LIST.length; i++) {
      if (CLASES_LIST[i].fecha === fecha) {
        return CLASES_LIST[i].id;
      }
    }

    return 0;
  }

  getFechaClaseById(claseId: number): string {

    for (var i = 0; i < CLASES_LIST.length; i++) {
      if (CLASES_LIST[i].id === claseId) {
        return CLASES_LIST[i].fecha + '';
      }
    }

    return '';

  }

  getNumeroSocio(id: number): string {

    for (var i = 0; i < SOCIOS_LIST.length; i++) {
      if (SOCIOS_LIST[i].id === id) {
        return SOCIOS_LIST[i].numero + '';
      }
    }

    return '';
  }

  getPaquetes(): Interfaces.Paquete[] {
    return PAQUETES_LIST;
  }

  getPaqueteId(nombrePaquete: string): number {

    for (var i = 0; i < PAQUETES_LIST.length; i++) {
      if (PAQUETES_LIST[i].nombre === nombrePaquete) {
        return PAQUETES_LIST[i].id;
      }
    }

    return 0;
  }

  getAlcance(): any {
    //
  }

  getModelos(): Interfaces.ModeloVista[] {
    return MODELOS_LIST;
  }

  getModelosClase(): Interfaces.Modelo_Clase[] {
    return MODELOS_CLASE_LIST;
  }

  getModeloId(nombreModelo: string): number {
    for (var i = 0; i < MODELOS_LIST.length; i++) {
      if (MODELOS_LIST[i].nombre === nombreModelo) {
        return MODELOS_LIST[i].id;
      }
    }

    return 0;
  }

  getActividades(): Interfaces.ActividadVista[] {
    return ACTIVIDADES_LIST;
  }

  addChangeListener(eventName: string, callback: any) {
      this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
      this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action) {

    switch (action.actionType) {
      case 'GET_SOCIOS':
        SOCIOS_LIST = action.value;
        break;
      case 'GET_PAQUETES':
        PAQUETES_LIST = action.value;
        break;
      case 'GET_MODELOS_POR_PAQUETE':
        MODELOS_LIST = action.value;
        break;
      case 'GET_MODELOS_POR_SOCIO':
        MODELOS_CLASE_LIST = action.value;
        break;
      case 'GET_ACTIVIDADES_POR_SOCIO_ID':
        ACTIVIDADES_LIST = action.value;
        break;
      case 'GET_CLASE_POR_FECHA_Y_SOCIO_ID':
        CLASES_LIST = action.value;
        break;
      default:
        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new RCStore();
