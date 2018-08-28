import ModelosDispatcher from './ModelosDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

let PAQUETES: Interfaces.Paquete[] = [];

let MODELO: Interfaces.Modelo = {
  descripcion: '',
  id: 0,
  nombre: '',
  imagen: '',
  paquete_id: 0
};

let MODELOS: Interfaces.ModeloVista[] = [];
let MODELO_SELECCIONADO: Interfaces.ModeloVista  = {
  descripcion: '',
  id: 0,
  imagen: '',
  nombre: '',
  nombre_paquete: '',
  paqueteId: 0
};

class ModelosStore extends EventEmitter {

  constructor() {
    super();
    ModelosDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getPaquetes(): Interfaces.Paquete[] {
    return PAQUETES;
  }

  getPaqueteId(paquete: string): number {

    for (let i = 0; i < PAQUETES.length; i++) {
      if (PAQUETES[i].nombre === paquete) {
        return PAQUETES[i].id;
      }
    }

    return 0;
  }

  getModelos(): Interfaces.ModeloVista[] {
    return MODELOS;
  }

  getModeloSeleccionado(): Interfaces.ModeloVista {
    return MODELO_SELECCIONADO;
  }

  submit() {

    if (MODELO.paquete_id !== 0) {
      HTTP.post(CONST.BACKEND + 'modelos', MODELO).then(
        (response) => {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE AGREGÓ EXITOSAMENTE');
            window.location.href  = '/';
          } else {
            alert('SUCEDIÓ UN PROBLEMA AL REGISTRAR MODELO: (ERROR)' + response.status);
          }
        }
      ).catch((error) => {
        alert('ERROR AL INTENTAR REGISTRAR MODELO: (error) ' + error);
      });
    } else {
      alert('HUBO UN PROBLEMA CON EL PAQUETE SELCCIONADO, VERIFIQUE LOS DATOS');
    }
  }

  update() {
    if (MODELO.paquete_id !== 0) {
      HTTP.put(CONST.BACKEND + 'modelos', MODELO).then(
        (response) => {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE ACTUALIZÓ EXITOSAMENTE');
            window.location.href = '/';
          } else {
            alert('SUCEDIÓ UN PROBLEMA AL ACTUALIZAR MODELO: (ERROR)' + response.status);
          }
        }
      ).catch((error) => {
        alert('ERROR AL INTENTAR ACTUALIZAR MODELO: (error) ' + error);
      });
    } else {
      alert('HUBO UN PROBLEMA CON EL PAQUETE SELCCIONADO, VERIFIQUE LOS DATOS');
    }
  }

  wakeUp() {
    //
  }

  addChangeListener(eventName: string, callback: any) {
      this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
      this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action) {

      switch (action.actionType) {
        case 'LOAD_PAQUETES':
          PAQUETES = action.value;
          break;
        case 'LOAD_MODELOS':
          MODELOS = action.value;
          break;
        case 'LOAD_MODELO_BY_ID':
          MODELO_SELECCIONADO = action.value;
          break;
        case 'SET_NOMBRE':
          MODELO.nombre = action.value;
          break;
        case 'SET_IMAGEN':
          MODELO.imagen = action.value;
          break;
        case 'SET_ID':
          MODELO.id = action.value;
          break;
        case 'SET_PAQUETE_ID':
          MODELO.paquete_id = action.value;
          break;
        case 'SET_DESCRIPCION':
          MODELO.descripcion = action.value;
          break;
        default:
          break;
      }

      this.emit('STORE_' + action.actionType);
  }

}

export default new ModelosStore();
