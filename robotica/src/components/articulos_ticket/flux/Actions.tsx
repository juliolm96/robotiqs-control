import Dispatcher from './Dispatcher';
import * as HTTP from '../../../services/HTTP';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';

class Actions {

  loadDetallesTicket(ticketId: number) {

    HTTP.get(CONST.BACKEND + 'detalles_ticket/' + ticketId).then(
      (response: Interfaces.DetalleTicket[]) => {
        Dispatcher.dispatch({
          actionType: 'LOAD_DETALLES_TICKET',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR LOS ARTICULOS DEL TICKET ' + error);
      window.location.href = '/catalogo';
    });

  }

  loadInfoTicket(ticketId: number) {
    HTTP.get(CONST.BACKEND + 'tickets/' + ticketId).then(
      (response: Interfaces.Ticket[]) => {
        Dispatcher.dispatch({
          actionType: 'LOAD_INFO_TICKET',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR LA INFORMACIÓN DEL TICKET ' + error);
      window.location.href = '/catalogo';
    });
  }

  eliminarArticulo(idDetalleTicket: number) {
    HTTP.del(CONST.BACKEND + 'detalles_ticket/' + idDetalleTicket, {}).then(
      (response: any) => {
        if (response.status >= 200 && response.status < 300)
          alert('articulo eliminado correctamente');
      }
    ).catch(
      (error: any) => {
        alert('Error: ' + error);
      }
    );
  }

  cancelarTicket(ticketId: number) {
    HTTP.put(CONST.BACKEND + 'tickets/' + ticketId + '/cancelar', {}).then(
      (response: any) => {
        if (response.status === 200) {
          alert('El Ticket ha sido cancelado con éxito');
          localStorage.removeItem('ticketId');
          window.location.href = '/catalogo';
        } else {
          alert('Existe un problema al cancelar el ticket\nError: ' + response.status);
        }
      }
    ).catch(
      (error: any) => {
        alert('Ha ocurrido un errror: ' + error);
      }
    );
  }

  pagarTicket(metodoPago: string, ticketId: number) {
    HTTP.put(CONST.BACKEND + 'tickets/pagar', {forma_pago: metodoPago, id: ticketId}).then(
      (response: any) => {
        if (response.status === 200) {
          alert('Se actualizó la información del ticket\n\nPagado.');
          localStorage.removeItem('ticketId');
          window.location.href = '/catalogo';
        } else {
          alert('Sucedió un error en el pago del ticket\n\nError: ' + response.status);
        }
      }
    ).catch(
      (error: any) => {
        alert('Ha sucedido un error: ' + error);
      }
    );
  }

}

export default new Actions();
