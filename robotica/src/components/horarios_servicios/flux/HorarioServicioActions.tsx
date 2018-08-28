import HorarioServicioDispatcher from './HorarioServicioDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

class HorarioServicioActions {

// -- Envío de Datos a la API ---
// Método que vacía los atributos recibidos en la STORE
// a un objeto y hace la llamada a la API
  registrarHorarioServicio() {
    HorarioServicioDispatcher.dispatch({
      actionType: 'REGISTRAR_HS'
  });
  }

  actualizarHorarioServicio() {
    HorarioServicioDispatcher.dispatch({
      actionType: 'ACTUALIZAR_HS'
  });
  }

// Método para eliminar un elemento
eliminarElementoHS(id: number) {
  HorarioServicioDispatcher.dispatch({
    actionType: 'ELIMINAR_ELEMENTO_HS',
    value: id
});
}

eliminarElementosHS() {
  HorarioServicioDispatcher.dispatch({
    actionType: 'ELIMINAR_ELEMENTOS_HS'
});
}
  pushHS(id: number) {
    HorarioServicioDispatcher.dispatch({
      actionType: 'PUSH_HS',
      value: id
    });
  }

  removeHS(id: number) {
    HorarioServicioDispatcher.dispatch({
      actionType: 'REMOVE_HS',
      value: id
    });
  }

// Método Setter ejecutado en la Store
setHI(hi: string) {
  HorarioServicioDispatcher.dispatch({
    actionType: 'SET_HI',
    value: hi + ':00'
  });
}

// Método Setter ejecutado en la Store
setHF(hf: string) {
  HorarioServicioDispatcher.dispatch({
    actionType: 'SET_HF',
    value: hf + ':00'
  });
}

// Método Setter ejecutado en la Store
setDia(dia: string) {
  HorarioServicioDispatcher.dispatch({
    actionType: 'SET_DIA',
    value: dia
  });
}

// Método Setter ejecutado en la Store
setCapacidad(capacidad: number) {
  HorarioServicioDispatcher.dispatch({
    actionType: 'SET_CAPACIDAD',
    value: capacidad
  });
}

setId(id: number) {
  HorarioServicioDispatcher.dispatch({
    actionType: 'SET_ID',
    value: id
  });
}

// -- Fin del Envío de datos --

// -- Recepcion de Datos de la API --
ListarHorariosServicio() {
  let data: Interfaces.HorarioServicioVista[] = [];

  HTTP.get(CONST.BACKEND + 'horarios-servicio').then(
    (response: Interfaces.HorarioServicioVista[]) => {
      for (var i = 0; i < response.length; i++) {
      data[i] = (response[i]);
      }
      return data;
    }
  ).then((response: Interfaces.HorarioServicioVista[]) => {
    HorarioServicioDispatcher.dispatch({
      actionType: 'LISTAR_HS',
      value: response
    });
  }).catch((error) => {
    alert('Error consulta');
    window.location.href = '/';
  });
}

filHS(dia: string) {

  let data: Interfaces.HorarioServicioVista[] = [];

  HTTP.get(CONST.BACKEND + 'horarios-servicio/consultar/dia/' + dia.substr(0, 2)).then(
    (response: Interfaces.HorarioServicioVista[]) => {
      for (var i = 0; i < response.length; i++) {
      data[i] = (response[i]);
      }
      return data;
    }
  ).then((response: Interfaces.HorarioServicioVista[]) => {
    HorarioServicioDispatcher.dispatch({
      actionType: 'FILL_HS',
      value: response
    });
  }).catch((error) => {
    alert('Ocurrió un error al consultar los datos\nServidor fuera de linea');
    window.location.href = '/';
  });
}

buscarHS(idHS: number) {
  let data: Interfaces.SocioVista;
  HTTP.get(CONST.BACKEND + 'horarios-servicio/' + idHS).then(
    (response: Interfaces.SocioVista) => {
      return data = response;
    }
  ).then((response: Interfaces.SocioVista) => {
    HorarioServicioDispatcher.dispatch({
      actionType: 'HS_ENCONTRADO',
      value: data
    });
  }).catch((error) => {
    alert('Hubo un error al procesar la solicitud\nReintente en unos segundos al marcar la casilla y editar\n' +
      'Actualice la página de persistir el problema');
    HorarioServicioDispatcher.dispatch({
      actionType: 'LIMPIAR_HS_ENCONTRADO'
    });
  });

}

limpiarHS() {
  HorarioServicioDispatcher.dispatch({
  actionType: 'LIMPIAR_HS_ENCONTRADO'
  });
}

// -- Fin de Datos de la API --
}
export default new HorarioServicioActions();
