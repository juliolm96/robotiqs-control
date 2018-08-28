import * as HTTP from '../../../services/HTTP';
import ConceptoPagoDispatcher from './ConceptoPagoDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';

class ConceptoPagoActions {

    setClave(clave: string) {
      ConceptoPagoDispatcher.dispatch({
          actionType: 'SET_CLAVE',
          value: clave
      });
    }

    setConcepto(concepto: string) {
      ConceptoPagoDispatcher.dispatch({
        actionType: 'SET_CONCEPTO',
        value: concepto
      });
    }

    setNumero_clases(numeroClases: number) {
      ConceptoPagoDispatcher.dispatch({
        actionType: 'SET_NUMERO_CLASES',
        value: numeroClases
      });
    }

    setPrecio(precio: number) {
      ConceptoPagoDispatcher.dispatch({
        actionType: 'SET_PRECIO',
        value: precio
      });
    }

    setId(id: number) {
      ConceptoPagoDispatcher.dispatch({
        actionType: 'SET_ID',
        value: id
      });
    }

    submitConceptoPago() {
      ConceptoPagoDispatcher.dispatch({
        actionType: 'SUBMIT_CONCEPTO_PAGO'
      });
    }

    updateConceptoPago() {
      ConceptoPagoDispatcher.dispatch({
        actionType: 'UPDATE_CONCEPTO_PAGO'
      });
    }

    showConceptoPago(id: number | undefined) {
      HTTP.get(CONST.BACKEND + 'conceptos_pago/' + id).then(
        (response: Interfaces.ConceptoPago) => {
          ConceptoPagoDispatcher.dispatch({
            actionType: 'SHOW_CONCEPTO_PAGO',
            value: response
          });
        }
      ).catch((error) => {
        alert('Error al cargar el concepto de pago solicitado');
      });
    }

    loadConceptosPago() {
      // let conceptos_pago: Interfaces.ConceptoPago[];
      HTTP.get(CONST.BACKEND + 'conceptos_pago').then(
        (response: Interfaces.ConceptoPago[]) => {
          ConceptoPagoDispatcher.dispatch({
            actionType: 'LOAD_CONCEPTOS_PAGO',
            value: response
          });
        }
      ).catch((error) => {
        alert('error al cargar los conceptos de pago');
      });

    }
}

export default new ConceptoPagoActions();
