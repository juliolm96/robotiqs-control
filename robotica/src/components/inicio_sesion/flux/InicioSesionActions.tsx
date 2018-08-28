import InicioSesionDispatcher from './InicioSesionDispatcher';
// import * as Interfaces from '../../../constantes/Interfaces';
import * as HTTP from '../../../services/HTTP';
import { CONST } from '../../../constantes/CONST';
import * as Interfaces from '../../../constantes/Interfaces';

class InicioSesionActions {

    iniciarSesion(objInicioSesion: {email: string, password: string}) {

      HTTP.getWithObject(CONST.BACKEND_ROOT + 'api/auth/signin', objInicioSesion).then(

        (response: Interfaces.SessionObject) => {

          if (response.tokenType === 'Bearer') {

            InicioSesionDispatcher.dispatch({
              actionType: 'SET_SESION_OBJECT',
              value: response
            });

            window.location.href = '/';
            return true;

          } else {

            alert('USUARIO O CONTRASEÑA INCORRECTOS');
            window.location.href = '/login';
            return false;

          }

        }
      ).catch((error: any) => {
        alert('No se ha podido hacer contacto con el servidor');
      });
    }

    cerrarSesion(cleanObject: Interfaces.SessionObject) {
      InicioSesionDispatcher.dispatch({
        actionType: 'SET_SESION_OBJECT',
        value: cleanObject
      });
    }

    registrarUsuario(objRegistro: Interfaces.registroObject) {

      HTTP.post(CONST.BACKEND_ROOT + '/api/auth/signup', objRegistro).then(
        (response: any) => {
          if (response.status === 201) {
            alert('Se ha registrado exitosamente');
            window.location.href = '/login';
          } else if (response.status === 400) {
            alert('No se cumple con el formato de registro. Posibles fallas:\n\n' +
            '-Dirección de email no valida\n' +
            '-Nombre de usuario y/o Email ya registrados');
          }
        }
      ).catch((error) => {
        console.warn(error);
        alert('No se ha podido hacer contacto con el servidor');
      });
    }

}

export default new InicioSesionActions();
