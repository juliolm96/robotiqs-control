import Dispatcher from './CatServDispatcher';
import { CONST } from '../../../../constantes/CONST';
import * as HTTP from '../../../../services/HTTP';
import * as Interfaces from '../../../../constantes/Interfaces';

class CatServActions {

  loadServicios() {
    HTTP.get(CONST.BACKEND + 'servicios').then(
      (response: Interfaces.Servicio[]) => {
        Dispatcher.dispatch({
          actionType: 'LOAD_SERVICIOS',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR LOS SERVICIOS ' + error);
      window.location.href = '/catalogo';
    });
  }

  addProductToTicket(detalleTicket: {ticketId: number,
    articuloId: number, cantidad: number }) {

    HTTP.post(CONST.BACKEND + 'detalles_ticket', detalleTicket).then(
      (response) => {
        if (response.status === 201) {
          alert('Producto agregado al ticket');
          window.location.reload();
        } else if (response.status === 200) {
          alert('producto actualizado en el ticket');
          window.location.reload();
        } else if (response.status > 399 && response.status < 500) {
          alert('Error al agregar producto al ticket. error: ' + response);
          window.location.reload();
        }
      }
    ).catch(
      (error) => {
        alert('Error: ' + error);
      }
    );

  }

}

export default new CatServActions();
