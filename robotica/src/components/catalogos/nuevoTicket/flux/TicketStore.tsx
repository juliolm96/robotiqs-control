import { EventEmitter } from 'events';
import Dispatcher from './TicketDispatcher';
import * as Interfaces from '../../../../constantes/Interfaces';
// import * as HTTP from '../../../../services/HTTP';
// import { CONST } from '../../../../constantes/CONST';

let SOCIOS_LIST: Interfaces.Socio[] = [];

let SOCIO_SELECCIONADO: Interfaces.Socio = {
apellido_materno: '',
apellido_paterno: '',
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

let TICKET_ID: number = 0;

class TicketStore extends EventEmitter {

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

  getSocioSeleccionado(): Interfaces.Socio {
    return SOCIO_SELECCIONADO;
  }

  getTicketId(): number {
    return TICKET_ID;
  }

  addChangeListener(eventName: string, callback: any) {
    this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
    this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action ) {

    switch (action.actionType) {
      case 'LOAD_SOCIOS':
        SOCIOS_LIST = action.value;
        break;
      case 'LOAD_SOCIO_BY_NUMBER':
        SOCIO_SELECCIONADO = action.value;
        break;
      case 'CREATE_NEW_TICKET':
        TICKET_ID = action.value;
        break;
      default:
        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new TicketStore();
