import * as React  from 'react';
import FormInput from '../general/FormInput';
import FormSelect from './childs/registrar/FormSelect';
import MiembrosStore from './flux/MiembrosStore0';
import MiembrosActions from './flux/MiembrosActions';
import * as Interfaces from '../../constantes/Interfaces';

// interfaz para declarar los tipos de las variables de estado que se usarán
interface MyState {
    optionsNE: string[];
    optionsES: string[];
}

// Se declara un Generico del tipo {} ya que no hay props y del tipo "MyState"
// para especificar el tipo de variables de estado que se manejarán
class RegistroMiembros extends React.Component<{}, MyState> {

  private nombre: any;
  private aPaterno: any;
  private aMaterno: any;
  private fechaNac: any;
  private tutor: any;
  private tel: any;

  constructor(props: any) {
    super(props);
    this.state = {
      optionsNE: ['KINDER', 'PRIMARIA', 'SECUNDARIA', 'BACHILLERATO', 'UNIVERSIDAD'],
      optionsES: []
    };

    // Enlace de los metodos usados mas abajo con esta clase
    this.onSubmit = this.onSubmit.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
  }

  // Este método se activa al dar click al boton "REGISTRAR", lo que hace es
  // guardar en la variable "element" el elemento (Un Input de los que están
  // dentro del render) para en seguida poder obtener su "value" y enviarlo
  // a la store para despues poder hacer un POST al backend con esos datos
  onSubmit (event: any) {

    MiembrosActions.setNombre(this.nombre.getValue());
    MiembrosActions.setAPaterno(this.aPaterno.getValue());
    MiembrosActions.setAMaterno(this.aMaterno.getValue());
    MiembrosActions.setFechaNac(this.fechaNac.getValue());
    MiembrosActions.setTutor(this.tutor.getValue());
    MiembrosActions.setTel(this.tel.getValue());

    MiembrosActions.registrarMiembro();
    event.preventDefault();
    event.stopPropagation();

  }

  // Cuando el componente está montado se coloca un esuchador de cambios al
  // método "loadOptions" para cuando la acción "FILL_ESCUELAS" de la STORE
  // se termine de realizar ejecutar ese método
  componentDidMount() {
    MiembrosStore.addChangeListener('STORE_FILL_ESCUELAS', this.loadOptions);
  }

  // Esto es pa que se quite el escuchador cuando el componente se elimine
  // (se renderice otro en su lugar)
  componentWillUnmount() {
    MiembrosStore.removeChangeListener('STORE_FILL_ESCUELAS', this.loadOptions);
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

  render() {

    return (
        <section className="nicdark_section">
          <div className="nicdark_container nicdark_clearfix">
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
                      <i className="icon-pencil-2"/>
                    </a>
                  </td>
                  <td>
                    <div className="grid grid_12">
                      <div className="nicdark_space40"/>
                      <h3 className="subtitle greydark">REGISTRO DE SOCIOS</h3>
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

            {/* Inicio del formulario */}
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
                    ref={(nombre) => this.nombre = nombre}
                    textoLabel="Nombre(s): "
                    inputType="text"
                    length={50}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(aPaterno) => this.aPaterno = aPaterno}
                    textoLabel="Apellido paterno: "
                    inputType="text"
                    length={30}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(aMaterno) => this.aMaterno = aMaterno}
                    textoLabel="Apellido Materno: "
                    inputType="text"
                    length={30}
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
                  <FormInput
                    ref={(fechaNac) => this.fechaNac = fechaNac}
                    textoLabel="Fecha de nacimiento: "
                    inputType="date"
                    isRequired={true}
                    value="2010-01-01"
                  />
                  <FormInput
                    ref={(tutor) => this.tutor = tutor}
                    textoLabel="Tutor: "
                    inputType="text"
                    length={90}
                    isRequired={true}
                  />
                  <FormInput
                    ref={(tel) => this.tel = tel}
                    textoLabel="Teléfono: "
                    inputType="number"
                    length={10}
                    isRequired={true}
                  />
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <div className="nicdark_space20"/>
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <input
                        type="Submit"
                        defaultValue="REGISTRAR &nbsp; &#x270E;"
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
        </section>
    );
  }
}

export default RegistroMiembros;
