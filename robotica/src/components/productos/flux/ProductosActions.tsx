import ProductosDispatcher from './ProductosDispatcher';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';
import * as Interfaces from '../../../constantes/Interfaces';

class ProductosActions {

  setConcepto(concepto: string) {
    ProductosDispatcher.dispatch({
      actionType: 'SET_CONCEPTO',
      value: concepto
    });
  }

  setPrecio(precio: number) {
    ProductosDispatcher.dispatch({
      actionType: 'SET_PRECIO',
      value: precio
    });
  }

  setExistencias(existencias: number) {
    ProductosDispatcher.dispatch({
      actionType: 'SET_EXISTENCIAS',
      value: existencias
    });
  }

  setImagen(imagen: string) {
    ProductosDispatcher.dispatch({
      actionType: 'SET_IMAGEN',
      value: imagen
    });
  }

  submit() {
    ProductosDispatcher.dispatch({
      actionType: 'SUBMIT'
    });
  }

  update() {
    ProductosDispatcher.dispatch({
      actionType: 'UPDATE'
    });
  }

  loadProductos() {
    HTTP.get(CONST.BACKEND + 'productos').then(
      (response: Interfaces.Producto[]) => {
        ProductosDispatcher.dispatch({
            actionType: 'LOAD_PRODUCTOS',
            value: response
        });
      }
    ).catch(
      (error) => {
        console.warn(error);
        alert('ERROR AL CARGAR LOS PRODUCTOS');
        window.location.href = '/';
      }
    );
  }

  loadProductoById(id: number) {
    HTTP.get(CONST.BACKEND + 'productos/' + id).then(
      (response: Interfaces.Producto) => {
        ProductosDispatcher.dispatch({
            actionType: 'LOAD_PRODUCTO_BY_ID',
            value: response
        });
      }
    ).catch(
      (error) => {
        console.warn(error);
        alert('ERROR AL CARGAR EL PRODUCTO SELECCIONADO');
        window.location.href = '/';
      }
    );
  }

}

export default new ProductosActions();
