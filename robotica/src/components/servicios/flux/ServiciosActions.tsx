import ServiciosDispatcher from './ServiciosDispatcher';
import * as HTTP from '../../../services/HTTP';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';

class ServiciosActions {

  setConcepto(concepto: string) {
    ServiciosDispatcher.dispatch({
      actionType: 'SET_CONCEPTO',
      value: concepto
    });
  }

  setPrecio(precio: number) {
    ServiciosDispatcher.dispatch({
      actionType: 'SET_PRECIO',
      value: precio
    });
  }

  setDias(dias: number) {
    ServiciosDispatcher.dispatch({
      actionType: 'SET_DIAS',
      value: dias
    });
  }

  setTipo(tipo: string) {
    ServiciosDispatcher.dispatch({
      actionType: 'SET_TIPO',
      value: tipo
    });
  }

  setPaquete(nombrePaquete: string) {
    ServiciosDispatcher.dispatch({
      actionType: 'SET_PAQUETE',
      value: nombrePaquete
    });
  }

  loadPaquetes() {
    HTTP.get(CONST.BACKEND + 'paquetes').then(
      (response: Interfaces.Paquete[]) => {
        ServiciosDispatcher.dispatch({
          actionType: 'LOAD_PAQUETES',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR LOS PAQUETES');
      window.location.href = '/';
    });
  }

  loadServicios() {
    HTTP.get(CONST.BACKEND + 'servicios').then(
      (response: Interfaces.Servicio[]) => {
        ServiciosDispatcher.dispatch({
          actionType: 'LOAD_SERVICIOS',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR LOS SERVICIOS');
    });
  }

  loadServicioById(id: number) {
    HTTP.get(CONST.BACKEND + 'servicios/' + id).then(
      (response: Interfaces.Servicio) => {
        ServiciosDispatcher.dispatch({
          actionType: 'LOAD_SERVICIO_BY_ID',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR EL SERVICIO SELECCIONADO');
    });
  }

  submit() {
    ServiciosDispatcher.dispatch({
      actionType: 'SUBMIT'
    });
  }

  update() {
    ServiciosDispatcher.dispatch({
      actionType: 'UPDATE'
    });
  }

}

export default new ServiciosActions();
