import AsignacionHorarioDispatcher from './AsignacionHorarioDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

class AsignacionHorarioActions {
// -- Envío de Datos a la API ---
// Método que vacía los atributos recibidos en la STORE
// a un objeto y hace la llamada a la API
  registrarAsignacionHorario() {
    AsignacionHorarioDispatcher.dispatch({
      actionType: 'REGISTRAR_ASIGNACION_HORARIO'
  });
  }

  // Método para eliminar un elemento
  eliminarElementoAH(id: number) {
    AsignacionHorarioDispatcher.dispatch({
      actionType: 'ELIMINAR_ELEMENTO_AH',
      value: id
  });
  }

  eliminarElementosAH() {
    AsignacionHorarioDispatcher.dispatch({
      actionType: 'ELIMINAR_ELEMENTOS_AH'
  });
  }
  pushAH(id: number) {
    AsignacionHorarioDispatcher.dispatch({
      actionType: 'PUSH_AH',
      value: id
    });
  }

  removeAH(id: number) {
    AsignacionHorarioDispatcher.dispatch({
      actionType: 'REMOVE_AH',
      value: id
    });
  }

// Método Setter ejecutado en la Store

  setHorarioId(idHorario: number) {
    AsignacionHorarioDispatcher.dispatch({
    actionType: 'SET_HORARIO_ID',
    value: idHorario
  });
  }
  // -- Fin del Envío de datos --

  // -- Recepcion de Datos de la API --
  ListarAsignacionesHorario() {
    let data: Interfaces.AsignacionHorarioVista[] = [];

    HTTP.get(CONST.BACKEND + 'asignaciones').then(
      (response: Interfaces.AsignacionHorarioVista[]) => {
        for (var i = 0; i < response.length; i++) {
        data[i] = (response[i]);
        }
        return data;
      }
    ).then((response: Interfaces.AsignacionHorarioVista[]) => {

      AsignacionHorarioDispatcher.dispatch({
        actionType: 'LISTAR_ASIGNACIONES_HORARIO',
        value: response
      });
    }).catch((error) => {
      alert('Error al consultar los datos\n' + 'Servidor fuera de linea');
    });
}

consultarAsignacionesHorarioPorSocio(numero: number|undefined) {

  let data: Interfaces.AsignacionHorarioVista[] = [];

  HTTP.get(CONST.BACKEND + 'asignaciones/socio/' + numero).then(
    (response: Interfaces.AsignacionHorarioVista[]) => {
      for (var i = 0; i < response.length; i++) {
      data[i] = (response[i]);
      }
      return data;
    }
  ).then((response: Interfaces.AsignacionHorarioVista[]) => {

    AsignacionHorarioDispatcher.dispatch({
      actionType: 'LISTAR_ASIGNACIONES_HORARIO_POR_SOCIO',
      value: response
    });
  }).catch((error) => {
    alert('Error al consultar los datos\nServidor fuera de linea');
  });
}

buscarSocioPorNumero(numSocio: number) {
  let data: Interfaces.SocioVista;
  HTTP.get(CONST.BACKEND + 'socios/buscar_numero/' + numSocio).then(
    (response: Interfaces.SocioVista) => {
      return data = response;
    }
  ).then((response: Interfaces.SocioVista) => {

    AsignacionHorarioDispatcher.dispatch({
      actionType: 'SOCIO_ENCONTRADO',
      value: data
    });

    AsignacionHorarioDispatcher.dispatch({
    actionType: 'SET_SOCIO_ID',
    value: data.id
    });

  }).catch((error) => {
    alert('El socio no se encontró\nIntenta de nuevo');
    AsignacionHorarioDispatcher.dispatch({
    actionType: 'LIMPIAR_SOCIO_ENCONTRADO'
    });
  });

}

  consultarHorariosPorSocio(numSocio: number) {
    let data: Interfaces.SocioVista;
    HTTP.get(CONST.BACKEND + 'socios/buscar_numero/' + numSocio).then(
      (response: Interfaces.SocioVista) => {
        return data = response;
      }
    ).then((response: Interfaces.SocioVista) => {
    this.consultarAsignacionesHorarioPorSocio(data.numero);
    }).catch((error) => {
      alert('El socio no se encontró');
    });
  }

// -- Fin de Datos de la API --
}
export default new AsignacionHorarioActions();
