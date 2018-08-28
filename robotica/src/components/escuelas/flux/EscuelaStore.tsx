import EscuelaDispatcher from './EscuelaDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from  '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

let escuelas: Interfaces.Escuela[] = [];
let escuelaSeleccionada: Interfaces.Escuela;

let ESCUELA: Interfaces.Escuela = {
  clave: '',
  nombre: '',
  id: 0
};

class EscuelaStore extends EventEmitter {

  constructor() {
    super();
    EscuelaDispatcher.register(this.dispatcherCallback.bind(this));
  }

  setClave(clave: string) {
    ESCUELA.clave = clave;
  }

  setNombre(nombre: string) {
    ESCUELA.nombre = nombre;
  }

  wakeUp() {
    //
  }

  submitEscuela() {

    HTTP.post(CONST.BACKEND + 'escuelas', ESCUELA).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA AGREGADO EXITOSAMENTE');
          window.location.href = '/';
        } else {
        alert('CONFLICTO');
      }
      }).catch((error) => {
      alert('error al registrar la escuela');
    });
  }

listarEscuelas(data: Interfaces.Escuela[]) {
  escuelas = [];
  escuelas = data;
}

getListadoEscuelas(): Interfaces.Escuela[] {
  return escuelas;
}

cargarEscuela(data: Interfaces.Escuela) {
  escuelaSeleccionada = data;
}

mostrarEscuela(): Interfaces.Escuela {
  return escuelaSeleccionada;
}

actualizarEscuela() {
  ESCUELA.id = escuelaSeleccionada.id;

  HTTP.put(CONST.BACKEND + 'escuelas', ESCUELA).then(
    function(response: any) {
      if (response.status > 199 && response.status < 300) {
        alert('Actulización correcta');
        window.location.href = '/';
    } else {
      alert('CONFLICTO');
    }
      return response;
  }).catch( (error) => {
    alert('Hecho! *');
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
      case 'REGISTRAR_ESCUELA':
        this.submitEscuela();
        break;
      case 'SET_CLAVE':
        this.setClave(action.value);
        break;
      case 'SET_NOMBRE':
        this.setNombre(action.value);
        break;
      case 'LISTAR_ESCUELAS':
        this.listarEscuelas(action.value);
        break;
      case 'MOSTRAR_ESCUELA':
        this.cargarEscuela(action.value);
        break;
      case 'ACTUALIZAR_ESCUELA':
        this.actualizarEscuela();
        break;
      default:
        break;
    }
    this.emit('STORE_' + action.actionType);
  }

}

export default new EscuelaStore();
