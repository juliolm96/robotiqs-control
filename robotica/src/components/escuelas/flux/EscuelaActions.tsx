import EscuelaDispatcher from './EscuelaDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

class EscuelaActions {

// -- Envío de Datos a la API ---
// Método que vacía los atributos recibidos en la STORE
// a un objeto y hace la llamada a la API
  registrarEscuela() {
    EscuelaDispatcher.dispatch({
      actionType: 'REGISTRAR_ESCUELA'
  });
  }

// Método Setter ejecutado en la Store
setClave(clave: string) {
  EscuelaDispatcher.dispatch({
    actionType: 'SET_CLAVE',
    value: clave
  });
}

// Método Setter ejecutado en la Store
setNombre(nombre: string) {
  EscuelaDispatcher.dispatch({
    actionType: 'SET_NOMBRE',
    value: nombre
  });
}
// -- Fin del Envío de datos --

// -- Recepcion de Datos de la API --
ListarEscuelas() {
  let data: Interfaces.Escuela[] = [];

  HTTP.get(CONST.BACKEND + 'escuelas').then(
    (response: Interfaces.Escuela[]) => {
      for (var i = 0; i < response.length; i++) {
      data[i] = (response[i]);
      }
      return data;
    }
  ).then((response: Interfaces.Escuela[]) => {

    EscuelaDispatcher.dispatch({
      actionType: 'LISTAR_ESCUELAS',
      value: response
    });
  }).catch((error) => {
    alert('Error: ' + error);
  });
}
// -- Fin de Datos de la API --

// -- Inicio acciones para actualizar --
actualizarEscuela() {
    EscuelaDispatcher.dispatch({
      actionType: 'ACTUALIZAR_ESCUELA'
    });
}
// -- Fin acciones para actualizar --

// -- Inicio acciones para buscar una escuela --
  mostrarEscuela(id: number | undefined) {
  HTTP.get(CONST.BACKEND + 'escuelas/' + id).then(
    (response: Interfaces.Escuela) => {
      return response;
    }
  ).then((response) => {
    EscuelaDispatcher.dispatch({
      actionType: 'MOSTRAR_ESCUELA',
      value: response
    });
  }).catch((error) => {
    alert('Error: ' + error);
  });
}
// -- Fin acciones para buscar una escuela --
}
export default new EscuelaActions();
