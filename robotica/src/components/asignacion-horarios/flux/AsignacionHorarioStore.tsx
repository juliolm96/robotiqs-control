import AsignacionHorarioDispatcher from './AsignacionHorarioDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from  '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

let asignacionHorarioVista: Interfaces.AsignacionHorarioVista[] = [];
let arrayEliminarAH: number[] = [];
let socioEncontrado: Interfaces.SocioVista = {
  apellido_materno: '',
  apellido_paterno: '',
  nombre_escuela: '',
  escuela_id: 0,
  fecha_ingreso: '',
  fecha_nacimiento: '',
  id: 0,
  nivel_educativo: '',
  nombre: '',
  numero: 0,
  saldo_clases: 0,
  telefono: 0,
  tutor: ''
};

let ah: Interfaces.AsignacionHorario = {
  socio_id: 0,
  horario_servicio_id: 0
};

class AsignacionHorarioStore extends EventEmitter {

  constructor() {
    super();
    AsignacionHorarioDispatcher.register(this.dispatcherCallback.bind(this));
  }

  setSocioId(idSocio: number) {
    ah.socio_id = idSocio;
  }

  setHorarioId(idHorario: number) {
     ah.horario_servicio_id = idHorario;
  }

  wakeUp() {
    //
  }

  ListarAsignacionesHorario(data: Interfaces.AsignacionHorarioVista[]) {
    asignacionHorarioVista = [];
    asignacionHorarioVista = data;
  }

  getListadoAsignacionesHorario(): Interfaces.AsignacionHorarioVista[] {
    return asignacionHorarioVista;
  }

  socioEncontrado(data: Interfaces.SocioVista) {
      socioEncontrado = data;
  }

  getSocioEncontrado(): Interfaces.SocioVista {
      return socioEncontrado;
  }

  ListarAsignacionesHorarioPorSocio(data: Interfaces.AsignacionHorarioVista[]) {
    asignacionHorarioVista = [];
    asignacionHorarioVista = data;
  }

  limpiarsocioEncontrado() {
    socioEncontrado = {
      apellido_materno: '',
      apellido_paterno: '',
      nombre_escuela: '',
      escuela_id: 0,
      fecha_ingreso: '',
      fecha_nacimiento: '',
      id: 0,
      nivel_educativo: '',
      nombre: '',
      numero: 0,
      saldo_clases: 0,
      telefono: 0,
      tutor: ''
    };
  }

  pushAH (id: number) {
    arrayEliminarAH.push(id);
  }

  removeAH (id: number) {
      let i = arrayEliminarAH.indexOf(id);
      arrayEliminarAH.splice(i, 1);
  }

  eliminarElementoAH (id: number) {
    let _id: number[] = [];
    _id.push(id);
    arrayEliminarAH.push(id);
    this.eliminarAsignacionHorario(_id);
  }

  eliminarElementosAH () {
    this.eliminarAsignacionHorario(arrayEliminarAH);
    arrayEliminarAH = [];
  }

  eliminarAsignacionHorario(ids: number[]) {
      HTTP.del(CONST.BACKEND + 'asignaciones', ids).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('SE HA ELIMINADO EXITOSAMENTE');
            window.location.href = '/asignacion-horario/busqueda';
          } else {
          alert('Existe un error en los datos proporcionados\n' +
            'Por favor, verifique la información');
        }
        }).catch((error) => {
          alert('error al eliminar el Horario de servicio');
      });
  }

submitAsignacionHorario() {
  HTTP.post(CONST.BACKEND + 'asignaciones', ah).then(
    function(response: any) {
      if (response.status > 199 && response.status < 300) {
        alert('EL REGISTRO SE HA AGREGADO EXITOSAMENTE');
        window.location.href = '/';
      } else {
        alert('Existe un error en los datos proporcionados\n' +
          'Por favor, verifique la información\nY verifique el saldo del socio seleccionado');
    }
    }).catch((error) => {
    alert('error al registrar el horario');
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
        this.submitAsignacionHorario();
        break;
      case 'SET_SOCIO_ID':
        this.setSocioId(action.value);
        break;
      case 'SET_HORARIO_ID':
        this.setHorarioId(action.value);
        break;
      case 'LISTAR_ASIGNACIONES_HORARIO_POR_SOCIO':
        this.ListarAsignacionesHorarioPorSocio(action.value);
        break;
      case 'LISTAR_ASIGNACIONES_HORARIO':
        this.ListarAsignacionesHorario(action.value);
        break;
      case 'SOCIO_ENCONTRADO':
        this.socioEncontrado(action.value);
        break;
      case 'LIMPIAR_SOCIO_ENCONTRADO':
        this.limpiarsocioEncontrado();
        break;
      case 'REGISTRAR_ASIGNACION_HORARIO':
        this.submitAsignacionHorario();
        break;
      case 'ELIMINAR_ELEMENTO_AH':
        this.eliminarElementoAH(action.value);
        break;
      case 'ELIMINAR_ELEMENTOS_AH':
        this.eliminarElementosAH();
        break;
      case 'PUSH_AH':
        this.pushAH(action.value);
        break;
      case 'REMOVE_NIVEL':
        this.removeAH(action.value);
        break;
      default:
        break;
    }
    this.emit('STORE_' + action.actionType);
  }

}

export default new AsignacionHorarioStore();
