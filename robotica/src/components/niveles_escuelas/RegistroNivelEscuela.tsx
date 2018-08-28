import * as React from 'react';
import NivelEscuelaActions from './flux/NivelEscuelaActions';
import NivelEscuelaStore from './flux/NivelEscuelaStore';
import * as Interfaces from '../.././constantes/Interfaces';
import FormSelect from './childs/registrar/FormSelect';

const _K = 'K';
const _P = 'P';
const _S = 'S';
const _B = 'B';
const _U = 'U';

let _arrayStates: object = {};

interface MyState {
  optionsES: Interfaces.Escuela[];
  tds: JSX.Element[];
  k: boolean; p: boolean; s: boolean; b: boolean; u: boolean;
}

class RegistroNivelEscuela  extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      optionsES: [],
      tds: [],
      k: false, p: false, s: false, b: false, u: false
    };
    this.loadEscuelas = this.loadEscuelas.bind(this);
    this.loadNivelesPorEscuela = this.loadNivelesPorEscuela.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeK = this.onChangeK.bind(this);
    this.onChangeP = this.onChangeP.bind(this);
    this.onChangeS = this.onChangeS.bind(this);
    this.onChangeB = this.onChangeB.bind(this);
    this.onChangeU = this.onChangeU.bind(this);
  }

  onSubmit(event: any) {
    console.warn(event);
    NivelEscuelaActions.registrarNivelesEscuela();
  }

  onChangeK(event: any) {
    this.setState({
      k: event.target.checked
    });
    if (_arrayStates[_K] !== event.target.checked) {
      NivelEscuelaActions.pushNivel('K', event.target.checked);
    } else if (event.target.checked) {
      NivelEscuelaActions.removeNivel('K', false);
    } else if (!event.target.checked) {
      NivelEscuelaActions.removeNivel('K', true);
    }
  }

  onChangeP(event: any) {
    this.setState({
      p: event.target.checked
    });
    if (_arrayStates[_P] !== event.target.checked) {
      NivelEscuelaActions.pushNivel('P', event.target.checked);
    } else if (event.target.checked) {
      NivelEscuelaActions.removeNivel('P', false);
    } else if (!event.target.checked) {
      NivelEscuelaActions.removeNivel('P', true);
    }
  }

  onChangeS(event: any) {
    this.setState({
      s: event.target.checked
    });
    if (_arrayStates[_S] !== event.target.checked) {
      NivelEscuelaActions.pushNivel('S', event.target.checked);
    } else if (event.target.checked) {
      NivelEscuelaActions.removeNivel('S', false);
    } else if (!event.target.checked) {
      NivelEscuelaActions.removeNivel('S', true);
    }
  }

  onChangeB(event: any) {
    this.setState({
      b: event.target.checked
    });
    if (_arrayStates[_B] !== event.target.checked) {
      NivelEscuelaActions.pushNivel('B', event.target.checked);
    } else if (event.target.checked) {
      NivelEscuelaActions.removeNivel('B', false);
    } else if (!event.target.checked) {
      NivelEscuelaActions.removeNivel('B', true);
    }
  }

  onChangeU(event: any) {
    this.setState({
      u: event.target.checked
    });
    if (_arrayStates[_U] !== event.target.checked) {
      NivelEscuelaActions.pushNivel('U', event.target.checked);
    } else if (event.target.checked) {
      NivelEscuelaActions.removeNivel('U', false);
    } else if (!event.target.checked) {
      NivelEscuelaActions.removeNivel('U', true);
    }
  }

  componentDidMount() {
    NivelEscuelaActions.fillEscuelas();
    NivelEscuelaStore.addChangeListener('STORE_FILL_ESCUELAS', this.loadEscuelas);
    NivelEscuelaStore.addChangeListener('STORE_FILL_NIVELES_POR_ESCUELA', this.loadNivelesPorEscuela);
  }

  componentWillUnmount() {
    NivelEscuelaStore.removeChangeListener('STORE_FILL_ESCUELAS', this.loadEscuelas);
    NivelEscuelaStore.addChangeListener('STORE_FILL_NIVELES_POR_ESCUELA', this.loadNivelesPorEscuela);
  }

  loadEscuelas() {
    let _escuelas: Interfaces.Escuela[] = NivelEscuelaStore.getEscuelas();
    let escuelas: Interfaces.Escuela[] = [];

    _escuelas.forEach( (escuela, index) => {
      escuelas[index] = {'nombre': escuela.nombre, 'id': escuela.id};
    });

    this.setState({
      optionsES: escuelas
    });

    this.forceUpdate();
  }

  loadNivelesPorEscuela() {
    let _niveles: string[] = NivelEscuelaStore.getNivelesPorEscuela();
    _arrayStates = { 'K': false, 'P': false, 'S': false, 'B': false, 'U': false};

    for (let i = 0; i < _niveles.length; i++) {
        if (_niveles[i] === 'K') { _arrayStates[_K] = true;
      } else if (_niveles[i] === 'P') { _arrayStates[_P] = true;
    } else if (_niveles[i] === 'S') { _arrayStates[_S] = true;
  } else if (_niveles[i] === 'B') { _arrayStates[_B] = true;
} else if (_niveles[i] === 'U') { _arrayStates[_U] = true;
        }
    }

    this.setState({
      k: _arrayStates[_K],
      p: _arrayStates[_P],
      s: _arrayStates[_S],
      b: _arrayStates[_B],
      u: _arrayStates[_U],
    });
    this.forceUpdate();
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
                      <h3 className="subtitle greydark">ASIGNAR NIVELES A ESCUELAS</h3>
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
            <div className="nicdark_textevidence">
              <div
                className={
                  'nicdark_margin1820 nicdark_marginleft100 nicdark_width_percentage100 ' +
                  'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
                }
              >
                <FormSelect
                  textoLabel="Escuelas"
                  options={this.state.optionsES}
                  name="Escuelas"
                />
                <table className="nicdark_width_percentage70">
                  <tbody>
                    <tr style={{textAlign: 'center'}}>
                     <td>
                      <h4 className="subtitle greydark">Kinder</h4>
                      <input type="checkbox" checked={this.state.k} onChange={this.onChangeK}/>
                     </td>
                     <td>
                       <br/><br/>
                       <h4 className="subtitle greydark">Primaria</h4>
                       <input type="checkbox" checked={this.state.p} onChange={this.onChangeP}/>
                     </td>
                    </tr>
                    <tr style={{textAlign: 'center'}}>
                      <td>
                        <br/><br/>
                        <h4 className="subtitle greydark">Secundria</h4>
                        <input type="checkbox" checked={this.state.s} onChange={this.onChangeS}/>
                      </td>
                      <td>
                        <br/><br/>
                        <h4 className="subtitle greydark">Bachillerato</h4>
                        <input type="checkbox" checked={this.state.b} onChange={this.onChangeB}/>
                      </td>
                    </tr>
                    <tr style={{textAlign: 'center'}}>
                      <td>
                        <br/><br/>
                        <h4 className="subtitle greydark">Universidad</h4>
                        <input type="checkbox" checked={this.state.u} onChange={this.onChangeU}/>
                      </td>
                    </tr>
                    </tbody>
                </table>
                <div className="nicdark_space20"/>
                <div className="nicdark_focus nicdark_width_percentage40">
                  <div className="nicdark_space20"/>
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <input
                      type="Submit"
                      onClick={this.onSubmit}
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
          </div>
        </section>
    );
  }
}

export default RegistroNivelEscuela;
