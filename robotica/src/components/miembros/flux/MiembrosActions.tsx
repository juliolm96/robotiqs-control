import MiembrosDispatcher from './MiembrosDispatcher';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

// arreglo de objetos del tipo "escuela" donde se guardarán los datos de una
// petición hecha al backend para poder ingresarlos a la STORE y acceder
let escuelas: Interfaces.Escuela[] = [];

class MiembrosActions {

  registrarMiembro() {
    MiembrosDispatcher.dispatch({
      actionType: 'REGISTRAR_MIEMBRO'
    });
  }

  // Debido a que los datos del miembro son registrados en la store a manera que
  // cambian, solo es necesario mandar llamar el método para que haga la peti-
  // ción de actualizar a la Store y esta al backend
  actualizarMiembro() {
    MiembrosDispatcher.dispatch({
      actionType: 'ACTUALIZAR_MIEMBRO'
    });
  }

  // este método manda hacer una petición al backend de una lista de las escue-
  // las registradas en la BD.
  fillEscuelas() {

    HTTP.get( CONST.BACKEND + 'escuelas').then(
      // a partir de el resultado recibido se se limpia la variable 'escuelas' y
      // mediante un ciclo se va llenando ese objeto, se retorna y se pasa a la
      // siguiente sentencia then...
           (response: Interfaces.Escuela[]) => {
             escuelas = [];
             response.forEach((escuela, index) => {
               escuelas[index] = {
                 nombre: escuela.nombre,
                 id: escuela.id
               };
             });
             return escuelas;
           }
      // a partir de lo retornado en el 'then' anterior se manda llamar al dis-
      // patcher de la store y se envían los datos para llenar una lista de es-
      // cuelas para ser accesibles desde cualquier punto.
    ).then((response: Interfaces.Escuela[]) => {
          MiembrosDispatcher.dispatch({
            actionType: 'FILL_ESCUELAS',
            value: response
          });
      // si llega a fallar la petición en alguno de los 'then' se lanza este
      // 'método'.
        }).catch(() => {
          alert('No se ha podido cargar uno o más recursos(ESCUELAS)\n' +
            'Compruebe su conexión  al la red');
          window.location.href = '/';
        });
  }

  // este método manda hacer una petición al backend de una lista de las escue-
  // las registradas en la BD.
  fillEscuelasNivel(nivelEd: string) {

    HTTP.get(CONST.BACKEND + 'niveles-escuela/nivel/' + nivelEd).then(
      // a partir de el resultado recibido se se limpia la variable 'escuelas' y
      // mediante un ciclo se va llenando ese objeto, se retorna y se pasa a la
      // siguiente sentencia then...
           (response: Interfaces.Escuela[]) => {
             escuelas = [];
             response.forEach((escuela, index) => {
               escuelas[index] = {
                 nombre: escuela.nombre,
                 id: escuela.id
               };
             });
             return escuelas;
           }
      // a partir de lo retornado en el 'then' anterior se manda llamar al dis-
      // patcher de la store y se envían los datos para llenar una lista de es-
      // cuelas para ser accesibles desde cualquier punto.
    ).then((response: Interfaces.Escuela[]) => {
          MiembrosDispatcher.dispatch({
            actionType: 'FILL_ESCUELAS',
            value: response
          });
      // si llega a fallar la petición en alguno de los 'then' se lanza este
      // 'método'.
        }).catch(() => {
          alert('No se ha podido cargar uno o más recursos (ESCUELAS)\n' +
            'Compruebe su conexión  al la red');
          window.location.href = '/';
        });
  }

// Mas delante se presentan una serie de SETTERS para meter datos a la store.

  setNombre(nombre: string) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_NOMBRE',
      value: nombre
    });
  }

  setAPaterno(aP: string) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_A_PATERNO',
      value: aP
    });
  }

  setAMaterno(aM: string) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_A_MATERNO',
      value: aM
    });
  }

  setFechaNac(fechaNac: string) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_FECHA_NAC',
      value: fechaNac
    });
  }

  setTutor(tutor: string) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_TUTOR',
      value: tutor
    });
  }

  setTel(tel: number) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_TEL',
      value: tel
    });
  }

  setNivelEducativo(nivelEd: string) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_NIVEL_EDUCATIVO',
      value: nivelEd
    });

  }

  setEscuela( esc: string ) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_ESCUELA',
      value: esc
    });
  }

  setNumero( numero: number) {
    MiembrosDispatcher.dispatch({
      actionType: 'SET_NUMERO',
      value: numero
    });
  }

  resetEscuelas() {
    MiembrosDispatcher.dispatch({
      actionType: 'RESET_ESCUELAS'
    });
  }

  // este método hace una petición al backend y obtiene una lista de miembros
  ListarMiembros() {

    let data: Interfaces.SocioVista[] = [];

    HTTP.get(CONST.BACKEND + 'socios').then(
           (response: Interfaces.SocioVista[]) => {
             response.forEach((socioVista, index) => {
               data[index] = socioVista;
             });
             return data;
           }
    // Se manda la lista de miembros hacia la Store para hacerlos accesibles.
  ).then((response: Interfaces.SocioVista[]) => {
          MiembrosDispatcher.dispatch({
            actionType: 'LISTAR_MIEMBROS',
            value: response
          });
        }).catch((error) => {
          alert('No se ha podido cargar uno o más recursos(SOCIOS)\n' +
          'Compruebe su conexión  al la red');
          window.location.href = '/';
        });
  }

  buscarSocios(nombre: string) {
    HTTP.get(CONST.BACKEND + 'socios/buscar_nombre/' + nombre).then(
      (response: Interfaces.Socio[]) => {
        MiembrosDispatcher.dispatch({
          actionType: 'LISTAR_MIEMBROS',
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

  // este método hace una petición de un miembro en particular al backend y lo
  // manda a la store (como miembroSeleccionado) para acceder a sus propiedades
  mostrarMiembro(id: number | undefined) {

    HTTP.get(CONST.BACKEND + 'socios/' + id).then(
      (response: Interfaces.SocioVista) => {
          MiembrosDispatcher.dispatch({
            actionType: 'MOSTRAR_MIEMBRO',
            value: response
          });
        }).catch((error) => {
          alert('No se ha podido cargar el recurso \'SOCIOS\'\n' +
          'Compruebe su conexión  al la red');
          window.location.href = '/';
        });
  }

}

export default new MiembrosActions();
