import ModelosDispatcher from './ModelosDispatcher';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';
import * as Interfaces from '../../../constantes/Interfaces';

class ModelosActions {

  loadPaquetes() {
    HTTP.get( CONST.BACKEND + 'paquetes' ).then(
      (response: Interfaces.Paquete[]) => {
        ModelosDispatcher.dispatch({
            actionType: 'LOAD_PAQUETES',
            value: response
        });
      }
    ).catch(
      (error: any) => {
        console.warn(error);
        alert('ERROR AL CARGAR LOS PAQUETES');
        window.location.href = '/';
      }
    );
  }

  loadModelos() {
    HTTP.get( CONST.BACKEND + 'modelos/vistas' ).then(
      (response: Interfaces.ModeloVista[]) => {
        ModelosDispatcher.dispatch({
            actionType: 'LOAD_MODELOS',
            value: response
        });
      }
    ).catch(
      (error) => {
        console.warn(error);
        alert('ERROR AL CARGAR LOS MODELOS');
        window.location.href = '/';
      }
    );
  }

  loadModeloById(id: number) {
    HTTP.get( CONST.BACKEND + 'modelos/vistas/' + id ).then(
      (response: Interfaces.ModeloVista) => {
        ModelosDispatcher.dispatch({
            actionType: 'LOAD_MODELO_BY_ID',
            value: response
        });
      }
    ).catch(
      (error) => {
        console.warn(error);
        alert('ERROR AL CARGAR EL MODELO SELECCIONADO');
        window.location.href = '/';
      }
    );
  }

  setNombre(nombre: string) {
    ModelosDispatcher.dispatch({
      actionType: 'SET_NOMBRE',
      value: nombre
    });
  }

  setDescripcion(descripcion: string) {
    ModelosDispatcher.dispatch({
      actionType: 'SET_DESCRIPCION',
      value: descripcion
    });
  }

  setPaqueteId(id: number) {
    ModelosDispatcher.dispatch({
      actionType: 'SET_PAQUETE_ID',
      value: id
    });
  }

  setId(id: number) {
    ModelosDispatcher.dispatch({
      actionType: 'SET_ID',
      value: id
    });
  }

  setImagen(imagen: string) {
    ModelosDispatcher.dispatch({
      actionType: 'SET_IMAGEN',
      value: imagen
    });
  }

}

export default new ModelosActions();
