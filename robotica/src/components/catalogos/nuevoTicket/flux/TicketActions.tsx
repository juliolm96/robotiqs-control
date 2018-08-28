import Dispatcher from './TicketDispatcher';
import * as HTTP from '../../../../services/HTTP';
import * as Interfaces from '../../../../constantes/Interfaces';
import { CONST } from '../../../../constantes/CONST';

class TicketActions {

  loadSocios() {
    HTTP.get(CONST.BACKEND + 'socios').then(
      (response: Interfaces.Socio[]) => {
        Dispatcher.dispatch({
          actionType: 'LOAD_SOCIOS',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR LOS SOCIOS');
    });
  }

  loadSocioByNumber(numero: number) {
    HTTP.get(CONST.BACKEND + 'socios/buscar_numero/' + numero).then(
      (response: Interfaces.Socio) => {
        Dispatcher.dispatch({
          actionType: 'LOAD_SOCIO_BY_NUMBER',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CARGAR EL SOCIO SELECCIONADO');
    });
  }

  createNewTicket(socioId: number) {
    HTTP.getWithObject(CONST.BACKEND + 'tickets', {socioId: socioId}).then(
      (response) => {
        Dispatcher.dispatch({
          actionType: 'CREATE_NEW_TICKET',
          value: response
        });
      }
    ).catch((error) => {
      alert('ERROR AL CREAR NUEVO TICKET: error ' + error);
    });
  }

}

export default new TicketActions;
