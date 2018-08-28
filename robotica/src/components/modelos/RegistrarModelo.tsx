import * as React from 'react';
import FormInput from '../general/FormInput';
import FormTextArea from '../general/FormTextArea';
import FormSelect from './childs/registrar/FormSelect';
import ModelosActions from './flux/ModelosActions';
import ModelosStore from './flux/ModelosStore';
import '../../App.css';

interface MyState {
  image: string;
  listaPaquetes: string[];
  paqueteId: number;
}

class RegistrarModelo extends React.Component<{}, MyState> {

  private img: any;
  private nombre: any;
  private descripcion: any;

  constructor(props: any) {
    super(props);

    this.state = {
      image: '',
      listaPaquetes: [],
      paqueteId: 0
    };

    this.fileOnchange = this.fileOnchange.bind(this);
    this.renderPaquetes = this.renderPaquetes.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  componentWillMount() {

    ModelosStore.wakeUp();
    ModelosStore.addChangeListener('STORE_LOAD_PAQUETES', this.renderPaquetes);
    ModelosActions.loadPaquetes();
  }

  // Recibe un evento
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

  renderPaquetes() {
    let paquetes: string[] = [];
    ModelosStore.getPaquetes().forEach(
      (paquete) => {
        paquetes.push(paquete.nombre);
      }
    );
    this.setState({
      listaPaquetes: paquetes
    });

    this.forceUpdate();

  }

  selectOnChange(event: any) {
    this.setState({
      paqueteId: ModelosStore.getPaqueteId(event.target.value)
    });
  }

  onSubmit(event: any) {

    ModelosActions.setNombre(this.nombre.getValue());
    ModelosActions.setDescripcion(this.descripcion.getValue());
    ModelosActions.setImagen(this.img.src);
    ModelosActions.setPaqueteId(this.state.paqueteId);

    ModelosStore.submit();

    event.preventDefault();
    event.stopPropagation();
  }

  componentWillUnmount() {
    ModelosStore.removeChangeListener('STORE_LOAD_PAQUETES', this.renderPaquetes);
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
                      'nicdark_btn_icon nicdark_bg_green ' +
                      'extrabig nicdark_radius_left white nicdark_relative'
                    }
                  >
                    <i className="icon-pencil-2"/>
                  </a>
                </td>
                <td>
                  <div className="grid grid_12">
                    <div className="nicdark_space40"/>
                    <h3 className="subtitle greydark">REGISTRO DE MODELOS</h3>
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
                  textoLabel="Nombre: "
                  length={30}
                  ref={(nombre) => this.nombre = nombre}
                />
                <FormTextArea
                  maxRows={4}
                  length={150}
                  textoLabel="Descripción: "
                  ref={(descripcion) => this.descripcion = descripcion}
                />
                <FormSelect
                  onChangeHandler={this.selectOnChange}
                  options={this.state.listaPaquetes}
                  textoLabel="Paquete: "
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
                    <label htmlFor="fileInput">Subir una imágen</label><br/><br/>
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
                      src={this.state.image}
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
                      defaultValue="REGISTRAR&nbsp;✎"
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
      </section>
    );
  }
}

export default RegistrarModelo;
