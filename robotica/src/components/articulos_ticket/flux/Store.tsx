import Dispatcher from './Dispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';

let DETALLES_TICKET_LIST: Interfaces.DetalleTicket[] = [];

let INFO_TICKET: Interfaces.Ticket = {
  estado: '',
  fecha: '',
  folio: '',
  forma_pago: '',
  hora: '',
  id: 0,
  iva: 0,
  nombre_socio: '',
  socioId: 0,
  subtotal: 0,
  total: 0
};

class Store extends EventEmitter {

  constructor() {
    super();
    Dispatcher.register(this.dispatcherCallback.bind(this));
  }

  getDetallesTicketList(): Interfaces.DetalleTicket[] {
    return DETALLES_TICKET_LIST;
  }

  getInfoTicket(): Interfaces.Ticket {
    return INFO_TICKET;
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

  dispatcherCallback(action: Interfaces.Action ) {

    switch (action.actionType) {
      case 'LOAD_DETALLES_TICKET':
        DETALLES_TICKET_LIST = action.value;
        break;
      case 'LOAD_INFO_TICKET':
        INFO_TICKET = action.value;
        break;
      default:
        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new Store();
