import ServiciosDispatcher from './ServiciosDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

let SERVICIO: Interfaces.Servicio = {
  articuloId: 0,
  codigo: '',
  concepto: '',
  dias: 0,
  id: 0,
  paqueteId: 0,
  precio: 0,
  tipo: ''
};

let SERVICIOS_LIST: Interfaces.Servicio[] = [];

let PAQUETES: Interfaces.Paquete[] = [];

class ServiciosStore extends EventEmitter {

  constructor() {
    super();

    ServiciosDispatcher.register(this.dispatcherCallback.bind(this));

  }

  wakeUp() {
    //
  }

  getPaqueteId(nombrePaquete: string): number {

    for (let i = 0; i < PAQUETES.length; i++ ) {
      if (PAQUETES[i].nombre === nombrePaquete) {
        return PAQUETES[i].id;
      }
    }

    return 0;
  }

  getPaquetes(): Interfaces.Paquete[] {
    return PAQUETES;
  }

  getServiciosList(): Interfaces.Servicio[] {
    return SERVICIOS_LIST;
  }

  getServicioSeleccionado(): Interfaces.Servicio {
    return SERVICIO;
  }

  submit() {
    
    if (SERVICIO.tipo === 'S' && SERVICIO.paqueteId === 0) {
      alert('' +
      'Existe un conflicto con el paquete seleccionado\n' +
      'Por favor, verifique los datos');
    } else {
      HTTP.post(CONST.BACKEND + 'servicios', SERVICIO).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
            window.location.href = '/';
          } else {
            alert('SUCEDIÓ UN ERROR AL REGISTRAR LOS DATOS \n\nError:' + response.status);
          }
        }
      ).catch(
        function(error: any) {
          alert('error al registrar SERVICIO, \nVerifique los campos ' + error);
        }
      );
    }

  }

  update() {

    if (SERVICIO.tipo === 'S' && SERVICIO.paqueteId === 0) {
      alert('' +
      'Existe un conflicto con el paquete seleccionado\n' +
      'Por favor, verifique los datos');
    } else {
      HTTP.put(CONST.BACKEND + 'servicios', SERVICIO).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
            window.location.href = '/';
          } else {
            alert('SUCEDIÓ UN ERROR AL REGISTRAR LOS DATOS \n\nError:' + response.status);
          }
        }
      ).catch(
        function(error: any) {
          alert('error al actualizar SERVICIO, \nVerifique los campos ' + error);
        }
      );
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
      case 'SET_CONCEPTO':
        SERVICIO.concepto = action.value;
        break;
      case 'SET_PRECIO':
        SERVICIO.precio = action.value;
        break;
      case 'SET_DIAS':
        SERVICIO.dias = action.value;
        break;
      case 'SET_TIPO':
        SERVICIO.tipo = action.value;
        break;
      case 'SET_PAQUETE':
        SERVICIO.paqueteId = this.getPaqueteId(action.value);
        break;
      case 'LOAD_PAQUETES':
        PAQUETES = action.value;
        break;
      case 'LOAD_SERVICIOS':
        SERVICIOS_LIST = action.value;
        break;
      case 'LOAD_SERVICIO_BY_ID':
        SERVICIO = action.value;
        break;
      case 'SUBMIT':
        this.submit();
        break;
      case 'UPDATE':
        this.update();
        break;
      default:

        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new ServiciosStore();
