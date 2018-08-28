import Dispatcher from './CatProdDispatcher';
import * as Interfaces from '../../../../constantes/Interfaces';
import * as HTTP from '../../../../services/HTTP';
import { CONST } from '../../../../constantes/CONST';

class CatProdActions {

  loadProductos() {

    HTTP.get(CONST.BACKEND + 'productos').then(
      (response: Interfaces.Producto[]) => {
        Dispatcher.dispatch({
          actionType: 'LOAD_PRODUCTOS',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR LOS PRODUCTOS ' + error);
      window.location.href = '/';
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

export default new CatProdActions();
