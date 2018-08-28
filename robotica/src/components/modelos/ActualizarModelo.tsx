import * as React from 'react';
import FormInput from '../general/FormInput';
import FormTextArea from '../general/FormTextArea';
import FormSelect from './childs/actualizar/FormSelect';
import ListElement from './childs/actualizar/ListElement';
import ModelosStore from './flux/ModelosStore';
import ModelosActions from './flux/ModelosActions';

import '../../App.css';

interface MyState {

imagen: string;
nombre: string;
descripcion: string;
paquete_nombre: string;
paquete_id: number;
listaPaquetes: string[];
listaModelos: JSX.Element[];
modeloSelected: boolean;
itemsLoaded: boolean;

}

class ActualizarModelos extends React.Component<{}, MyState> {

  private img: any;
  private nombre: any;
  private descripcion: any;

  constructor(props: any) {
    super(props);

    this.state = {
      imagen: '',
      listaPaquetes: [],
      listaModelos: [],
      modeloSelected: false,
      descripcion: '',
      nombre: '',
      paquete_nombre: '',
      paquete_id: 0,
      itemsLoaded: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.renderModelo = this.renderModelo.bind(this);
    this.listarPaquetes = this.listarPaquetes.bind(this);
    this.listarModelos = this.listarModelos.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.volver = this.volver.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  componentWillMount() {
    ModelosStore.wakeUp();
    ModelosStore.addChangeListener('STORE_LOAD_PAQUETES', this.listarPaquetes);
    ModelosStore.addChangeListener('STORE_LOAD_MODELOS', this.listarModelos);
    ModelosStore.addChangeListener('STORE_LOAD_MODELO_BY_ID', this.renderModelo);
    ModelosActions.loadPaquetes();
  }

  fileOnchange(element: any) {
    if (element.target.files && element.target.files[0]) {
      var FileR = new FileReader();
      let self = this;
      FileR.addEventListener('load', function(e: any) {
        self.img.src = e.target.result;
      });
      FileR.readAsDataURL( element.target.files[0] );
    }
  }

  listarPaquetes() {
    let listaPaquetes: string [] = [];

    ModelosStore.getPaquetes().forEach(
      (paquete) => {
        listaPaquetes.push(
          paquete.nombre
        );
      }
    );

    this.setState({
      listaPaquetes: listaPaquetes
    });

    ModelosActions.loadModelos();
  }

  listarModelos() {
    let listaModelos: JSX.Element[] = [];

    ModelosStore.getModelos().forEach(
      (modelo, index) => {
        listaModelos.push(
          <ListElement
            id={modelo.id}
            key={index}
            nombre={modelo.nombre}
            handleClick={this.listElementClick}
          />
        );
      }
    );

    this.setState({
      listaModelos: listaModelos,
      itemsLoaded: true
    });

  }

  renderModelo() {
    this.setState({
      imagen: ModelosStore.getModeloSeleccionado().imagen,
      nombre: ModelosStore.getModeloSeleccionado().nombre,
      descripcion: ModelosStore.getModeloSeleccionado().descripcion,
      paquete_nombre: ModelosStore.getModeloSeleccionado().nombre_paquete,
      paquete_id: ModelosStore.getModeloSeleccionado().paqueteId,
       modeloSelected: true
    });

    this.forceUpdate();
  }

  selectOnChange(event: any) {

    this.setState({
      paquete_id: ModelosStore.getPaqueteId(event.target.value)
    });

  }

  listElementClick(id: number) {
    ModelosActions.loadModeloById(id);
  }

  volver() {
    this.setState({
      modeloSelected: false
    });
  }

  onSubmit(event: any) {

    ModelosActions.setNombre(this.nombre.getValue());
    ModelosActions.setPaqueteId(this.state.paquete_id);
    ModelosActions.setDescripcion(this.descripcion.getValue());
    ModelosActions.setImagen(this.img.src);
    ModelosActions.setId(ModelosStore.getModeloSeleccionado().id);

    ModelosStore.update();

    event.preventDefault();
    event.stopPropagation();
  }

  componentWillUnmount() {
    ModelosStore.removeChangeListener('STORE_LOAD_PAQUETES', this.listarPaquetes);
    ModelosStore.removeChangeListener('STORE_LOAD_MODELOS', this.listarModelos);
    ModelosStore.removeChangeListener('STORE_LOAD_MODELO_BY_ID', this.renderModelo);
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
          { this.state.modeloSelected ?
            <div>
              <a
                onClick={this.volver}
                className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
              >
                <i className="icon-reply-outline">&nbsp;Seleccionar modelo</i>
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
                          'nicdark_btn_icon nicdark_bg_green ' +
                          'extrabig nicdark_radius_left white nicdark_relative'
                        }
                      >
                        <i className="icon-doc-text-1"/>
                      </a>
                    </td>
                    <td>
                      <div className="grid grid_12">
                        <div className="nicdark_space40"/>
                        <h3 className="subtitle greydark">ACTUALIZACIÓN DE MODELOS</h3>
                        <div className="nicdark_space20"/>
                        <div className="nicdark_divider left small">
                          <span className="nicdark_bg_green nicdark_radius"/>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/*FIN DE ENCABEZADO*/}
              <form  onSubmit={(submit) => this.onSubmit(submit)}>
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
                      textoLabel="Nombre: "
                      length={30}
                      value={this.state.nombre}
                      ref={(nombre) => this.nombre = nombre}
                    />
                    <FormTextArea
                      maxRows={4}
                      length={150}
                      textoLabel="Descripción: "
                      value={this.state.descripcion}
                      ref={(descripcion) => this.descripcion = descripcion}
                    />
                    <FormSelect
                      onChangeHandler={this.selectOnChange}
                      options={this.state.listaPaquetes}
                      textoLabel="Paquete: "
                      paqueteActual={this.state.paquete_nombre}
                    />
                    <div
                      className="nicdark_focus nicdark_width_percentage70"
                      style={{display: 'table'}}
                    >
                      <h3 className="subtitle greydark">Imágen:</h3>
                      <div className="nicdark_space20"/>
                      <div
                        className="nicdark_focus nicdark_width_percentage40"
                        style={{display: 'table-cell', verticalAlign: 'middle'}}
                      >
                        <label htmlFor="fileInput">Subir o modificar imágen</label><br/><br/>
                        <div className="upload-btn-wrapper">
                          <button className="btn">
                            <i className="icon-upload">Seleccionar</i>
                          </button>
                          <input
                            id="fileInput"
                            name="fileInput"
                            type="file"
                            className="fileInput"
                            onChange={(file) => this.fileOnchange(file)}
                            required={true}
                          />
                        </div>
                      </div>
                      <div
                        className="nicdark_focus nicdark_width_percentage50"
                        style={{display: 'table-cell', verticalAlign: 'middle'}}
                      >
                        <img
                          className="modelo-img-preview nicdark_width_percentage80"
                          src={'data:image/jpg;base64,' + this.state.imagen}
                          height="auto"
                          ref={(img) => this.img = img}
                        />
                      </div>
                    </div>
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <div className="nicdark_space20"/>
                      <div className="nicdark_focus nicdark_width_percentage40">
                        <input
                          type="Submit"
                          defaultValue="ACTUALIZAR&nbsp;&#x2714;"
                          className={
                            'nicdark_btn fullwidth nicdark_bg_green medium ' +
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
              <h2 className="subtitle greydark">ACTUALIZACIÓN DE MODELOS</h2>
              </div>
              <div className="nicdark_space40"/>
              <ul className="undecored-list">
                {this.state.listaModelos}
              </ul>
            </div>
          }
        </div>
      </section>
    );
  }

}

export default ActualizarModelos;
