import NivelEscuelaDispatcher from './NivelEscuelaDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

let escuelas: Interfaces.Escuela[] = [];
let niveles: string[] = [];

class NivelEscuelaActions {

// -- Envío de Datos a la API --

  registrarNivelesEscuela() {
    NivelEscuelaDispatcher.dispatch({
      actionType: 'REGISTRAR_NIVELESESCUELA'
    });
  }

  fillEscuelas() {

    HTTP.get( CONST.BACKEND + 'escuelas').then(
      // a partir de el resultado recibido se se limpia la variable 'escuelas' y
      // mediante un ciclo se va llenando ese objeto, se retorna y se pasa a la
      // siguiente sentencia then...
           (response: Interfaces.Escuela[]) => {
             escuelas = [];
             response.forEach((escuela, index) => {
               escuelas[index] = {
                 nombre: escuela.nombre,
                 id: escuela.id
               };
             });
             return escuelas;
           }
      // a partir de lo retornado en el 'then' anterior se manda llamar al dis-
      // patcher de la store y se envían los datos para llenar una lista de es-
      // cuelas para ser accesibles desde cualquier punto.
    ).then((response: Interfaces.Escuela[]) => {
          NivelEscuelaDispatcher.dispatch({
            actionType: 'FILL_ESCUELAS',
            value: response
          });

      // si llega a fallar la petición en alguno de los 'then' se lanza este
      // 'método'.
        }).catch(() => {
          alert('No se ha podido cargar uno o más recursos(ESCUELAS)\n' +
            'Compruebe su conexión  al la red');
          window.location.href = 'http://localhost:3000/';
        });
  }

  recuperarNivEscuelas(id: number) {

    HTTP.get( CONST.BACKEND + 'niveles-escuela/' + id + '/consultar-niveles').then(
      // a partir de el resultado recibido se se limpia la variable 'escuelas' y
      // mediante un ciclo se va llenando ese objeto, se retorna y se pasa a la
      // siguiente...
           (response: string[]) => {
             niveles = [];
             response.forEach((nivel, index) => {
               niveles[index] = nivel;
             });
             return niveles;
           }
      // a partir de lo retornado en el 'then' anterior se manda llamar al dis-
      // patcher de la store y se envían los datos para llenar una lista de es-
      // cuelas para ser accesibles desde cualquier punto.
    ).then((response: string[]) => {
          NivelEscuelaDispatcher.dispatch({
            actionType: 'FILL_NIVELES_POR_ESCUELA',
            value: response
          });

      // si llega a fallar la petición en alguno de los 'then' se lanza este
      // 'método'.
        }).catch(() => {
          alert('No se ha podido cargar uno o más recursos(NIVELES_ESCUELAS)\n' +
            'Compruebe su conexión  al la red');
          window.location.href = 'http://localhost:3000/';
        });
  }

  pushNivel(nivel: string, _estado: boolean) {
    NivelEscuelaDispatcher.dispatch({
      actionType: 'PUSH_NIVEL',
      estado: _estado,
      value: nivel
    });
  }

  removeNivel(nivel: string, _estado: boolean) {
    NivelEscuelaDispatcher.dispatch({
      actionType: 'REMOVE_NIVEL',
      estado: _estado,
      value: nivel
    });
  }

  setIdEscuela(idEscuela: number) {
    NivelEscuelaDispatcher.dispatch({
      actionType: 'SET_ID_ESCUELA',
      value: idEscuela
    });
  }
}

export default new NivelEscuelaActions();
