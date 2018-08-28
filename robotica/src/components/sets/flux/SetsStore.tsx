import SetsDispatcher from './SetsDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

let SET: Interfaces.Set = {
  id: 0,
  descripcion: '',
  nombre: '',
  numero: ''
};

let setActual: Interfaces.Set;
let _sets: Interfaces.Set[] = [];

class SetsStore extends EventEmitter {

  constructor() {
    super();

    SetsDispatcher.register(this.dispatcherCallback.bind(this));
  }

  setNombre(nombre: string) {
    SET.nombre = nombre;
  }

  setNumero(numero: string) {
    SET.numero = numero;
  }

  setDescripcion(descripcion: string) {
    SET.descripcion = descripcion;
  }

  setSetActual(set: Interfaces.Set) {
    setActual = set;
  }

  loadSets(sets: Interfaces.Set[]) {
    _sets = [];
    _sets = sets;
  }

  getSets(): Interfaces.Set[] {
    return _sets;
  }

  getSetActual(): Interfaces.Set {
    return setActual;
  }

  submitSet() {

    // HTTP.post(url, objeto);
    HTTP.post(CONST.BACKEND + 'sets', SET).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
          window.location.href = 'http://localhost:3000/';
        }
        return response;
    }).catch((error) => {
      console.warn(error);
      alert('error al registrar SET, \nVerifique los campos');
    });

  }

  updateSet() {

    SET.id = setActual.id;

    HTTP.put(CONST.BACKEND + 'sets', SET).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
          window.location.href = 'http://localhost:3000/';
        }
        return response;
    }).catch((error) => {
      console.warn(error);
      alert('error al actualizar SET, \nVerifique los campos');
    });

  }

  wakeUp() {
    // Despierta la Store... porque duerme harto :c
  }

  addChangeListener(eventName: string, callback: any) {
    this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
    this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action) {

    switch (action.actionType) {
      case 'SET_NOMBRE':
        this.setNombre(action.value);
        break;
      case 'SET_NUMERO':
        this.setNumero(action.value);
        break;
      case 'SET_DESCRIPCION':
        this.setDescripcion(action.value);
        break;
      case 'SUBMIT_SET':
        this.submitSet();
        break;
      case 'LOAD_SETS':
        this.loadSets(action.value);
        break;
      case 'SHOW_SET':
        this.setSetActual(action.value);
        break;
      case 'UPDATE_SET':
        this.updateSet();
        break;
      default:

        break;
    }

    this.emit('STORE_' + action.actionType);
  }

}

export default new SetsStore();
