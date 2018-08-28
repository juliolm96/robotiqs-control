import { EventEmitter } from 'events';
import ConstruccionDispatcher from './ConstruccionDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

let MODELOS: Interfaces.Modelo[] = [];

let PASO_CONSTRUCCION: Interfaces.Construccion = {
  ensamblado: '',
  instruccion: '',
  material: '',
  modeloId: 0,
  numero: 0
};

let PASO_ACTUAL: Interfaces.Construccion = {
  ensamblado: '',
  instruccion: '',
  material: '',
  modeloId: 0,
  numero: 0
};

let TOTAL_PASOS: number = 0;

let PAQUETES: Interfaces.PaqueteVista[] = [];

class ConstruccionStore extends EventEmitter {

  constructor() {
    super();
    ConstruccionDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getModelos(): Interfaces.Modelo[] {
    return MODELOS;
  }

  getModeloId(nombreModelo: string): number {
    for (var i = 0; i < MODELOS.length; i++) {
      if (MODELOS[i].nombre === nombreModelo) {
        return MODELOS[i].id;
      }
    }
    return 0;
  }

  getPasoActual(): Interfaces.Construccion {
    return PASO_ACTUAL;
  }

  getTotalPasos(): number {
    return TOTAL_PASOS;
  }

  getPaquetes(): Interfaces.PaqueteVista[] {
    return PAQUETES;
  }

  wakeUp() {
    //
  }

  submit() {
    if (PASO_CONSTRUCCION.modeloId !== 0) {
      HTTP.post(CONST.BACKEND + 'construccion', PASO_CONSTRUCCION).then(
        (response) => {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE AGREGÓ EXITOSAMENTE');
            window.location.href  = '/';
          } else {
            alert('SUCEDIÓ UN PROBLEMA \nAL REGISTRAR PASO DE CONSTRUCCION: (ERROR)' + response.status);
          }
        }
      ).catch((error) => {
        alert('ERROR AL INTENTAR REGISTRAR \nEL PASO DE CONSTRUCCION: (error) ' + error);
      });
    } else {
      alert('Ocurrió un error con el MODELO seleccionado');
    }
  }

  addChangeListener(eventName: string, callback: any) {
      this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
      this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action) {

    switch (action.actionType) {
      case 'LOAD_MODELOS':
        MODELOS = action.value;
        break;
      case 'SET_NUMERO':
        PASO_CONSTRUCCION.numero = action.value;
        break;
      case 'SET_MATERIAL':
        PASO_CONSTRUCCION.material = action.value;
        break;
      case 'SET_MODELO_ID':
        PASO_CONSTRUCCION.modeloId = action.value;
        break;
      case 'SET_ENSAMBLADO':
        PASO_CONSTRUCCION.ensamblado = action.value;
        break;
      case 'SET_INSTRUCCION':
        PASO_CONSTRUCCION.instruccion = action.value;
        break;
      case 'SUBMIT':
        this.submit();
        break;
      case 'LOAD_PRIMER_PASO':
        PASO_ACTUAL = action.value;
        break;
      case 'LOAD_SIGUIENTE_PASO':
        PASO_ACTUAL = action.value;
        break;
      case 'LOAD_TOTAL_PASOS':
        TOTAL_PASOS = action.value;
        break;
      case 'LOAD_PASO_ANTERIOR':
        PASO_ACTUAL = action.value;
        break;
      case 'LOAD_PASO_ESPECIFICO':
        PASO_ACTUAL = action.value;
        break;
      case 'LOAD_PAQUETES':
        PAQUETES = action.value;
        break;
      default:
        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new ConstruccionStore();
