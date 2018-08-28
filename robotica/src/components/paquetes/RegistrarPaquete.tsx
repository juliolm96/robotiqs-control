import * as React from 'react';
import PaquetesActions from './flux/PaquetesActions';
import PaquetesStore from './flux/PaquetesStore';
import FormInput from '../general/FormInput';
import FormTextArea from '../general/FormTextArea';
import FormSelect from './childs/registrar/FormSelect';

interface MyState {
  listaPaquetes: string[];
  setId: number;
  nombre: string;
}

class RegistrarPaquete extends React.Component<{}, MyState> {

  private descripcion: any;
  private nombre: any;

  constructor(props: any) {
    super(props);

    this.state = {
      listaPaquetes: [],
      setId: 0,
      nombre: ''
    };

    this.paqueteOnChange = this.paqueteOnChange.bind(this);
    this.loadSets = this.loadSets.bind(this);
  }

  componentWillMount() {
      PaquetesStore.wakeUp();
      PaquetesStore.addChangeListener('STORE_LOAD_SETS', this.loadSets);
      PaquetesActions.loadSets();
  }

  paqueteOnChange(event: any) {
    let setId: number = PaquetesStore.getSetId(event.target.value);
    PaquetesActions.loadSetSeleccionado(setId);

    this.setState({
      setId: setId
    });

  }

  loadSets() {

    let sets: string[] = [];

    PaquetesStore.getSets().forEach(
      (set) => {
        sets.push(set.nombre);
      }
    );
    this.setState({
      listaPaquetes: sets
    });
    this.forceUpdate();
  }

  onSubmit(event: any) {

    PaquetesActions.setDescripcion(this.descripcion.getValue());
    PaquetesActions.setSetId(this.state.setId);
    PaquetesActions.setNombre(this.nombre.getValue());

    PaquetesStore.submit();

    event.preventDefault();
    event.stopPropagation();
  }

  componentWillUnmount() {
    PaquetesStore.removeChangeListener('STORE_LOAD_SETS', this.loadSets);
  }

  render() {
    return(
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
                      'nicdark_btn_icon nicdark_bg_violet ' +
                      'extrabig nicdark_radius_left white nicdark_relative'
                    }
                  >
                    <i className="icon-pencil-2"/>
                  </a>
                </td>
                <td>
                  <div className="grid grid_12">
                    <div className="nicdark_space40"/>
                    <h3 className="subtitle greydark">REGISTRO DE PAQUETES</h3>
                    <div className="nicdark_space20"/>
                    <div className="nicdark_divider left small">
                      <span className="nicdark_bg_violet nicdark_radius"/>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/*FIN DE ENCABEZADO*/}
          <form onSubmit={(submit) => this.onSubmit(submit)}>
            <div className="nicdark_textevidence">
              <div
                className={
                  'nicdark_margin1820 nicdark_marginleft100 nicdark_width_percentage100 ' +
                  'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
                }
              >
                <FormInput
                  inputType="text"
                  isRequired={true}
                  length={30}
                  value={undefined}
                  textoLabel="Nombre: "
                  ref={(nombre) => this.nombre = nombre}
                />
                <FormTextArea
                  length={80}
                  maxRows={2}
                  textoLabel="Descripcion"
                  ref={(descripcion) => this.descripcion = descripcion}
                />
                <FormSelect
                  onChangeHandler={this.paqueteOnChange}
                  textoLabel="Set"
                  options={this.state.listaPaquetes}
                />
                <div className="nicdark_focus nicdark_width_percentage40">
                  <div className="nicdark_space20"/>
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <input
                      type="Submit"
                      defaultValue="REGISTRAR&nbsp;✎"
                      className={
                        'nicdark_btn fullwidth nicdark_bg_violet medium ' +
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

export default RegistrarPaquete;
