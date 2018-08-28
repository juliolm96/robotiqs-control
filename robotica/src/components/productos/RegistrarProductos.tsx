import * as React from 'react';
import FormInput from '../general/FormInput';
import ProductosStore from './flux/ProductosStore';
import ProductosActions from './flux/ProductosActions';

import '../../App.css';

interface MyState {

  imagen: string;
  concepto: string;
  precio: number;
  existencias: number;

}

class RegistrarProductos extends React.Component<{}, MyState> {

  private img: any;
  private concepto: any;
  private precio: any;
  private existencias: any;

  constructor(props: any) {
    super(props);

    this.state = {
      imagen: '',
      concepto: '',
      existencias: 0,
      precio: 0
    };

  }

  componentWillMount() {
    ProductosStore.wakeUp();
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

  onSubmit(event: any) {

    ProductosActions.setImagen(this.img.src);
    ProductosActions.setConcepto(this.concepto.getValue());
    ProductosActions.setPrecio(this.precio.getValue());
    ProductosActions.setExistencias(this.existencias.getValue());

    ProductosActions.submit();

    event.preventDefault();
    event.stopPropagation();

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
                      'nicdark_btn_icon nicdark_bg_bluedark ' +
                      'extrabig nicdark_radius_left white nicdark_relative'
                    }
                  >
                    <i className="icon-pencil-2"/>
                  </a>
                </td>
                <td>
                  <div className="grid grid_12">
                    <div className="nicdark_space40"/>
                    <h3 className="subtitle greydark">REGISTRO DE PRODUCTOS</h3>
                    <div className="nicdark_space20"/>
                    <div className="nicdark_divider left small">
                      <span className="nicdark_bg_bluedark nicdark_radius"/>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/*FIN DE ENCABEZADO*/}
          <form onSubmit={(submit) => this.onSubmit(submit)}  >
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
                  <h3 className="subtitle greydark">Imágen:</h3>
                  <div className="nicdark_space20"/>
                  <div
                    className="nicdark_focus nicdark_width_percentage40"
                    style={{display: 'table-cell', verticalAlign: 'middle'}}
                  >
                    <label htmlFor="fileInput">Subir una imágen</label><br/><br/>
                    <div className="upload-btn-wrapper">
                      <button className="btn3">
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
                      src={this.state.imagen}
                      height="auto"
                      ref={(img) => this.img = img}
                    />
                  </div>
                </div>
                <div  className="nicdark_focus nicdark_width_percentage70">
                  <hr className="stylished nicdark_bg_bluedark"/>
                </div>
                <br/>
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
                  textoLabel="Existencias: "
                  value="0"
                  ref={(existencias) => this.existencias = existencias}
                />
                <div className="nicdark_focus nicdark_width_percentage40">
                  <div className="nicdark_space20"/>
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <input
                      type="Submit"
                      defaultValue="REGISTRAR&nbsp;✎"
                      className={
                        'nicdark_btn fullwidth nicdark_bg_bluedark medium ' +
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

export default RegistrarProductos;
