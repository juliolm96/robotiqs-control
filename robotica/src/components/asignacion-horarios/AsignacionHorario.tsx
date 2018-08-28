import * as React from 'react';
import AsignacionHorarioActions from './flux/AsignacionHorarioActions';
import FormInput from '../general/FormInput';
import FormSelect0 from './childs/registrar/FormSelect0';
import FormSelect from './childs/registrar/FormSelect';
import HorarioServicioStore from '.././horarios_servicios/flux/HorarioServicioStore';
import AsignacionHorarioStore from './flux/AsignacionHorarioStore';
import * as Interfaces from '../.././constantes/Interfaces';

import '../../App.css';

interface MyState {
  listHS: Interfaces.HorarioServicio[];
  optionsDias: string[];
  optionsHH:  {'label': string, 'value': number}[];
  disabled: boolean;
}

class AsignacionHorario  extends React.Component<{}, MyState> {

  private numSocio: any;

  constructor(props: any) {
    
    super(props);
    this.state = {
      listHS: [],
      optionsDias: ['LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO', 'DOMINGO'],
      optionsHH: [],
      disabled: true
    };

    // this.loadHS = this.loadHS.bind(this);
    AsignacionHorarioStore.wakeUp();
    this.onSubmit = this.onSubmit.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.loadSocio = this.loadSocio.bind(this);
    this.onBuscar = this.onBuscar.bind(this);
  }

  componentWillMount() {
    HorarioServicioStore.addChangeListener('STORE_FILL_HS', this.loadOptions);
    AsignacionHorarioStore.addChangeListener('STORE_SOCIO_ENCONTRADO', this.loadSocio);
    AsignacionHorarioStore.addChangeListener('STORE_LIMPIAR_SOCIO_ENCONTRADO', this.loadSocio);
  }

  loadSocio() {
    let _socio: Interfaces.SocioVista = AsignacionHorarioStore.getSocioEncontrado();
    if (_socio.id !== 0) {
      this.setState({
        disabled: false
      });
    } else if (_socio.id === 0) {
      this.setState({
        disabled: true
      });
    }

    this.forceUpdate();
  }

  loadOptions() {

    let _hs: Interfaces.HorarioServicioVista[] = HorarioServicioStore.getfillHS();
    // Se declara otra variable para ingresarle los nombres de las escuelas
    // en un siguiente paso
    let hh: {'label': string, 'value': number}[] = [];

    _hs.forEach((hs, index) => {
      if (hs.disponible !== 0) {
      hh.push({'label': hs.hora_inicial + ' - ' + hs.hora_final + ' - ' +
               'disponible(' + hs.disponible + ')', 'value': hs.id});
    } else {
      hh.push({'label': hs.hora_inicial + ' - ' + hs.hora_final + ' - ' + 'agotado', 'value': hs.id});
    }
    });

    this.setState({
      optionsHH: hh
    });

    this.forceUpdate();
  }

  onSubmit (event: any) {
      AsignacionHorarioActions.registrarAsignacionHorario();
      event.preventDefault();
      event.stopPropagation();
  }

  onBuscar (event: any) {
    if (!(this.numSocio.getValue() === '')) {
      AsignacionHorarioActions.buscarSocioPorNumero(this.numSocio.getValue());
    } else {
      alert('Debe ingresar un numero de socio\n ' +
      'Para poder verificar si existe');
    }
  }

  render() {
      return (
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
                      <h3 className="subtitle greydark">ASIGNACIÓN DE HORARIOS</h3>
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
                  <div
                    className="nicdark_width_percentage100"
                    style={{display: 'block'}}
                  >
                    <FormInput
                     ref={(numSocio) => this.numSocio = numSocio}
                     inputType="number"
                     textoLabel="Número de socio"
                     isRequired={true}
                    />
                    <a
                      onClick={this.onBuscar}
                      className={
                        'nicdark_btn nicdark_bg_green medium lily-right-button ' +
                        'nicdark_shadow nicdark_radius white'
                      }
                    >
                      &#x2714;
                    </a>
                  </div>
                  <FormSelect0
                    textoLabel="Dia: "
                    options={this.state.optionsDias}
                    name="optionsDias"
                    disabled={this.state.disabled}
                  />
                  <FormSelect
                    textoLabel="Horario: "
                    options={this.state.optionsHH}
                    name="optionshh"
                    disabled={this.state.disabled}
                  />
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

export default AsignacionHorario;
