import * as React from 'react';
import FormInput from '../general/FormInput';
import FormSelect from './childs/actualizar/FormSelect';
import ServiciosStore from './flux/ServiciosStore';
import ServiciosActions from './flux/ServiciosActions';
import ListElement from './childs/actualizar/ListElement';

import '../../App.css';

interface MyState {

  paquetes: string[];
  paqueteActual?: string;
  concepto: string;
  precio: number;
  dias: number;
  tipo: string;
  isTipoC: boolean;
  isTipoS: boolean;
  serviciosList: JSX.Element[];
  servicioSelected: boolean;
  itemsLoaded: boolean;
}

class ActualizarServicio extends React.Component<{}, MyState> {

  private concepto: any;
  private precio: any;
  private dias: any;

  constructor(props: any) {
    super(props);

    this.state = {
      concepto: '',
      dias: 0,
      isTipoC: false,
      isTipoS: false,
      paqueteActual: '',
      paquetes: [],
      precio: 0,
      serviciosList: [],
      servicioSelected: false,
      tipo: '',
      itemsLoaded: false
    };

    this.loadServicios = this.loadServicios.bind(this);
    this.renderServicio = this.renderServicio.bind(this);
    this.radioButtonOnClick = this.radioButtonOnClick.bind(this);
    this.loadPaquetes = this.loadPaquetes.bind(this);
    this.paquetesOnChange = this.paquetesOnChange.bind(this);
    this.volver = this.volver.bind(this);

  }

  componentWillMount() {
    ServiciosStore.wakeUp();
    ServiciosStore.addChangeListener('STORE_LOAD_SERVICIOS', this.loadServicios);
    ServiciosStore.addChangeListener('STORE_LOAD_PAQUETES', this.loadPaquetes);
    ServiciosStore.addChangeListener('STORE_LOAD_SERVICIO_BY_ID', this.renderServicio);
    ServiciosActions.loadPaquetes();
    ServiciosActions.loadServicios();
  }

  loadServicios() {

    let servicios: any[] = [];

    ServiciosStore.getServiciosList().forEach(
      (servicio, index) => {
        servicios.push(
          <ListElement
            id={servicio.articuloId}
            handleClick={this.listElementClick}
            key={index}
            concepto={servicio.concepto}
            codigo={servicio.codigo}
          />
        );
      }
    );

    this.setState({
      serviciosList: servicios,
      itemsLoaded: true
    });

  }

  listElementClick(id: number) {
    ServiciosActions.loadServicioById(id);
  }

  renderServicio() {
    this.setState({
      concepto: ServiciosStore.getServicioSeleccionado().concepto,
      dias: ServiciosStore.getServicioSeleccionado().dias,
      tipo: ServiciosStore.getServicioSeleccionado().tipo,
      precio: ServiciosStore.getServicioSeleccionado().precio,
      paqueteActual: ServiciosStore.getServicioSeleccionado().nombrePaquete,
      servicioSelected: true
    });

    if (ServiciosStore.getServicioSeleccionado().tipo === 'C') {
      this.setState({
        isTipoC: true,
        isTipoS: false
      });
    } else if (ServiciosStore.getServicioSeleccionado().tipo === 'S') {
      this.setState({
        isTipoS: true,
        isTipoC: false
      });
    }

    this.forceUpdate();
  }

  loadPaquetes() {
    let paquetes: string[] = [];

    ServiciosStore.getPaquetes().forEach(
      (servicio) => {
        paquetes.push(servicio.nombre);
      }
    );

    this.setState({
      paquetes: paquetes
    });

  }

  radioButtonOnClick(event: any) {

    this.setState({
      tipo: event.target.value
    });

    if (event.target.value === 'S') {
      this.setState({
        isTipoC: false,
        isTipoS: true
      });
    } else {
      this.setState({
        isTipoC: true,
        isTipoS: false
      });
    }

  }

  paquetesOnChange(event: any) {
    this.setState({
      paqueteActual: event.target.value
    });
  }

  onSubmit(event: any) {
    ServiciosActions.setDias(this.dias.getValue());
    ServiciosActions.setTipo(this.state.tipo);
    ServiciosActions.setPrecio(this.precio.getValue());
    ServiciosActions.setPaquete('' + this.state.paqueteActual);
    ServiciosActions.setConcepto(this.concepto.getValue());

    ServiciosActions.update();

    event.preventDefault();
    event.stopPropagation();

  }

  volver() {
    this.setState({
      servicioSelected: false
    });
  }

  componentWillUnmount() {
    ServiciosStore.removeChangeListener('STORE_LOAD_SERVICIOS', this.loadServicios);
    ServiciosStore.removeChangeListener('STORE_LOAD_PAQUETES', this.loadPaquetes);
    ServiciosStore.removeChangeListener('STORE_LOAD_SERVICIO_BY_ID', this.renderServicio);
  }

  render() {
    return(
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
        { this.state.servicioSelected ?
          <div>
            <a
              onClick={this.volver}
              className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
            >
              <i className="icon-reply-outline">&nbsp;Seleccionar paquete</i>
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
                        'nicdark_btn_icon nicdark_bg_violet ' +
                        'extrabig nicdark_radius_left white nicdark_relative'
                      }
                    >
                      <i className="icon-doc-text-1"/>
                    </a>
                  </td>
                  <td>
                    <div className="grid grid_12">
                      <div className="nicdark_space40"/>
                      <h3 className="subtitle greydark">ACTUALIZACIÓN DE PAQUETES</h3>
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
                  <br/>
                  <FormInput
                    inputType="text"
                    isRequired={true}
                    textoLabel="Concepto: "
                    length={100}
                    value={this.state.concepto}
                    ref={(concepto) => this.concepto = concepto}
                  />
                  <FormInput
                    inputType="number"
                    isRequired={true}
                    textoLabel="Precio: "
                    value={'' + this.state.precio}
                    ref={(precio) => this.precio = precio}
                  />
                  <FormInput
                    inputType="number"
                    isRequired={true}
                    textoLabel="Días: "
                    value={'' + this.state.dias}
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
                        checked={this.state.isTipoC}
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
                        checked={this.state.isTipoS}
                        onClick={this.radioButtonOnClick}
                      />
                      <span className="radio-checkmark"/>
                    </label>
                  </div>
                  { this.state.isTipoC ?
                    <div/>
                    :
                    <div>
                      <FormSelect
                        textoLabel="Paquete: "
                        options={this.state.paquetes}
                        onChangeHandler={this.paquetesOnChange}
                        paqueteActual={'' + this.state.paqueteActual}
                      />
                    </div>
                  }
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <div className="nicdark_space20"/>
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <input
                        type="Submit"
                        defaultValue="ACTUALIZAR&nbsp;&#x2714;"
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
          :
          <div>
            <ul className="undecored-list">
            {this.state.serviciosList}
            </ul>
          </div>
        }
        </div>
      </section>
    );
  }

}

export default ActualizarServicio;
