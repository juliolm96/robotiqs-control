import HorarioServicioDispatcher from './HorarioServicioDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from  '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

let horariosServicioVista: Interfaces.HorarioServicioVista[] = [];
let arrayEliminarHS: number[] = [];
let fillhs: Interfaces.HorarioServicioVista[] = [];

// ids: number[];

let HorarioServicio: Interfaces.HorarioServicio = {
  id: 0,
  hora_inicial: '',
  hora_final: '',
  dia: '',
  capacidad: 0
};

let hsEncontrado: Interfaces.HorarioServicioVista = {
  id: 0,
  hora_inicial: '',
  hora_final: '',
  dia: '',
  capacidad: 0,
  disponible: 0
};

class HorarioServicioStore extends EventEmitter {

  constructor() {
    super();
    HorarioServicioDispatcher.register(this.dispatcherCallback.bind(this));
  }

  setId(id: number) {
    HorarioServicio.id = id;
  }

  setHI(hi: string) {
    HorarioServicio.hora_inicial = hi;
  }

  setHF(hf: string) {
    HorarioServicio.hora_final = hf;
  }

  setDia(dia: string) {
    HorarioServicio.dia = dia;
  }

  setCapacidad(capacidad: number) {
    HorarioServicio.capacidad = capacidad;
  }

  wakeUp() {
    //
  }

  hsEncontrado(data: Interfaces.HorarioServicioVista) {
      hsEncontrado = data;
  }

  gethsEncontrado(): Interfaces.HorarioServicioVista {
      return hsEncontrado;
  }

  limpiarhsEncontrado() {
    hsEncontrado = {
    id: 0,
    hora_inicial: '',
    hora_final: '',
    dia: '',
    capacidad: 0,
    disponible: 0
  };
 }
  listarHS(data: Interfaces.HorarioServicioVista[]) {
    horariosServicioVista = [];
    horariosServicioVista = data;
  }
  fillHS (data: Interfaces.HorarioServicioVista[]) {
    fillhs = [];
    fillhs = data;
  }
  getfillHS(): Interfaces.HorarioServicioVista[] {
    return fillhs;
  }
  getListadoHS(): Interfaces.HorarioServicioVista[] {
    return horariosServicioVista;
  }

  pushHS (id: number) {
    arrayEliminarHS.push(id);
  }

  removeHS (id: number) {
      let i = arrayEliminarHS.indexOf(id);
      arrayEliminarHS.splice(i, 1);
    }

    eliminarElementoHS (id: number) {
      let _id: number[] = [];
      _id.push(id);
      arrayEliminarHS.push(id);
      this.eliminarHorarioServicio(_id);
    }

    eliminarElementosHS () {
      this.eliminarHorarioServicio(arrayEliminarHS);
      arrayEliminarHS = [];
    }

  submitHorarioServicio() {
    HTTP.post(CONST.BACKEND + 'horarios-servicio', HorarioServicio).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA AGREGADO EXITOSAMENTE');
          window.location.href = '/';
        } else {
        alert('Existe un error en los datos proporcionados\n\n' +
          'Verifique los datos e intente de nuevo');
      }
      }).catch((error) => {
        alert('error al registrar el horario de servicio');
    });
  }

 updateHorarioServicio() {
    HTTP.put(CONST.BACKEND + 'horarios-servicio', HorarioServicio).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
          window.location.href = '/';
        } else {
        alert('CONFLICTO, No se ha podido actualizar el horario de servicio\n' +
          'Por favor, verifique sus datos');
      }
      }).catch((error) => {
      alert('error al actualizar el horario');
    });
  }

eliminarHorarioServicio(ids: number[]) {
      HTTP.del(CONST.BACKEND + 'horarios-servicio', ids).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('SE HA ELIMINADO EXITOSAMENTE');
            window.location.href = '/horario-servicio/administrar';
          } else {
          alert('CONFLICTO\nEl Horario de Servicio ya está asignado a socios');
        }
        }).catch((error) => {
        alert('error al eliminar el Horario de Servicio');
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
      case 'REGISTRAR_HS':
        this.submitHorarioServicio();
        break;
      case 'SET_HI':
        this.setHI(action.value);
        break;
      case 'SET_HF':
        this.setHF(action.value);
        break;
      case 'SET_DIA':
        this.setDia(action.value);
        break;
      case 'SET_CAPACIDAD':
        this.setCapacidad(action.value);
        break;
      case 'SET_ID':
        this.setId(action.value);
        break;
      case 'LISTAR_HS':
        this.listarHS(action.value);
        break;
      case 'ELIMINAR_ELEMENTO_HS':
        this.eliminarElementoHS(action.value);
        break;
      case 'ELIMINAR_ELEMENTOS_HS':
        this.eliminarElementosHS();
        break;
      case 'PUSH_HS':
        this.pushHS(action.value);
        break;
      case 'REMOVE_NIVEL':
        this.removeHS(action.value);
        break;
      case 'FILL_HS':
        this.fillHS(action.value);
        break;
      case 'HS_ENCONTRADO':
        this.hsEncontrado(action.value);
        break;
      case 'LIMPIAR_HS_ENCONTRADO':
        this.limpiarhsEncontrado();
        break;
      case 'ACTUALIZAR_HS':
        this.updateHorarioServicio();
        break;
      default:
        break;
    }
    this.emit('STORE_' + action.actionType);
  }

}

export default new HorarioServicioStore();
