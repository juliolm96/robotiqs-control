import * as React from 'react';
import ConstruccionActions from './flux/ConstruccionActions';
import ConstruccionStore from './flux/ConstruccionStore';
import FormInput from '../general/FormInput';
import FormSelect from './childs/registrar/FormSelect';

import '../../App.css';

interface MyState {
  material: string;
  instruccion: string;
  ensamblado: string;
  listaModelos: string[];
  modeloId: number;
}

class RegPasoConstruccion extends React.Component<{}, MyState> {

  private imgMaterial: any;
  private imgInstruccion: any;
  private imgEnsamblado: any;
  private numero: any;

  constructor(props: any) {
    super(props);
    this.state = {
      ensamblado: '',
      material: '',
      instruccion: '',
      listaModelos: [],
      modeloId: 0
    };

    this.loadModelos = this.loadModelos.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  componentWillMount() {

    ConstruccionStore.addChangeListener('STORE_LOAD_MODELOS', this.loadModelos);
    ConstruccionActions.loadModelos();

  }

  loadModelos() {

    let modelos: string[] = [];

    ConstruccionStore.getModelos().forEach(
      (modelo, index) => {
        modelos.push(modelo.nombre);
      }
    );

    this.setState({
      listaModelos: modelos
    });

    this.forceUpdate();
  }

  selectOnChange(event: any) {
    this.setState({
      modeloId: ConstruccionStore.getModeloId(event.target.value)
    });
  }

  materialOnchange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var FileR = new FileReader();
      let self = this;
      FileR.addEventListener('load', function(e: any) {
        self.imgMaterial.src = e.target.result;
      });
      FileR.readAsDataURL( event.target.files[0] );
    }
  }

  instruccionOnchange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var FileR = new FileReader();
      let self = this;
      FileR.addEventListener('load', function(e: any) {
        self.imgInstruccion.src = e.target.result;
      });
      FileR.readAsDataURL( event.target.files[0] );
    }
  }

  ensambladoOnchange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var FileR = new FileReader();
      let self = this;
      FileR.addEventListener('load', function(e: any) {
        self.imgEnsamblado.src = e.target.result;
      });
      FileR.readAsDataURL( event.target.files[0] );
    }
  }

  onSubmit(event: any) {

    ConstruccionActions.setNumero(this.numero.getValue());
    ConstruccionActions.setMaterial(this.imgMaterial.src);
    ConstruccionActions.setModeloId(this.state.modeloId);
    ConstruccionActions.setEnsamblado(this.imgEnsamblado.src);
    ConstruccionActions.setInstruccion(this.imgInstruccion.src);

    ConstruccionActions.submit();

    event.preventDefault();
    event.stopPropagation();
  }

  componentWillUnmount() {
    ConstruccionStore.addChangeListener('STORE_LOAD_MODELOS', this.loadModelos);
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
                      'nicdark_btn_icon nicdark_bg_orange ' +
                      'extrabig nicdark_radius_left white nicdark_relative'
                    }
                  >
                    <i className="icon-cog"/>
                  </a>
                </td>
                <td>
                  <div className="grid grid_12">
                    <div className="nicdark_space40"/>
                    <h3 className="subtitle greydark">REGISTRAR PASO DE CONSTRUCCION</h3>
                    <div className="nicdark_space20"/>
                    <div className="nicdark_divider left small">
                      <span className="nicdark_bg_orange nicdark_radius"/>
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
                <div
                  className="nicdark_focus nicdark_width_percentage70"
                  style={{display: 'table'}}
                >
                  <h3 className="subtitle greydark">Material:</h3>
                  <div className="nicdark_space20"/>
                  <div
                    className="nicdark_focus nicdark_width_percentage40"
                    style={{display: 'table-cell', verticalAlign: 'middle'}}
                  >
                    <label htmlFor="fileInput">Subir imágen</label><br/><br/>
                    <div className="upload-btn-wrapper">
                      <button className="btn2">
                        <i className="icon-upload">Seleccionar</i>
                      </button>
                      <input
                        id="fileInput"
                        name="fileInput"
                        type="file"
                        className="fileInput"
                        onChange={(file) => this.materialOnchange(file)}
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
                      src={this.state.material}
                      height="auto"
                      ref={(img) => this.imgMaterial = img}
                    />
                  </div>
                </div>
                <div  className="nicdark_focus nicdark_width_percentage70">
                  <hr className="stylished nicdark_bg_orange"/>
                </div>
                <div className="divDeInstruccion">

                  <div
                    className="nicdark_focus nicdark_width_percentage70"
                    style={{display: 'table'}}
                  >
                    <h3 className="subtitle greydark">Instrucción:</h3>
                    <div className="nicdark_space20"/>
                    <div
                      className="nicdark_focus nicdark_width_percentage40"
                      style={{display: 'table-cell', verticalAlign: 'middle'}}
                    >
                      <label htmlFor="fileInput">Subir imágen</label><br/><br/>
                      <div className="upload-btn-wrapper">
                        <button className="btn2">
                          <i className="icon-upload">Seleccionar</i>
                        </button>
                        <input
                          id="fileInput"
                          name="fileInput"
                          type="file"
                          className="fileInput"
                          onChange={(file) => this.instruccionOnchange(file)}
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
                        src={this.state.instruccion}
                        height="auto"
                        ref={(img) => this.imgInstruccion = img}
                      />
                    </div>
                  </div>
                </div>
                <div  className="nicdark_focus nicdark_width_percentage70">
                  <hr className="stylished nicdark_bg_orange"/>
                </div>
                <div
                  className="nicdark_focus nicdark_width_percentage70"
                  style={{display: 'table'}}
                >
                  <h3 className="subtitle greydark">Ensamblado:</h3>
                  <div className="nicdark_space20"/>
                  <div
                    className="nicdark_focus nicdark_width_percentage40"
                    style={{display: 'table-cell', verticalAlign: 'middle'}}
                  >
                    <label htmlFor="fileInput">Subir imágen</label><br/><br/>
                    <div className="upload-btn-wrapper">
                      <button className="btn2">
                        <i className="icon-upload">Seleccionar</i>
                      </button>
                      <input
                        id="fileInput"
                        name="fileInput"
                        type="file"
                        className="fileInput"
                        onChange={(file) => this.ensambladoOnchange(file)}
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
                      src={this.state.ensamblado}
                      height="auto"
                      ref={(img) => this.imgEnsamblado = img}
                    />
                  </div>
                </div>
                <div  className="nicdark_focus nicdark_width_percentage70">
                  <hr className="stylished nicdark_bg_orange"/>
                </div>
                <FormInput
                  inputType="number"
                  isRequired={true}
                  textoLabel="Numero: "
                  length={30}
                  ref={(numero) => this.numero = numero}
                />
                <FormSelect
                  onChangeHandler={this.selectOnChange}
                  options={this.state.listaModelos}
                  textoLabel="Modelo: "
                />
                <div className="nicdark_focus nicdark_width_percentage40">
                  <div className="nicdark_space20"/>
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <input
                      type="Submit"
                      defaultValue="REGISTRAR&nbsp;✎"
                      className={
                        'nicdark_btn fullwidth nicdark_bg_orange medium ' +
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

export default RegPasoConstruccion;
