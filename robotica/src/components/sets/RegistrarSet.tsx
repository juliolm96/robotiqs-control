import * as React from 'react';
import FormInput from '../general/FormInput';
import FormTextArea from '../general/FormTextArea';
import SetsActions from './flux/SetsActions';
import SetsStore from './flux/SetsStore';

class RegistrarSet extends React.Component<{}> {

  private nombre: any;
  private numero: any;
  private descripcion: any;

  constructor(props: any) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    SetsStore.wakeUp();
  }

  onSubmit(event: any) {

    event.preventDefault();
    SetsActions.setNombre(this.nombre.getValue());
    SetsActions.setNumero(this.numero.getValue());
    SetsActions.setDescripcion(this.descripcion.getValue());
    SetsActions.submitSet();

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
                      'nicdark_btn_icon nicdark_bg_yellow ' +
                      'extrabig nicdark_radius_left white nicdark_relative'
                    }
                  >
                    <i className="icon-pencil-2"/>
                  </a>
                </td>
                <td>
                  <div className="grid grid_12">
                    <div className="nicdark_space40"/>
                    <h3 className="subtitle greydark">REGISTRO DE SETS</h3>
                    <div className="nicdark_space20"/>
                    <div className="nicdark_divider left small">
                      <span className="nicdark_bg_yellow nicdark_radius"/>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/*FIN DE ENCABEZADO*/}
          <form
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
                  ref={(nombre) => this.nombre = nombre}
                  inputType="text"
                  length={50}
                  textoLabel="Nombre: "
                  isRequired={true}
                />
                <FormInput
                  ref={(numero) => this.numero = numero}
                  textoLabel="Número: "
                  length={5}
                  inputType="text"
                  isRequired={true}
                />
                <FormTextArea
                  ref={(descripcion) => this.descripcion = descripcion}
                  textoLabel="Descripción"
                  length={150}
                  maxRows={3}
                />
                <div className="nicdark_focus nicdark_width_percentage40">
                  <div className="nicdark_space20"/>
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <input
                      type="Submit"
                      defaultValue="REGISTRAR&nbsp;✎"
                      className={
                        'nicdark_btn fullwidth nicdark_bg_yellow medium ' +
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

export default RegistrarSet;
