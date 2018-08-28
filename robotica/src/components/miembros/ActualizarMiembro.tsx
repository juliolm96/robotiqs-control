import * as React  from 'react';
import FormInput from '../general/FormInput';
// un select especifico para este caso
import FormSelect from './childs/actualizar/FormSelect';

import ListElement from './childs/actualizar/ListElement';
import MiembrosStore from './flux/MiembrosStore0';
import MiembrosActions from './flux/MiembrosActions';
import * as Interfaces from '../../constantes/Interfaces';

import '../../App.css';

// interfaz para declarar los tipos de las variables de estado que se usarán
interface MyState {
    optionsNE: string[];
    optionsES: string[];
    userSelected: boolean;
    listOptions: JSX.Element[];
    miembro: Interfaces.Socio;
    itemsLoaded: boolean;
}

// Se declara un Generico del tipo {} ya que no hay props y del tipo "MyState"
// para especificar el tipo de variables de estado que se manejarán
class ActualizarMiembro extends React.Component<{}, MyState> {

  // Objetos a referenciar
  private numero: any;
  private nombre: any;
  private aPaterno: any;
  private aMaterno: any;
  private fechaNac: any;
  private tutor: any;
  private tel: any;

 // El constructor carga las opciones por defecto de nivel educativo y a la vez
 // un objeto vacio de escuelas (para llenarse despues con una petición), una
 // variable de estado más, del tipo booleana para saber si se ha seleccionado
 // un usuario, una lista de elementos string que serán al final una serie de
 // elementos del tipo <li> (listOptions[]) que mostrarán los miembros re-
 // gistrados Y un objeto del tipo miembro vacío además de los enlaces a metodos
  constructor(props: any) {
    super(props);
    this.state = {
      optionsNE: ['KINDER', 'PRIMARIA', 'SECUNDARIA', 'BACHILLERATO', 'UNIVERSIDAD'],
      optionsES: [],
      userSelected: false,
      listOptions: [],
      miembro: {
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
      },
      itemsLoaded: false
    };

    // Enlace de los metodos usados mas abajo con esta clase
    this.onSubmit = this.onSubmit.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.loadMiembros = this.loadMiembros.bind(this);
    this.cargarMiembro = this.cargarMiembro.bind(this);
    this.volver = this.volver.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
  }

  // Antes de que el componente se renderize manda llenar un arreglo de
  // "ESCUELAS" en la Store, para en otro pasó llenar un SELECT con los datos
  // que se obtuvieron de esa petición
  componentWillMount() {
    MiembrosStore.addChangeListener('STORE_FILL_ESCUELAS', this.loadOptions);
    MiembrosStore.addChangeListener('STORE_LISTAR_MIEMBROS', this.loadMiembros);
    MiembrosStore.addChangeListener('STORE_MOSTRAR_MIEMBRO', this.cargarMiembro);
    // Relacionado a 'STORE_LISTAR_MIEMBROS'
    MiembrosActions.ListarMiembros();
    // Relacionado a 'STORE_FILL_ESCUELAS'
    MiembrosActions.fillEscuelas();

  }

  // En este método, que se "dispara" al llenarse el arreglo de escuelas en la
  // STORE lo primero que hace es obtener ese arreglo desde la store y almace-
  // narlo en la variable local _escuelas, para obtener solo los nombres de las
  // escuelas (en el for se llena el arreglo escuelas).
  // se actualizan las variables de estado, con lo que ya se tenía en niveles
  // educativos y las escuelas obtenidas y se forza una actualización(re-render)
  loadOptions() {

    let _escuelas: Interfaces.Escuela[] = MiembrosStore.getEscuelas();
    // Se declara otra variable para ingresarle los nombres de las escuelas
    // en un siguiente paso
    let escuelas: string[] = [];

    _escuelas.forEach((escuela, index) => {
      escuelas[index] = escuela.nombre;
    });

    this.setState({
      optionsNE: this.state.optionsNE,
      optionsES: escuelas
    });

    this.forceUpdate();
  }

  // este método obtiene un listado de miembros registrados, recorre esa lista
  // y llena la variable de estado "listOptions" para mostrarlos como elementos
  // del tipo <li>, está enlaza a un ChangeListener
  loadMiembros() {

    let miembros: Interfaces.Socio[] = MiembrosStore.getListadoMiembros();

    let _listOptions: JSX.Element[] = [];

    miembros.forEach( (miembro, index) => {
      _listOptions.push((
                        <ListElement
                          key={index}
                          nombre={miembro.nombre + ' ' + miembro.apellido_paterno}
                          numero={'' + miembro.numero}
                          handleClick={this.listElementClick}
                          id={miembro.id}
                        />
                       ));
    });

    this.setState({
      listOptions: _listOptions,
      itemsLoaded: true
    });
  }

  // Este método obtiene el miembro seleccionado de la lista, para poder rende-
  // rizar sus propiedades en el formulario y que sean modificadas. Además cam-
  // bia la variable de estado 'userSelected' a 'true' para renderizar el form
  // este método está conectado al escuchador de cambios de la store (Change
  // Listener), se activa cuando se le da clic a un <li> de la lista
  cargarMiembro() {
    let miembroLoaded = MiembrosStore.mostrarMiembro();
    this.setState({
      miembro: miembroLoaded,
      userSelected: true
    });
  }

  // si se presiona el boton 'REGRESAR' de la pantalla renderizada se cambiará
  // la variable de estado 'userSelected' para que se vuelva a renderizar la
  // lista de miembros registrados en el sistema
  volver() {
    this.setState({
      userSelected: false
    });
  }

  listElementClick(id: number | undefined) {
    MiembrosActions.mostrarMiembro(id);
  }

  // Este método se activa al dar click al boton "REGISTRAR", lo que hace es
  // guardar en la variable "element" el elemento (Un Input de los que están
  // dentro del render) para en seguida poder obtener su "value" y enviarlo
  // a la store para despues poder hacer un POST al backend con esos datos
  onSubmit (event: any) {
    event.preventDefault();
    MiembrosActions.setNumero(this.numero.getValue());
    MiembrosActions.setNombre(this.nombre.getValue());
    MiembrosActions.setAPaterno(this.aPaterno.getValue());
    MiembrosActions.setAMaterno(this.aMaterno.getValue());
    MiembrosActions.setFechaNac(this.fechaNac.getValue());
    MiembrosActions.setTutor(this.tutor.getValue());
    MiembrosActions.setTel(this.tel.getValue());

    MiembrosActions.actualizarMiembro();

    event.preventDefault();
    event.stopPropagation();
  }

  // Esto es pa que se quite el escuchador cuando el componente se elimine
  // (se renderice otro en su lugar)
  componentWillUnmount() {

    MiembrosStore.removeChangeListener('STORE_FILL_ESCUELAS', this.loadOptions);
    MiembrosStore.removeChangeListener('STORE_LISTAR_MIEMBROS', this.loadMiembros);
    MiembrosStore.removeChangeListener('STORE_MOSTRAR_MIEMBRO', this.cargarMiembro);

  }

  // Este método render renderiza dependiendo una variable de estado una lista
  // de miembros registrados y si se da click a una opción de la lista lo que
  // hace es cambiar una variable de estado (userSelected) y mostrar un formu-
  // lario con los datos del usuario al que se dio clic
  render() {
    return (
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix">
          { this.state.itemsLoaded ?
            <div/>
            :
            <div
              style={
                {
                  display: 'flex',
                  justifyContent: 'center'
                }
              }
            >
              <br/>
              <h3
                className="subtitle greydark"
                style={{paddingTop: '40px'}}
              >
                Loading . . .
              </h3>
            </div>
          }
          { this.state.userSelected ?
            <div>
            <a
              onClick={this.volver}
              className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
            >
              <i className="icon-reply-outline">&nbsp;Seleccionar socio</i>
            </a>
            <br/> <br/>
            {/*INCIO DE ENCABEZADO*/}
            <table className="nicdark_container nicdark_clearfix">
              <tbody>
                <tr>
                  <td>
                    <a
                      href="#"
                      className={
                        'nicdark_displaynone_iphoneland nicdark_displaynone_iphonepotr ' +
                        'nicdark_btn_icon nicdark_bg_blue ' +
                        'extrabig nicdark_radius_left white nicdark_relative'
                      }
                    >
                      <i className="icon-doc-text-1"/>
                    </a>
                  </td>
                  <td>
                    <div className="grid grid_12">
                      <div className="nicdark_space40"/>
                      <h3 className="subtitle greydark">ACTUALIZACIÓN DE SOCIOS</h3>
                      <div className="nicdark_space20"/>
                      <div className="nicdark_divider left small">
                        <span className="nicdark_bg_blue nicdark_radius"/>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            {/*FIN DE ENCABEZADO*/}
            <form onSubmit={(submit) => this.onSubmit(submit)}>
              <div
                className="nicdark_textevidence"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
              >
                <div
                  className={
                    'nicdark_margin1820 nicdark_marginleft100 ' +
                    'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
                  }
                >
                  <FormInput
                    ref={(numero) => this.numero = numero}
                    textoLabel="# de miembro: "
                    inputType="number"
                    value={'' + this.state.miembro.numero}
                    disabled={true}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(nombre) => this.nombre = nombre}
                    textoLabel="Nombre(s): "
                    inputType="text"
                    length={50}
                    value={this.state.miembro.nombre}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(aPaterno) => this.aPaterno = aPaterno}
                    textoLabel="Apellido paterno: "
                    inputType="text"
                    length={30}
                    value={this.state.miembro.apellido_paterno}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(aMaterno) => this.aMaterno = aMaterno}
                    textoLabel="Apellido Materno: "
                    inputType="text"
                    length={30}
                    value={this.state.miembro.apellido_materno}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(fechaNac) => this.fechaNac = fechaNac}
                    textoLabel="Fecha de nacimiento: "
                    inputType="date"
                    value={this.state.miembro.fecha_nacimiento}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(tutor) => this.tutor = tutor}
                    textoLabel="Tutor: "
                    inputType="text"
                    length={90}
                    value={this.state.miembro.tutor}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(tel) => this.tel = tel}
                    textoLabel="Telefono: "
                    inputType="number"
                    length={10}
                    value={'' + this.state.miembro.telefono}
                    isRequired={true}
                  />
                  <FormSelect
                    textoLabel="Nivel Educativo: "
                    options={this.state.optionsNE}
                    name="NivelEd"
                  />
                  <FormSelect
                    textoLabel="Escuela: "
                    options={this.state.optionsES}
                    name="Escuela"
                  />
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <div className="nicdark_space20"/>
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <input
                        type="Submit"
                        defaultValue="ACTUALIZAR &nbsp; &#x2714;"
                        className={
                          'nicdark_btn fullwidth nicdark_bg_blue medium ' +
                          'nicdark_shadow nicdark_radius white nicdark_press'
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            </div>
            :
            <div>
              <div className="nicdark_space20"/>
              <div style={{textAlign: 'center'}}>
                <h2 className="subtitle greydark">ACTUALIZACIÓN DE SOCIOS</h2>
              </div>
              <div className="nicdark_space40"/>
            <ul className="undecored-list">
              {this.state.listOptions}
            </ul>
            </div>
          }
        </div>
      </section>
    );
  }
}

export default ActualizarMiembro;
