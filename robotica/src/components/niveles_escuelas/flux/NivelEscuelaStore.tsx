import NivelEscuelaDispatcher from './NivelEscuelaDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

let escuelas: Interfaces.Escuela[] = [];
let nivelesPorEscuela: string[] = [];
let arrayInsertNiveles: string[] = [];
let arrayDeleteNiveles: string[] = [];
let _idEscuela: number;

class NivelEscuelaStore extends EventEmitter {

  constructor() {
    super();
    NivelEscuelaDispatcher.register(this.dispatcherCallback.bind(this));
  }

  fillEscuelas(data: Interfaces.Escuela[]) {
    escuelas = [];
    escuelas = data;
  }

  fillNivelesPorEscuela(array: string[]) {
    nivelesPorEscuela = array;
  }

  getEscuelas(): Interfaces.Escuela[] {
    return escuelas;
  }

  getNivelesPorEscuela(): string[] {
    return nivelesPorEscuela;
  }

  pushNivel (nivel: string, _estado: boolean) {
    if (_estado === true) {arrayInsertNiveles.push(nivel);
    } else {arrayDeleteNiveles.push(nivel); }
  }

  removeNivel (nivel: string, _estado: boolean) {
    if (_estado === true) {
      let i = arrayInsertNiveles.indexOf(nivel);
      arrayInsertNiveles.splice(i, 1);
    } else {
      let i = arrayDeleteNiveles.indexOf(nivel);
      arrayDeleteNiveles.splice(i, 1);
    }
  }
  setIdEscuela (idEscuela: number) {
    _idEscuela = idEscuela;
  }

  actualizarEscuela() {
    if (arrayInsertNiveles.length > 0) {
      this.submitNivelesEscuela();
    }
    if (arrayDeleteNiveles.length > 0) {
      this.deleteNivelesEscuela();
    } else if (arrayInsertNiveles.length === 0 && arrayDeleteNiveles.length === 0) {
      alert('No hay datos para enviar');
    }
  }

  submitNivelesEscuela() {
    HTTP.post( CONST.BACKEND + 'niveles-escuela/escuela/' + _idEscuela, arrayInsertNiveles).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA AGREGADO EXITOSAMENTE');
          arrayInsertNiveles = [];
          window.location.href = '/';
        } else {
          alert('conflicto de datos al registrar el nivel escuela, \nVerifique los campos');
        }
    }).catch((error: any) => {
      console.warn(error);
      alert('error al registrar miembro, \nVerifique los campos');
    });

  }

  deleteNivelesEscuela() {
    HTTP.del( CONST.BACKEND + 'niveles-escuela/' + _idEscuela, arrayDeleteNiveles).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA ELIMINADO EXITOSAMENTE');
          arrayDeleteNiveles = [];
          window.location.href = '/nivel-escuela/registrar';
        } else {
          alert('conflicto de datos al eliminar los niveles escolares, \nVerifique los campos');
        }
    }).catch((error) => {
      console.warn(error);
      alert('error al registrar miembro, \nVerifique los campos');
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
      case 'FILL_ESCUELAS':
        this.fillEscuelas(action.value);
        break;
      case 'FILL_NIVELES_POR_ESCUELA':
        this.fillNivelesPorEscuela(action.value);
        break;
      case 'REGISTRAR_NIVELESESCUELA':
          this.actualizarEscuela();
          break;
      case 'PUSH_NIVEL':
          this.pushNivel(action.value, action.estado);
          break;
      case 'REMOVE_NIVEL':
          this.removeNivel(action.value, action.estado);
          break;
      case 'SET_ID_ESCUELA':
          this.setIdEscuela(action.value);
          break;
       default:
        break;
    }
    this.emit('STORE_' + action.actionType);
  }
}

export default new NivelEscuelaStore();
