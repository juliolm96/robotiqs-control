import * as React from 'react';
import FormInput from '../general/FormInput';
import FormTextArea from '../general/FormTextArea';
import FormSelect from './childs/actualizar/FormSelect';
import PaquetesActions from './flux/PaquetesActions';
import PaquetesStore from './flux/PaquetesStore';
import ListElement from './childs/actualizar/ListElement';

import '../../App.css';

interface MyState {
  nombre: string;
  descripcion: string;
  nombre_set: string;
  setId: number;
  listaPaquetes: JSX.Element[];
  paqueteId: number | undefined;
  paqueteSelected: boolean;
  sets: string[];
  id: number;
  itemsLoaded: boolean;
}

class ActualizarPaquete extends React.Component<{}, MyState> {

  private nombre: any;
  private descripcion: any;

  constructor(props: any) {
    super(props);

    this.state = {
      descripcion: '',
      nombre: '',
      setId: 0,
      listaPaquetes: [],
      paqueteId: 0,
      paqueteSelected: false,
      sets: [],
      nombre_set: '',
      id: 0,
      itemsLoaded: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.setOnChange = this.setOnChange.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.renderPaqueteSeleccionado = this.renderPaqueteSeleccionado.bind(this);
    this.loadSets = this.loadSets.bind(this);
    this.renderPaquetes = this.renderPaquetes.bind(this);
    this.volver = this.volver.bind(this);
  }

  componentWillMount() {
    PaquetesStore.wakeUp();

    PaquetesStore.addChangeListener('STORE_LOAD_PAQUETES', this.renderPaquetes);
    PaquetesStore.addChangeListener('STORE_LOAD_PAQUETE_VISTA_BY_ID', this.renderPaqueteSeleccionado);
    PaquetesStore.addChangeListener('STORE_LOAD_SETS', this.loadSets);

    PaquetesActions.loadPaquetes();
    PaquetesActions.loadSets();
  }

  loadSets() {
    let sets: string[] = [];
    PaquetesStore.getSets().forEach(
      (paquete) => {
        sets.push(paquete.nombre);
      }
    );

    this.setState({
      sets: sets,
      itemsLoaded: true
    });
  }

  renderPaquetes() {
    let listaElementos: JSX.Element[] = [];
    PaquetesStore.getPaquetes().forEach(
      (paquete, index) => {
        listaElementos.push(
          <ListElement
            handleClick={this.listElementClick}
            id={paquete.id}
            key={index}
            nombre={paquete.nombre}
          />
        );
      }
    );

    this.setState({
      listaPaquetes: listaElementos
    });

  }

  listElementClick(id: number | undefined) {

    this.setState({
      paqueteId: id
    });

    PaquetesActions.loadPaqueteVistaById(id);

  }

  setOnChange(event: any) {
    this.setState({
      setId: PaquetesStore.getSetId(event.target.value)
    });
  }

  renderPaqueteSeleccionado() {
    this.setState({
      id: PaquetesStore.getPaqueteSeleccionado().id,
      nombre: PaquetesStore.getPaqueteSeleccionado().nombre,
      descripcion: PaquetesStore.getPaqueteSeleccionado().descripcion,
      nombre_set: PaquetesStore.getPaqueteSeleccionado().nombre_set,
      setId: PaquetesStore.getPaqueteSeleccionado().setId,
      paqueteSelected: true
    });

    this.forceUpdate();
  }

  onSubmit(event: any) {

    PaquetesActions.setSetId(this.state.setId);
    PaquetesActions.setNombre(this.nombre.getValue());
    PaquetesActions.setDescripcion(this.descripcion.getValue());
    PaquetesActions.setId(this.state.id);

    PaquetesStore.update();

    event.preventDefault();
    event.stopPropagation();
  }

  volver() {
    this.setState({
      paqueteSelected: false
    });
  }

  componentWillUnmount() {
    PaquetesStore.removeChangeListener('STORE_LOAD_PAQUETES', this.renderPaquetes);
    PaquetesStore.removeChangeListener('STORE_LOAD_PAQUETE_VISTA_BY_ID', this.renderPaqueteSeleccionado);
    PaquetesStore.removeChangeListener('STORE_LOAD_SETS', this.loadSets);
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
          { this.state.paqueteSelected ?
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
              <form
                className="form-horizontal col-md-10"
                onSubmit={(submit) => this.onSubmit(submit)}
              >
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
                      value={this.state.nombre}
                      textoLabel="Nombre: "
                      ref={(nombre) => this.nombre = nombre}
                    />
                    <FormTextArea
                      length={80}
                      maxRows={2}
                      textoLabel="Descripcion"
                      value={this.state.descripcion}
                      ref={(descripcion) => this.descripcion = descripcion}
                    />
                    <FormSelect
                      onChangeHandler={this.setOnChange}
                      setValue={this.state.nombre_set}
                      textoLabel="Set"
                      options={this.state.sets}
                    />
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <div className="nicdark_space20"/>
                      <div className="nicdark_focus nicdark_width_percentage40">
                        <input
                          type="Submit"
                          defaultValue="ACTUALIZAR &nbsp; &#x2714;"
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
              <div className="nicdark_space20"/>
              <div
                style={
                  {
                    textAlign: 'center'
                  }
                }
              >
                <h2 className="subtitle greydark">ACTUALIZACIÓN DE PAQUETES</h2>
              </div>
              <div className="nicdark_space40"/>
              <ul className="undecored-list">
              {this.state.listaPaquetes}
              </ul>
            </div>
          }
        </div>
      </section>
    );

  }

}

export default ActualizarPaquete;
