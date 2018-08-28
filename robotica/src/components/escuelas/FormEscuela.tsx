import * as React from 'react';
import FormInput from '../general/FormInput';
// import FormBoton from '../general/FormButton';
import '../../styles/Escuela.css';
import EscuelaStore from './flux/EscuelaStore';
import EscuelaActions from './flux/EscuelaActions';
// import * as Interfaces from '../../interfaces/Interfaces';

class FormEscuela extends React.Component<{}, {}> {
    private clave: any;
    private nombre: any;

    constructor(props: any) {
      super(props);
      this.onSubmit = this.onSubmit.bind(this);
      EscuelaStore.wakeUp();
    }

    onSubmit (event: any) {

      EscuelaActions.setClave(this.clave.getValue());
      EscuelaActions.setNombre(this.nombre.getValue());
      EscuelaActions.registrarEscuela();

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
                      <h3 className="subtitle greydark">REGISTRO DE ESCUELAS</h3>
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
            <form onSubmit={(submit) => this.onSubmit(submit)}>
              <div className="nicdark_textevidence">
                <div
                  className={
                    'nicdark_margin1820 nicdark_marginleft100 nicdark_width_percentage100 ' +
                    'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
                  }
                >
                  <FormInput
                   ref={(clave) => this.clave = clave}
                   textoLabel="Clave: "
                   inputType="text"
                  />
                  <FormInput
                   ref={(nombre) => this.nombre = nombre}
                   textoLabel="Nombre: "
                   inputType="text"
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

export default FormEscuela;
