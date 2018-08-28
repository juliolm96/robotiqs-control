import ConstruccionDispatcher from './ConstruccionDispatcher';
import * as HTTP from '../../../services/HTTP';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';

class ConstruccionActions {

  setMaterial(material: string) {
      ConstruccionDispatcher.dispatch({
        actionType: 'SET_MATERIAL',
        value: material
      });
  }

  setInstruccion(instruccion: string) {
      ConstruccionDispatcher.dispatch({
        actionType: 'SET_INSTRUCCION',
        value: instruccion
      });
  }

  setEnsamblado(ensamblado: string) {
      ConstruccionDispatcher.dispatch({
        actionType: 'SET_ENSAMBLADO',
        value: ensamblado
      });
  }

  setNumero(numero: number) {
    ConstruccionDispatcher.dispatch({
      actionType: 'SET_NUMERO',
      value: numero
    });
  }

  setModeloId(id: number) {
    ConstruccionDispatcher.dispatch({
      actionType: 'SET_MODELO_ID',
      value: id
    });
  }

  loadPaquetes() {
    HTTP.get( CONST.BACKEND + 'paquetes/vistas').then(
      (response: Interfaces.PaqueteVista[]) => {
        ConstruccionDispatcher.dispatch({
          actionType: 'LOAD_PAQUETES',
          value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR LOS PAQUETES\nCAUSA DE ERROR:\nServidor fuera de linea o en mantenimiento');
        window.location.href = '/';
      }
    );
  }

  loadTotalPasos(modeloId: number) {
    HTTP.get( CONST.BACKEND + 'construccion/' + modeloId + '/total-pasos').then(
      (response: number) => {
        ConstruccionDispatcher.dispatch({
          actionType: 'LOAD_TOTAL_PASOS',
          value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR EL TOTAL DE PASOS DEL MODELO');
        window.location.href = '/';
      }
    );
  }

  loadPrimerPaso(modeloId: number) {
    HTTP.get( CONST.BACKEND + 'construccion/' + modeloId + '/pasos/primero').then(
      (response: Interfaces.Construccion) => {
        ConstruccionDispatcher.dispatch({
          actionType: 'LOAD_PRIMER_PASO',
          value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR EL PRIMER PASO ');
        window.location.href = '/';
      }
    );
  }

  loadSiguiente(modeloId: number, pasoActual: number) {
    HTTP.get( CONST.BACKEND + 'construccion/' + modeloId + '/paso/' + pasoActual).
    then(
      (response: Interfaces.Construccion) => {
        ConstruccionDispatcher.dispatch({
          actionType: 'LOAD_SIGUIENTE_PASO',
          value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR EL PASO SOLICITADO');
        window.location.href = '/';
      }
    );
  }

  loadAnterior(modeloId: number, pasoActual: number) {
    HTTP.get( CONST.BACKEND + 'construccion/' + modeloId + '/paso/' + (pasoActual - 2)).
    then(
      (response: Interfaces.Construccion) => {
        ConstruccionDispatcher.dispatch({
          actionType: 'LOAD_PASO_ANTERIOR',
          value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR EL PASO SOLICITADO');
        window.location.href = '/';
      }
    );
  }

  loadPasoEspecifico(modeloId: number, paso: number) {
    HTTP.get( CONST.BACKEND + 'construccion/' + modeloId + '/paso/' + (paso - 1)).
    then(
      (response: Interfaces.Construccion) => {
        ConstruccionDispatcher.dispatch({
          actionType: 'LOAD_PASO_ESPECIFICO',
          value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR EL PASO SOLICITADO');
        window.location.href = '/';
      }
    );
  }

  submit() {
    ConstruccionDispatcher.dispatch({
      actionType: 'SUBMIT'
    });
  }

  loadModelos() {
    HTTP.get( CONST.BACKEND + 'modelos' ).then(
      (response: Interfaces.Paquete[]) => {
        ConstruccionDispatcher.dispatch({
            actionType: 'LOAD_MODELOS',
            value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR LOS MODELOS');
        window.location.href = '/';
      }
    );
  }

  loadModelosPorPaquete(paqueteId: number) {
    HTTP.get( CONST.BACKEND + 'modelos/vistas/buscar_por_paquete/' + paqueteId).then(
      (response: Interfaces.Paquete[]) => {
        ConstruccionDispatcher.dispatch({
            actionType: 'LOAD_MODELOS',
            value: response
        });
      }
    ).catch(
      (error) => {
        alert('ERROR AL CARGAR LOS MODELOS');
        window.location.href = '/';
      }
    );
  }

}

export default new ConstruccionActions();
