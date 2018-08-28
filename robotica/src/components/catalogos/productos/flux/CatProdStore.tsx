import Dispatcher from './CatProdDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../../constantes/Interfaces';

let PRODUCTOS_LIST: Interfaces.Producto[] = [];

class CatProdStore extends EventEmitter {

  constructor() {
    super();

    Dispatcher.register(this.dispatcherCallback.bind(this));

  }

  getProductosList(): Interfaces.Producto[] {
    return PRODUCTOS_LIST;
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
      case 'LOAD_PRODUCTOS':
        PRODUCTOS_LIST = action.value;
        break;

      default:
        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new CatProdStore();
