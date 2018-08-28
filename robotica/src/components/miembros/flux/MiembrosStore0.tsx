import MiembrosDispatcher from './MiembrosDispatcher';
import { EventEmitter } from 'events';
import * as Interfaces from '../../../constantes/Interfaces';
import { CONST } from '../../../constantes/CONST';
import * as HTTP from '../../../services/HTTP';

// Array de objetos del tipo "Escuela" para guardar los datos de las escuelas
// registradas recibidas por una petición desde actions y tratarlas despues
let escuelas: Interfaces.Escuela[] = [];
let miembros: Interfaces.SocioVista[] = [];
let miembroSeleccionado: Interfaces.SocioVista;

// Objeto del tipo "Miembro" que va a ser llenado con los datos de la parte
// superior según sean agregados por la vista
let SOCIO: Interfaces.Socio = {
  apellido_materno: '',
  apellido_paterno: '',
  escuela_id: 0,
  fecha_ingreso: '',
  fecha_nacimiento: '',
  id: 0,
  nivel_educativo: '',
  nombre: '',
  numero: 0,
  saldo_clases: 0,
  telefono: 0,
  tutor: ''
};

let _nombreEscuela: string | undefined = '';

class MiembrosStore0 extends EventEmitter {

  constructor() {
    super();
    // Registra el método "dispatcherCallback" como su Dispatcher por defecto
    MiembrosDispatcher.register(this.dispatcherCallback.bind(this));
  }

  // Método que llena un arreglo del tipo "Escuela" para ser enviado a un
  // Select en la vista
  fillEscuelas (data: Interfaces.Escuela[]) {
    escuelas = [];
    escuelas = data;
  }

  // Método para obtener un array de "escuelas" para la vista
  getEscuelas(): Interfaces.Escuela[] {
    return escuelas;
  }

  // coloca solo el primer carácter de la opción de nivel educativo seleccionada
  // ya que la BD solo registra 'K,P,S,B,U'.
  setNivelEducativo ( nivelEd: string ) {
     SOCIO.nivel_educativo = nivelEd.charAt(0);
  }

  // Método para identificar el nombre de la escuela de la que proviene el
  // miembro a registrar. Eso en base
  // al nombre seleccionado en la vista ( en el SELECT de escuelas. Ya que se
  // debe mandar su ID al backend)
  // Primero se coloca el nombre de la escuela en la variable global que
  // maneja la escuela del miembro, y despues se coloca el ID de la escuela
  // en el atributo global _escuelaId
  setEscuela (nombreEsc: string) {

    for (var i = 0; i < escuelas.length; i++) {
      if (escuelas[i].nombre === nombreEsc) {
        SOCIO.escuela_id = escuelas[i].id;
        _nombreEscuela = nombreEsc;
        break;
      }
    }

  }

  // A partir del nombre de la escuela almacenado de manera global, se consigue
  // el ID de la lista de escuelas

  setNombre (nom: string) {
    SOCIO.nombre = nom;
  }

  setAPaterno (aP: string) {
    SOCIO.apellido_paterno = aP;
  }

  setAMaterno (aM: string) {
    SOCIO.apellido_materno = aM;
  }

  setFechaNac (fNac: string) {
    SOCIO.fecha_nacimiento = fNac;
  }

  setTutor (tutor: string) {
    SOCIO.tutor = tutor;
  }

  setTel (tel: number) {
    SOCIO.telefono = tel;
  }

  setNumero (numero: number) {
    SOCIO.numero = numero;
  }

  listarMiembros(data: Interfaces.SocioVista[]) {
    miembros = [];
    miembros = data;
  }

  getListadoMiembros(): Interfaces.Socio[] {
    return miembros;
  }

  cargarMiembro(data: Interfaces.SocioVista) {
    this.setEscuela(data.nombre_escuela);
    miembroSeleccionado = data;
  }

  mostrarMiembro(): Interfaces.SocioVista {
    return miembroSeleccionado;
  }

  getNivelEducativo(): string {
    SOCIO.nivel_educativo = miembroSeleccionado.nivel_educativo;
    return miembroSeleccionado.nivel_educativo;
  }

  getNivelEducativoActualizado(): string {
    return SOCIO.nivel_educativo;
  }

  getNombreEscuela(): string {
    _nombreEscuela = miembroSeleccionado.nombre_escuela;
    return _nombreEscuela;
  }

  // Método para envíar al backend los datos del nuevo miembro a registrar.
  // Se llena a partir de los datos obtenidos de la visa y se hace una
  // petición del tipo POST al backend y se le da tratamiento por si es
  // exitosa o si falló algo en el proceso
  submitMiembro() {

    // PUEDE SER QUE NO SEA NECESARIO LIMPIAR EL OBJETO 'miembro', FALTARÁ PRO-
    // BAR ESA PARTE PARA OPTIMIZAR CÓDIGO
    HTTP.post( CONST.BACKEND + 'socios', SOCIO).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA AGREGADO EXITOSAMENTE');
          window.location.href = '/';
        } else {
          alert('conflicto de datos al registrar socio, \nVerifique los campos');
        }
    }).catch((error) => {
      console.warn(error);
      alert('error al registrar socio, \nVerifique los campos');
    });

  }

  actualizarMiembro() {

    SOCIO.id = miembroSeleccionado.id;

    HTTP.put( CONST.BACKEND + 'socios', SOCIO).then(
      function(response: any) {
        if (response.status > 199 && response.status < 300) {
          alert('EL REGISTRO SE HA ACTUALIZADO EXITOSAMENTE');
          window.location.href = '/';
        } else {
          alert('error al actualizar socio, \nVerifique los campos \nError: ' + response.status);
        }
        return response;
    }).catch((error) => {
      alert('error al actualizar socio, \nVerifique los campos\n\n Error: ' + error);
    });

  }

  // Método para agregar escuchadores de cambios ante ciertos metodos
  addChangeListener(eventName: string, callback: any) {
      this.on(eventName, callback);
  }

  // Método para elminar un escuchador de cambios
  removeChangeListener(eventName: string, callback: any) {
      this.removeListener(eventName, callback);
  }

  // El método callback recibe 2 parametros (englobados en Action) en este caso:
  // actionType, para saber el tipo de acción a realizar y
  // value, para procesar/almacenar un dato de cualquier tipo en la store
  dispatcherCallback(action: Interfaces.Action) {

      switch (action.actionType) {
        case 'REGISTRAR_MIEMBRO':

          this.submitMiembro();
          break;
        case 'FILL_ESCUELAS':
          this.fillEscuelas(action.value);
          break;
        case 'SET_NIVEL_EDUCATIVO':
          this.setNivelEducativo(action.value);
          break;
        case 'SET_ESCUELA':
          this.setEscuela(action.value);
          break;
        case 'SET_NOMBRE':
          this.setNombre(action.value);
          break;
        case 'SET_A_MATERNO':
          this.setAMaterno(action.value);
          break;
        case 'SET_A_PATERNO':
          this.setAPaterno(action.value);
          break;
        case 'SET_FECHA_NAC':
          this.setFechaNac(action.value);
          break;
        case 'SET_TUTOR':
          this.setTutor(action.value);
          break;
        case 'SET_TEL':
          this.setTel(action.value);
          break;
        case 'SET_NUMERO':
          this.setNumero(action.value);
          break;
        case 'LISTAR_MIEMBROS':
          this.listarMiembros(action.value);
          break;
        case 'MOSTRAR_MIEMBRO':
          this.cargarMiembro(action.value);
          break;
        case 'ACTUALIZAR_MIEMBRO':
          this.actualizarMiembro();
          break;
        case 'RESET_ESCUELAS':
          this.emit('RESET_ESCUELAS');
          break;
        default:

          break;

      }

      // Este método emite un llamado para triggerear (disparar) algún metodo
      // relacionado a un escuchador registrado con el nombre especificado
      this.emit('STORE_' + action.actionType);
  }

}

export default new MiembrosStore0();
