import * as React from 'react';
import HorarioServicioActions from './flux/HorarioServicioActions';
import FormInput from '../general/FormInput';
import FormSelect from './childs/registrar/FormSelect';
import ModalActualizarHS from './ModalActualizarHS';
import HorarioServicioStore from './flux/HorarioServicioStore';
import * as Interfaces from '../.././constantes/Interfaces';

import '../../App.css';

interface MyState {
  listHS: Interfaces.HorarioServicio[];
  optionsDias: {'label': string, 'value': string}[];
  diaM: string;
  hora_inicialM: string;
  hora_finalM: string;
  capacidadM: number;
  idM: number;
}

class HorarioServicio  extends React.Component<{}, MyState> {
    private hi: any;
    private hf: any;
    private capacidad: any;

  constructor(props: any) {
    super(props);
    this.state = {
      listHS: [],
      optionsDias: [{'label': 'LUNES', 'value': 'LU'},
                    {'label': 'MARTES', 'value': 'MA'},
                    {'label': 'MIÉRCOLES', 'value': 'MI'},
                    {'label': 'JUEVES', 'value': 'JU'},
                    {'label': 'VIERNES', 'value': 'VI'},
                    {'label': 'SÁBADO', 'value': 'SA'},
                    {'label': 'DOMINGO', 'value': 'DO'}],
      diaM: '',
      hora_inicialM: '',
      hora_finalM: '',
      capacidadM: 0,
      idM: 0
    };

    this.loadHS = this.loadHS.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onDeleteRows = this.onDeleteRows.bind(this);
    this.onChangeDeleteRows = this.onChangeDeleteRows.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.SendValuesModal = this.SendValuesModal.bind(this);
    this.onBuscarHorario = this.onBuscarHorario.bind(this);
    HorarioServicioStore.wakeUp();
  }

  componentWillMount() {
    HorarioServicioStore.addChangeListener('STORE_LISTAR_HS', this.loadHS);
    HorarioServicioStore.addChangeListener('STORE_HS_ENCONTRADO', this.SendValuesModal);
    HorarioServicioStore.addChangeListener('STORE_LIMPIAR_ENCONTRADO', this.SendValuesModal);
    HorarioServicioActions.ListarHorariosServicio();
  }

  onSubmit (event: any) {
    if (this.hi.value === '' || this.hf.value === '') {
       alert('Ingresa am o pm');
    }
    HorarioServicioActions.setHI(this.hi.value);
    HorarioServicioActions.setHF(this.hf.value);
    HorarioServicioActions.setCapacidad(this.capacidad.getValue());
    HorarioServicioActions.registrarHorarioServicio();
  }

  validarDia(dia: string): string {
    if (dia.toUpperCase() === 'LUNES') {
      dia = 'LU';
    } else

    if (dia.toUpperCase() === 'MARTES') {
      dia = 'MA';
    } else

    if (dia.toUpperCase() === 'MIÉRCOLES' || dia.toUpperCase() === 'MIERCOLES') {
      dia = 'MI';
    } else

    if (dia.toUpperCase() === 'JUEVES') {
      dia = 'JU';
    } else

    if (dia.toUpperCase() === 'VIERNES') {
      dia = 'VI';
    } else

    if (dia.toUpperCase() === 'SÁBADO' || dia.toUpperCase() === 'SABADO') {
      dia = 'SA';
    } else

    if (dia.toUpperCase() === 'DOMINGO') {
      dia = 'DO';
    }
    return dia;
  }

  onDeleteRow(e: any) {
    HorarioServicioActions.eliminarElementoHS(e.target.value);
  }

  onChangeDeleteRows(e: any) {
    if (e.target.checked) {
      HorarioServicioActions.pushHS(e.target.value);
    } else {
    HorarioServicioActions.removeHS(e.target.value);
    }
  }

  onDeleteRows(e: any) {
    HorarioServicioActions.eliminarElementosHS();
  }

  onBuscarHorario(e: any) {
    HorarioServicioActions.buscarHS(e.target.value);
    window.location.href = '#modal-hs';
  }

  SendValuesModal() {
    let _hs: Interfaces.HorarioServicioVista = HorarioServicioStore.gethsEncontrado();

    let _dia: string = this.validarDia(_hs.dia);

    this.setState({
      diaM: _dia,
      hora_inicialM: _hs.hora_inicial.substring(0, 5),
      hora_finalM: _hs.hora_final.substring(0, 5),
      capacidadM: _hs.capacidad,
      idM: _hs.id
    });
  }

  componentWillUnmount() {
    HorarioServicioStore.removeChangeListener('STORE_LISTAR_HS', this.loadHS);
    HorarioServicioStore.removeChangeListener('STORE_HS_ENCONTRADO', this.SendValuesModal);
    HorarioServicioStore.removeChangeListener('STORE_LIMPIAR_ENCONTRADO', this.SendValuesModal);
  }

  loadHS() {

      let _hs: Interfaces.HorarioServicioVista[] = HorarioServicioStore.getListadoHS();
      let _listHS: any[] = [];

      for (var i = 0; i < _hs.length; i++) {

         _listHS.push((
          <div
            className="nicdark_width_percentage90 nicdark_focus"
            key={i}
          >
            <div className="nicdark_width_percentage30">
              <h3 className="subtitle greydark"><b>Día:&nbsp;</b>{_hs[i].dia}</h3>
            </div>
            <br/>
            <div className="nicdark_width_percentage30">
              <h3 className="subtitle greydark"><b>Hora inicial:&nbsp;</b>{_hs[i].hora_inicial}</h3>
            </div>
            <br/>
            <div className="nicdark_width_percentage30">
              <h3 className="subtitle greydark"><b>Hora final:&nbsp;</b>{_hs[i].hora_final}</h3>
            </div>
            <br/>
            <div className="nicdark_width_percentage30">
              <h3 className="subtitle greydark"><b>Capacidad:&nbsp;</b>{_hs[i].capacidad}</h3>
            </div>
            <br/>
            <div className="nicdark_width_percentage30">
              <h3 className="subtitle greydark"><b>Disponible:&nbsp;</b>{_hs[i].disponible}</h3>
            </div>
            <div className="nicdark_space10"/>
            <div className="nicdark_width_percentage50">
              <i className="subtitle greydark" style={{fontSize: '1.2em'}}>Marcar: </i>
              <input
                type="checkbox"
                style={{transform: 'scale(1.8)'}}
                value={_hs[i].id}
                onChange={this.onChangeDeleteRows}
              />
              &ensp;
              <button
                value={_hs[i].id}
                onClick={(e) => this.onDeleteRow(e)}
                className={
                  'nicdark_btn nicdark_bg_red small ' +
                  'nicdark_shadow nicdark_radius white nicdark_press '
                }
                style={{color: 'white'}}
              >
                Borrar
              </button>
              &ensp;
              <button
                type="button"
                value={_hs[i].id}
                onClick={(e) => this.onBuscarHorario(e)}
                style={{color: 'white'}}
                className={
                  'nicdark_btn nicdark_bg_green small ' +
                  'nicdark_shadow nicdark_radius white nicdark_press '
                }
              >
                Editar
              </button>
            </div>
            <div className="nicdark_width_percentage90">
              <hr className="stylished nicdark_bg_blue"/>
            </div>
            <div className="nicdark nicdark_width_percentage90">
              <div className="nicdark_space20"/>
            </div>
          </div>
        ));
      }

      this.setState({
        listHS: _listHS
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
                        'nicdark_btn_icon nicdark_bg_blue ' +
                        'extrabig nicdark_radius_left white nicdark_relative'
                      }
                    >
                      <i className="icon-pencil-2"/>
                    </a>
                  </td>
                  <td>
                    <div className="grid grid_12">
                      <div className="nicdark_space40"/>
                      <h3 className="subtitle greydark">REGISTRO DE HORARIOS DE SERVICIO</h3>
                      <div className="nicdark_space20"/>
                      <div className="nicdark_divider left small">
                        <span className="nicdark_bg_blue nicdark_radius"/>
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
                <div className="nicdark_width_percentage90">
                  <i className="subtitle grey" style={{fontSize: '1.7em'}}>
                    ADMINISTRAR HORARIOS CREADOS
                  </i>
                </div>
                <div className="nicdark_width_percentage80">
                  <hr className="stylished nicdark_bg_blue"/>
                </div>
                <div className="fullwidth">
                  {this.state.listHS}
                </div>
                <div className="nicdark_space10"/>
                <div className="nicdark_width_percentage90">
                  <i className="subtitle grey" style={{fontSize: '1.2em'}}>
                    Eliminar Marcados&ensp;
                  </i>
                  <a
                    type="button"
                    onClick={this.onDeleteRows}
                    className={
                      'nicdark_btn fullwidth nicdark_bg_red small ' +
                      'nicdark_shadow nicdark_radius white nicdark_press '
                    }
                    style={{width: '2.5em', height: '1.2em'}}
                  >
                    <i>&#x2718;</i>
                  </a>
                </div>
                <div className="nicdark_space20"/>
                <FormSelect
                  textoLabel="Dia: "
                  options={this.state.optionsDias}
                  name="optionsDias"
                />
                <div className="nicdark_focus nicdark_width_percentage70">
                    <div className="nicdark_space20"/>
                    <h3 className="subtitle greydark">Hora de inicio:</h3>
                    <div className="nicdark_space10"/>
                </div>
                <br/>
                <input
                  type="time"
                  required={true}
                  className="nicdark_bg_grey2 nicdark_radius nicdark_shadow"
                  style={{width: '70%', fontSize: '1.7em', color: 'grey'}}
                  ref={(hi) => this.hi = hi}
                />
                <div className="nicdark_space20"/>
                <div className="nicdark_focus nicdark_width_percentage70">
                    <div className="nicdark_space20"/>
                    <h3 className="subtitle greydark">Hora terminación:</h3>
                    <div className="nicdark_space10"/>
                </div>
                <br/>
                <input
                  type="time"
                  required={true}
                  className="nicdark_bg_grey2 nicdark_radius nicdark_shadow"
                  style={{width: '70%', fontSize: '1.7em', color: 'grey'}}
                  ref={(hf) => this.hf = hf}
                />
                <div className="nicdark_space20"/>
                <FormInput
                  inputType="number"
                  textoLabel="Capacidad:"
                  ref={(capacidad) => this.capacidad = capacidad}
                />
                <div className="nicdark_width_percentage70">
                  <a
                    onClick={this.onSubmit}
                    className={
                      'nicdark_btn fullwidth nicdark_bg_green medium ' +
                      'nicdark_shadow nicdark_radius white nicdark_press ' +
                      'nicdark_width_percentage20'
                    }
                  >
                    Añadir&nbsp;&#x270E;
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div id="modal-hs">
            <ModalActualizarHS
              dia={this.state.diaM}
              hora_inicial={this.state.hora_inicialM}
              hora_final={this.state.hora_finalM}
              capacidad={this.state.capacidadM}
              id={this.state.idM}
            />
          </div>
        </section>
      );
    }
}

export default HorarioServicio;
