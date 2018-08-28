import PaquetesDispatcher from './PaquetesDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import { EventEmitter } from 'events';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

let SETS: Interfaces.Set[] = [];
let SET_SELECCIONADO: Interfaces.Set = {
  id: 0,
  descripcion: '',
  nombre: '',
  numero: ''
};

let PAQUETE: Interfaces.Paquete = {
  descripcion: '',
  id: 0,
  nombre: '',
  setId: 0
};

let PAQUETES_VISTA: Interfaces.PaqueteVista[] = [];

let PAQUETE_VISTA: Interfaces.PaqueteVista = {
  descripcion: '',
  id: 0,
  nombre: '',
  nombre_set: '',
  setId: 0
};

class PaquetesStore extends EventEmitter {

  constructor() {
    super();

    PaquetesDispatcher.register(this.dispatcherCallback.bind(this));

  }

  getSets(): Interfaces.Set[] {
    return SETS;
  }

  getSetId(setNombre: string): number {
    for (let i = 0; i < SETS.length; i++) {
      if (SETS[i].nombre === setNombre) {
        return SETS[i].id;
      }
    }
    return 0;
  }

  getSetSeleccionado(): Interfaces.Set {
    return SET_SELECCIONADO;
  }

  getPaquetes(): Interfaces.PaqueteVista[] {
    return PAQUETES_VISTA;
  }

  getPaqueteSeleccionado(): Interfaces.PaqueteVista {
    return PAQUETE_VISTA;
  }

  wakeUp() {
    //
  }

  submit() {

    if (PAQUETE.setId !== 0) {
      HTTP.post(CONST.BACKEND + 'paquetes', PAQUETE).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
            window.location.href = 'http://localhost:3000/';
          } else {
            alert('SUCEDIÓ UN ERROR AL REGISTRAR LOS DATOS');
            return response;
          }
      }).catch((error) => {
        console.warn(error);
        alert('error al registrar PAQUETE, \nVerifique los campos');
      });
    } else {
      alert('Error en el SET seleccionado, verifique los datos');
    }

  }

  update() {

    if (PAQUETE.setId !== 0) {
      HTTP.put(CONST.BACKEND + 'paquetes', PAQUETE).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
            window.location.href = 'http://localhost:3000/';
          } else {
            alert('SUCEDIÓ UN ERROR AL ACTUALIZAR');
            return response;
          }
      }).catch((error) => {
        console.warn(error);
        alert('error al actualizar PAQUETE, \nVerifique los campos');
      });
    } else {
      alert('Error en el SET seleccionado, verifique los datos');
    }
  }

  addChangeListener(eventName: string, callback: any) {
    this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
    this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action ) {

    switch (action.actionType) {

      case 'LOAD_SETS':
        SETS = action.value;
        break;
      case 'LOAD_SET_SELECCIONADO':
        SET_SELECCIONADO = action.value;
        break;
      case 'LOAD_PAQUETES':
        PAQUETES_VISTA = action.value;
        break;
      case 'SET_SET_ID':
        PAQUETE.setId = action.value;
        break;
      case 'SET_NOMBRE':
        PAQUETE.nombre = action.value;
        break;
      case 'SET_DESCRIPCION':
        PAQUETE.descripcion = action.value;
        break;
      case 'LOAD_PAQUETE_VISTA_BY_ID':
        PAQUETE_VISTA = action.value;
        break;
      case 'SET_ID':
        PAQUETE.id = action.value;
        break;
      default:
        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new PaquetesStore();
