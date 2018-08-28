import InicioSesionDispatcher from './InicioSesionDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
// import { CONST } from  '../../../constantes/CONST';
// import * as HTTP from '../../../services/HTTP';

let SESSION_OBJECT: Interfaces.SessionObject = {
  accessToken: '',
  role: '',
  status: 0,
  tokenType: ''
};

class InicioSesionStore extends EventEmitter {

  constructor() {
    super();
    InicioSesionDispatcher.register(this.dispatcherCallback.bind(this));
  }

  wakeUp() {
    //
  }

  getSessionObject(): Interfaces.SessionObject {
    return SESSION_OBJECT;
  }

  addChangeListener(eventName: string, callback: any) {
    this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
    this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action) {

    switch (action.actionType) {
      case 'SET_SESION_OBJECT':
        SESSION_OBJECT = action.value;
        break;
      default:
        break;
    }
    this.emit('STORE_' + action.actionType);
  }

}

export default new InicioSesionStore();
