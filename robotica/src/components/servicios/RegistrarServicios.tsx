import * as React from 'react';
import FormInput from '../general/FormInput';
import FormSelect from './childs/registrar/FormSelect';
import ServiciosActions from './flux/ServiciosActions';
import ServiciosStore from './flux/ServiciosStore';

import '../../App.css';

interface MyState {
  paquetes: string[];
  claseSelected: boolean;
  tipo: string;
  paquete: string;
}

class RegistrarServicios extends React.Component<{}, MyState> {

  private concepto: any;
  private precio: any;
  private dias: any;

  constructor(props: any) {
    super(props);

    this.state = {
      paquetes: [],
      claseSelected: true,
      tipo: 'C',
      paquete: ''
    };

    this.radioButtonOnClick = this.radioButtonOnClick.bind(this);
    this.loadPaquetes = this.loadPaquetes.bind(this);
    this.paquetesOnChange = this.paquetesOnChange.bind(this);
  }

  componentWillMount() {
    ServiciosStore.wakeUp();
    ServiciosStore.addChangeListener('STORE_LOAD_PAQUETES', this.loadPaquetes);
    ServiciosActions.loadPaquetes();
  }

  loadPaquetes() {

    let paquetes: string[] = [];

    ServiciosStore.getPaquetes().forEach(
      (paquete) => {
        paquetes.push(paquete.nombre);
      }
    );

    this.setState({
      paquetes: paquetes
    });
  }

  paquetesOnChange(event: any) {
    this.setState({
      paquete: event.target.value
    });
  }

  radioButtonOnClick(event: any) {
    this.setState({
      tipo: event.target.value
    });

    if (event.target.value === 'S') {
      this.setState({
        claseSelected: false
      });
    } else {
      this.setState({
        claseSelected: true
      });
    }
  }

  onSubmit(event: any) {

    ServiciosActions.setConcepto(this.concepto.getValue());
    ServiciosActions.setDias(this.dias.getValue());
    ServiciosActions.setTipo(this.state.tipo);
    ServiciosActions.setPrecio(this.precio.getValue());
    ServiciosActions.setPaquete(this.state.paquete);

    ServiciosActions.submit();

    event.preventDefault();
    event.stopPropagation();
  }

  componentWillUnmount() {
    ServiciosStore.removeChangeListener('STORE_LOAD_PAQUETES', this.loadPaquetes);
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
                    <h3 className="subtitle greydark">REGISTRO DE SERVICIOS</h3>
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
                  textoLabel="Concepto: "
                  length={100}
                  ref={(concepto) => this.concepto = concepto}
                />
                <FormInput
                  inputType="number"
                  isRequired={true}
                  textoLabel="Precio: "
                  value="0.00"
                  ref={(precio) => this.precio = precio}
                />
                <FormInput
                  inputType="number"
                  isRequired={true}
                  textoLabel="Días: "
                  value="0"
                  ref={(dias) => this.dias = dias}
                />
                <div className="nicdark_focus nicdark_width_percentage70">
                  <h3 className="subtitle greydark">Tipo de servicio: </h3>
                  <br/>
                  <label className="radio-container">
                    <h4 className="subtitle greydark">Clase</h4>
                    <input
                      type="radio"
                      name="tipo"
                      value="C"
                      defaultChecked={true}
                      onClick={this.radioButtonOnClick}
                    />
                    <span className="radio-checkmark"/>
                  </label>
                  <br/>
                  <label className="radio-container">
                    <h4 className="subtitle greydark">Suscripción</h4>
                    <input
                      type="radio"
                      name="tipo"
                      value="S"
                      onClick={this.radioButtonOnClick}
                    />
                    <span className="radio-checkmark"/>
                  </label>
                </div>
                { this.state.claseSelected ?
                  <div/>
                  :
                  <div>
                    <FormSelect
                      textoLabel="Paquete: "
                      options={this.state.paquetes}
                      onChangeHandler={this.paquetesOnChange}
                    />
                  </div>
                }
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

export default RegistrarServicios;
