import Dispatcher from './RCDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

class RCActions {

  buscarSocios(nombre: string) {
    HTTP.get(CONST.BACKEND + 'socios/buscar_nombre/' + nombre).then(
      (response: Interfaces.Socio) => {
        Dispatcher.dispatch({
          actionType: 'GET_SOCIOS',
          value: response
        }
        );
      }
    ).catch(
      (error: any) => {
        alert('No se han podido cargar el recurso solicitado (SOCIOS)');
      }
    );
  }

  getPaquetes() {
    HTTP.get(CONST.BACKEND + 'paquetes/vistas').then(
      (response: Interfaces.PaqueteVista[]) => {
        Dispatcher.dispatch({
          actionType: 'GET_PAQUETES',
          value: response
        }
        );
      }
    ).catch(
      (error: any) => {
        alert('No se ha podido cargar el recurso solicitado (PAQUETES) ' + error);
      }
    );
  }

  getModelosByPaqueteId(paqueteId: number) {
    HTTP.get(CONST.BACKEND + 'modelos/vistas/buscar_por_paquete/' + paqueteId).then(
      (response: Interfaces.ModeloVista[]) => {
        Dispatcher.dispatch({
          actionType: 'GET_MODELOS_POR_PAQUETE',
          value: response
        }
        );
      }
    ).catch(
      (error: any) => {
        alert('No se ha podido cargar el recurso solicitado (MODELOS):' + error);
      }
    );
  }

  getModelosBySocioId(socioId: number) {
    HTTP.get(CONST.BACKEND + 'modelos/vistas/realizados/' + socioId).then(
      (response: Interfaces.Modelo_Clase[]) => {
        Dispatcher.dispatch({
          actionType: 'GET_MODELOS_POR_SOCIO',
          value: response
        }
        );
      }
    ).catch(
      (error: any) => {
        alert('No se ha podido cargar el recurso solicitado (MODELOS):' + error);
      }
    );
  }

  getAlcanceByClaseId(n?: any) {
    //
  }

  getActividadesByClaseId(claseId: number) {
    HTTP.get(CONST.BACKEND + 'clases/alcance/' + claseId).then(
      (response: Interfaces.ActividadVista[]) => {
        Dispatcher.dispatch({
          actionType: 'GET_ACTIVIDADES_POR_CLASE_ID',
          value: response
        }
        );
      }
    ).catch(
      (error: any) => {
        alert('No se ha podido cargar el recurso solicitado [Actividades]:' + error);
      }
    );
  }

  loadClases(socioId: number) {

    HTTP.get(CONST.BACKEND + 'clases/ultima-semana/' + socioId).then(
      (response: Interfaces.Clase[]) => {
        Dispatcher.dispatch({
          actionType: 'GET_CLASE_POR_FECHA_Y_SOCIO_ID',
          value: response
        }
        );
      }
    ).catch(
      (error: any) => {
        alert('No se ha podido cargar el recurso solicitado [Clases]:' + error);
      }
    );

  }

  // objeto: Clase
  updateClase(clase: any) {
    if (clase.alcance !== '') {
      HTTP.put(CONST.BACKEND + 'clases', clase).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
            window.location.href = '/';
          } else {
            alert('SUCEDIÓ UN ERROR AL REGISTRAR LOS DATOS');
            return response;
          }
      }).catch((error) => {
        alert('error al actualizar el avance de las clases, \nVerifique los campos');
      });
    } else {
      alert('Ha sucedido un problema\nPor favor verifique los datos');
    }
  }

  submitActividad(actividad: Interfaces.Actividad) {

    if (actividad.alcance !== '') {
      HTTP.post(CONST.BACKEND + 'actividad', actividad).then(
        function(response: any) {
          if (response.status > 199 && response.status < 300) {
            alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
            window.location.href = '/';
          } else {
            alert('SUCEDIÓ UN ERROR AL REGISTRAR LOS DATOS');
            console.warn(response);
            return response;
          }
      }).catch((error) => {
        alert('error al registrar el avance de las clases, \nVerifique los campos');
      });
    } else {
      alert('Ha sucedido un problema\nPor favor verifique los datos');
    }

  }

  submitAsistencia(clase: Interfaces.Clase) {

    HTTP.post(CONST.BACKEND + 'clases', clase).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
          window.location.href = '/';
        } else if (response.status === 428) {
          alert('EL SOCIO NO CUENTA CON SALDO EN CLASES SUFICIENTE');
        } else {
          alert('SUCEDIÓ UN ERROR AL REGISTRAR LOS DATOS!');
          return response;
        }
    }).catch((error) => {
      alert('error al registrar la asistencia, \nVerifique los campos');
    });

  }

}

export default new RCActions();
