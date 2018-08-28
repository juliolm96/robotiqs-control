import Dispatcher from './CatServDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../../constantes/Interfaces';

let SERVICIOS_LIST: Interfaces.Servicio[] = [];

class CatServStore extends EventEmitter {

  constructor() {
    super();

    Dispatcher.register(this.dispatcherCallback.bind(this));

  }

  getServiciosList(): Interfaces.Servicio[] {
    return SERVICIOS_LIST;
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
      case 'LOAD_SERVICIOS':
        SERVICIOS_LIST = action.value;
        break;

      default:
        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new CatServStore();
