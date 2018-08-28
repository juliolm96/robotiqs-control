import ProductosDispatcher from './ProductosDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import { EventEmitter } from 'events';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';

let PRODUCTO: Interfaces.Producto = {
  articuloId: 0,
  codigo: '',
  concepto: '',
  existencias: 0,
  id: 0,
  imagen: '',
  precio: 0
};

let PRODUCTOS_LIST: Interfaces.Producto[] = [];

class ProductosStore extends EventEmitter {

  constructor() {
    super();
    ProductosDispatcher.register(this.dispatcherCallback.bind(this));
  }

  getProductoSeleccionado(): Interfaces.Producto {
    return PRODUCTO;
  }

  getProductList(): Interfaces.Producto[] {
    return PRODUCTOS_LIST;
  }

  submit() {

    HTTP.post(CONST.BACKEND + 'productos', PRODUCTO).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA INSERTADO EXITOSAMENTE');
          window.location.href = '/';
        } else {
          alert('SUCEDIÓ UN ERROR AL REGISTRAR LOS DATOS error:' + response.status);
        }
      }
    ).catch(
      function(error: any) {
        alert('error al registrar PRODUCTO, \nVerifique los campos ' + error);
      }
    );

  }

  update() {

    HTTP.put(CONST.BACKEND + 'productos', PRODUCTO).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
          window.location.href = '/';
        } else {
          alert('SUCEDIÓ UN ERROR AL ACTUALIZAR LOS DATOS error:' + response.status);
        }
      }
    ).catch(
      function(error: any) {
        alert('error al actualizar PRODUCTO, \nVerifique los campos ' + error);
      }
    );
    
  }

  wakeUp() {
    //
  }

  addChangeListener(eventName: string, callback: any) {
      this.on(eventName, callback);
  }

  removeChangeListener(eventName: string, callback: any) {
      this.removeListener(eventName, callback);
  }

  dispatcherCallback(action: Interfaces.Action ) {

    switch (action.actionType) {
      case 'SET_CONCEPTO':
        PRODUCTO.concepto = action.value;
        break;
      case 'SET_PRECIO':
        PRODUCTO.precio = action.value;
        break;
      case 'SET_EXISTENCIAS':
        PRODUCTO.existencias = action.value;
        break;
      case 'SET_IMAGEN':
        PRODUCTO.imagen = action.value;
        break;
      case 'SUBMIT':
        this.submit();
        break;
      case 'LOAD_PRODUCTOS':
        PRODUCTOS_LIST = action.value;
        break;
      case 'LOAD_PRODUCTO_BY_ID':
        PRODUCTO = action.value;
        break;
      case 'UPDATE':
        this.update();
        break;
      default:

        break;
    }

    this.emit('STORE_' + action.actionType);

  }

}

export default new ProductosStore();
