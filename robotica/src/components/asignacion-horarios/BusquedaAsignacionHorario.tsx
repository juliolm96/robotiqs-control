import * as React from 'react';
import AsignacionHorarioActions from './flux/AsignacionHorarioActions';
import FormInput from '../general/FormInput';
import AsignacionHorarioStore from './flux/AsignacionHorarioStore';
import * as Interfaces from '../.././constantes/Interfaces';

import '../../App.css';

interface MyState {
  consultaPorSocio: Interfaces.AsignacionHorarioVista[];
}

class BusquedaAsignacionHorario  extends React.Component<{}, MyState> {

  private numSocio: any;

  constructor(props: any) {
    super(props);
    this.state = {
      consultaPorSocio: []
    };

    this.loadConsultaPorSocio = this.loadConsultaPorSocio.bind(this);
    this.onSearchSocio = this.onSearchSocio.bind(this);
    AsignacionHorarioStore.wakeUp();
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onDeleteRows = this.onDeleteRows.bind(this);
    this.onChangeDeleteRows = this.onChangeDeleteRows.bind(this);
  }

  componentWillMount() {
    AsignacionHorarioStore.addChangeListener('STORE_LISTAR_ASIGNACIONES_HORARIO_POR_SOCIO', this.loadConsultaPorSocio);
  }

  onSearchSocio(event: any) {
    AsignacionHorarioActions.consultarHorariosPorSocio(this.numSocio.getValue());
  }

  onDeleteRow(e: any) {
    AsignacionHorarioActions.eliminarElementoAH(e.target.value);
  }

  onChangeDeleteRows(e: any) {
    if (e.target.checked) {
      AsignacionHorarioActions.pushAH(e.target.value);
    } else {
      AsignacionHorarioActions.removeAH(e.target.value);
    }
  }

  onDeleteRows(e: any) {
    AsignacionHorarioActions.eliminarElementosAH();
  }

  loadConsultaPorSocio() {
      let asignaciones: Interfaces.AsignacionHorarioVista[] = AsignacionHorarioStore.getListadoAsignacionesHorario();
      if (asignaciones.length === 0) {
        alert('EL socio no cuenta con asignacio de horarios');
      }
      let _consultaPorSocio: any[] = [];

      for (var i = 0; i < asignaciones.length; i++) {

        _consultaPorSocio.push((
         <tr key={i}>
         <td><input type="checkbox" value={asignaciones[i].id} onChange={this.onChangeDeleteRows} /></td>
         <td><button type="button" value={asignaciones[i].id} onClick={(e) => this.onDeleteRow(e)}>X</button></td>
         <td>{asignaciones[i].dia}</td>
         <td>{asignaciones[i].hora_inicial}</td>
         <td>{asignaciones[i].hora_final}</td>
         </tr>
       ));
      }

      this.setState({
        consultaPorSocio: _consultaPorSocio
      });
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
                      <h3 className="subtitle greydark">BUSQUEDA DE ASIGNACIONES</h3>
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
                  />
                  <a
                    onClick={this.onSearchSocio}
                    className={
                      'nicdark_btn nicdark_bg_green medium lily-right-button ' +
                      'nicdark_shadow nicdark_radius white'
                    }
                  >
                    <i className="icon-search"/>
                  </a>
                </div>

                <table className="nicdark_focus nicdark_width_percentage70">
                  <thead>
                    <tr>
                      <td>Marcar</td>
                      <td/>
                      <td>Día</td>
                      <td>Hora inicio</td>
                      <td>Hora fin</td>
                    </tr>
                  </thead>
                  <tbody>
                     {this.state.consultaPorSocio}
                  </tbody>
                </table>
                <div className="nicdark_focus nicdark_width_percentage40">
                  <div className="nicdark_space20"/>
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <a
                      onClick={this.onDeleteRows}
                      className={
                        'nicdark_btn nicdark_bg_green medium ' +
                        'nicdark_shadow nicdark_radius white nicdark_press'
                      }
                    >
                      Eliminar&nbsp;&#x2717;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
}

export default BusquedaAsignacionHorario;
