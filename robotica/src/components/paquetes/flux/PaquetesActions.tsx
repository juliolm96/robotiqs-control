import PaquetesDispatcher from './PaquetesDispatcher';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';
import * as Interfaces from '../../../constantes/Interfaces';

class PaquetesActions {

  setDescripcion(descripcion: string) {
    PaquetesDispatcher.dispatch({
      actionType: 'SET_DESCRIPCION',
      value: descripcion
    });
  }

  setNombre(nombre: string) {
    PaquetesDispatcher.dispatch({
      actionType: 'SET_NOMBRE',
      value: nombre
    });
  }

  setSetId(id: number) {
    PaquetesDispatcher.dispatch({
      actionType: 'SET_SET_ID',
      value: id
    });
  }

  setId(id: number) {
    PaquetesDispatcher.dispatch({
      actionType: 'SET_ID',
      value: id
    });
  }

  loadSets() {
    HTTP.get(CONST.BACKEND + 'sets').then(
      (response: Interfaces.Set[]) => {
        PaquetesDispatcher.dispatch({
          actionType: 'LOAD_SETS',
          value: response
        });
      }
    ).catch((error) => {
      console.warn(error);
      alert('ERROR AL CARGAR LOS SETS');
    });
  }

  loadSetSeleccionado(id: number) {
    HTTP.get(CONST.BACKEND + 'sets/' + id).then(
      (response: Interfaces.Set) => {
        PaquetesDispatcher.dispatch({
          actionType: 'LOAD_SET_SELECCIONADO',
          value: response
        });
      }
    ).catch((error) => {
      console.warn(error);
      alert('ERROR AL CARGAR EL SET SELECCIONADO');
    });
  }

  loadPaquetes() {
    HTTP.get(CONST.BACKEND + 'paquetes').then(
      (response: Interfaces.Paquete[]) => {
        PaquetesDispatcher.dispatch({
          actionType: 'LOAD_PAQUETES',
          value: response
        });
      }
    ).catch((error) => {
      console.warn(error);
      alert('ERROR AL CARGAR LOS PAQUETES');
    });
  }

  loadPaqueteVistaById(id: number | undefined) {
    HTTP.get(CONST.BACKEND + 'paquetes/vistas/' + id).then(
      (response: Interfaces.PaqueteVista) => {
        PaquetesDispatcher.dispatch({
          actionType: 'LOAD_PAQUETE_VISTA_BY_ID',
          value: response
        });
      }
    ).catch((error) => {
      console.warn(error);
      alert('ERROR AL CARGAR EL PAQUETE SELECCIONADO');
    });
  }

}

export default new PaquetesActions();
