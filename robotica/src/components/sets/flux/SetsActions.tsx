import * as HTTP from '../../../services/HTTP';
import SetsDispatcher from './SetsDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';

class SetsActions {

  setNombre(nombre: string) {
    SetsDispatcher.dispatch({
      actionType: 'SET_NOMBRE',
      value: nombre
    });
  }

  setNumero(numero: string) {
    SetsDispatcher.dispatch({
      actionType: 'SET_NUMERO',
      value: numero
    });

  }

  setDescripcion(descripcion: string) {
    SetsDispatcher.dispatch({
      actionType: 'SET_DESCRIPCION',
      value: descripcion
    });
  }

  submitSet() {
    SetsDispatcher.dispatch({
      actionType: 'SUBMIT_SET'
    });
  }

  updateSet() {
    SetsDispatcher.dispatch({
      actionType: 'UPDATE_SET'
    });
  }

  loadSets() {
    let sets: Interfaces.Set[] = [];

    HTTP.get( CONST.BACKEND + 'sets').then(
      (response: Interfaces.Set[]) => {

        response.forEach((set, index) => {
          sets[index] = set;
        });
        return sets;

      }
    ).then( (response: Interfaces.Set[]) => {
      SetsDispatcher.dispatch({
        actionType: 'LOAD_SETS',
        value: response
      });
    }).catch((error: any) => {
      console.warn(error);
      alert('ERROR AL CARGAR LOS SETS');
    });
  }

  showSet(id: number | undefined) {

    let set: Interfaces.Set;

    HTTP.get( CONST.BACKEND + 'sets/' + id).then(
      (response: Interfaces.Set) => {
        set = {
         id: response.id,
         descripcion: response.descripcion,
         nombre: response.nombre,
         numero: response.numero
       };
        return set;
      }).then( (response: Interfaces.Set) => {
          SetsDispatcher.dispatch({
            actionType: 'SHOW_SET',
            value: response
          });
        }
      ).catch( (error) => {
        console.warn(error);
        alert('Error al cargar el SET');
      });

  }

}

export default new SetsActions();
