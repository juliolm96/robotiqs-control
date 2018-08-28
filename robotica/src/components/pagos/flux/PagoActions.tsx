import PagoDispatcher from './PagoDispatcher';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';
import * as Interfaces from '../../../constantes/Interfaces';

class PagoActions {

  loadConceptos() {

    HTTP.get( CONST.BACKEND + 'conceptos_pago' ).then(
      (response: Interfaces.ConceptoPago) => {
        PagoDispatcher.dispatch({
            actionType: 'LOAD_CONCEPTOS',
            value: response
        });
      }
    ).catch(
      (error) => {
        console.warn(error);
        alert('ERROR AL CARGAR LOS CONCEPTOS DE PAGO');
      }
    );

  }

  loadMiembros() {
    let data: Interfaces.SocioVista[] = [];

    HTTP.get(CONST.BACKEND + 'socios').then(
           (response: Interfaces.SocioVista[]) => {
             response.forEach((miembroVista, index) => {
               data[index] = miembroVista;
             });
             return data;
           }
    // Se manda la lista de miembros hacia la Store para hacerlos accesibles.
  ).then((response: Interfaces.SocioVista[]) => {
          PagoDispatcher.dispatch({
            actionType: 'LOAD_MIEMBROS',
            value: response
          });
        }).catch((error) => {
          console.warn(error);
          alert('No se ha podido cargar uno o más recursos(SOCIOS)\n' +
          'Compruebe su conexión  al la red');
          window.location.href = '/';
        });
  }

  loadConceptoSeleccionado(id: number | undefined) {

    HTTP.get(CONST.BACKEND + 'conceptos_pago/' + id).then(
           (response: Interfaces.ConceptoPago) => {
             return response;
           }
        ).then((response: Interfaces.ConceptoPago) => {
          PagoDispatcher.dispatch({
            actionType: 'LOAD_CONCEPTO_SELECCIONADO',
            value: response
          });
        }).catch((error) => {
          console.warn(error);
          alert('No se ha podido cargar uno o más recursos(CONCEPTO_PAGO)\n' +
          'Compruebe su conexión  al la red');
          window.location.href = '/';
        });

  }

  loadPagos() {

    HTTP.get(CONST.BACKEND + 'pagos').then(
           (response: Interfaces.Pago[]) => {
             return response;
           }
        ).then((response: Interfaces.Pago[]) => {
          PagoDispatcher.dispatch({
            actionType: 'LOAD_PAGOS',
            value: response
          });
        }).catch((error) => {
          console.warn(error);
          alert('No se ha podido cargar uno o más recursos(PAGOS)\n' +
          'Compruebe su conexión  al la red');
          window.location.href = '/';
        });
  }

  loadPagoById(id: number | undefined) {

    HTTP.get(CONST.BACKEND + 'pagos/vista/' + id).then(
      (response: Interfaces.PagoVista) => {
        return response;
      }
    ).then((response: Interfaces.PagoVista) => {
      PagoDispatcher.dispatch({
        actionType: 'LOAD_PAGO_BY_ID',
        value: response
      });
    }).catch((error) => {
      console.warn(error);
      alert('No se ha podido cargar uno o más recursos(PAGOS)\n' +
      'Compruebe su conexión  al la red');
      window.location.href = '/';
    });

  }

  setConceptoId(id: number) {

    PagoDispatcher.dispatch({
      actionType: 'SET_CONCEPTO_ID',
      value: id
    });

  }

  setMiembroId(id: number | undefined) {

    PagoDispatcher.dispatch({
      actionType: 'SET_MIEMBRO_ID',
      value: id
    });

  }

  setCantidad(cantidad: number) {

    PagoDispatcher.dispatch({
      actionType: 'SET_CANTIDAD',
      value: cantidad
    });

  }

  setImporte(importe: number) {

    PagoDispatcher.dispatch({
      actionType: 'SET_IMPORTE',
      value: importe
    });

  }

  setPrecio(precio: number) {

    PagoDispatcher.dispatch({
      actionType: 'SET_PRECIO',
      value: precio
    });
  }

  update(objeto: Interfaces.ActualizacionPago) {
    PagoDispatcher.dispatch({
      actionType: 'UPDATE_PAGO',
      value: objeto
    });
  }

}

export default new PagoActions();
