import * as React from 'react';
import InputBusqueda from '../general/InputBusqueda';
import Actions from './flux/RCActions';
import Store from './flux/RCStore';
import ListOptions from './childs/ListElement';
import Body from './BodyRegistrarAsistencias';

import '../../App.css';

interface MyState {
  sociosLoaded: boolean;
  sociosList: JSX.Element[];
  loading: boolean;
  sociosEmpty: boolean;
  socioId: number;
  nombreSocio: string;
  socioSelected: boolean;
  numeroSocio: string;
}

class RegistrarAsistencia extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      sociosLoaded: false,
      sociosList: [],
      loading: false,
      sociosEmpty: false,
      socioId: 0,
      socioSelected: false,
      nombreSocio: '',
      numeroSocio: ''
    };

    this.sociosLoaded = this.sociosLoaded.bind(this);
    this.busquedaHandler = this.busquedaHandler.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.volver = this.volver.bind(this);

  }

  componentWillMount() {
    Store.wakeUp();
    Store.addChangeListener('STORE_GET_SOCIOS', this.sociosLoaded);
  }

  sociosLoaded() {

    let sociosList: JSX.Element[] = [];

    Store.getSociosList().forEach(
        (socio, index) => {
          sociosList.push(
            <ListOptions
              handleClick={this.listElementClick}
              id={socio.id}
              nombre={socio.nombre + ' ' + socio.apellido_paterno + ' ' + socio.apellido_materno}
              numero={socio.numero + ''}
              key={index}
            />
          );
        }
    );

    this.setState({
      sociosLoaded: true
    });

    if (sociosList.length !== 0) {
      this.setState({
        sociosList: sociosList,
        sociosEmpty: false,
        loading: false
      });
    } else {
      this.setState({
        sociosEmpty: true,
        loading: false
      });
    }

  }

  busquedaHandler(target: any) {

    if (target.value !== null && target.value !== undefined && target.value !== '') {
      this.setState({
        loading: true,
        socioSelected: false
      });

      Actions.buscarSocios(target.value);
    } else {
      alert('Debe ingresar un nombre para iniciar la busqueda');
    }
  }

  listElementClick(socioId: number) {
    this.setState({
      socioId: socioId,
      socioSelected: true,
      nombreSocio: Store.getNombreSocio(socioId),
      numeroSocio: Store.getNumeroSocio(socioId),
      sociosLoaded: false
    });
  }

  volver() {
    this.setState({
      sociosList: [],
      socioId: 0,
      sociosEmpty: false,
      loading: false,
      socioSelected: false,
      nombreSocio: ''
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_GET_SOCIOS', this.sociosLoaded);
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
                      'nicdark_btn_icon nicdark_bg_violet ' +
                      'extrabig nicdark_radius_left white nicdark_relative'
                    }
                  >
                    <i className="icon-pencil-2"/>
                  </a>
                </td>
                <td>
                  <div className="grid grid_12">
                    <div className="nicdark_space40"/>
                    <h3 className="subtitle greydark">REGISTRO DE ASISTENCIA</h3>
                    <div className="nicdark_space20"/>
                    <div className="nicdark_divider left small">
                      <span className="nicdark_bg_violet nicdark_radius"/>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {/*FIN DE ENCABEZADO*/}
          <div
            style={{
              float: 'left',
              width: '85%',
              position: 'relative',
              overflow: 'unset'
            }}
          >
            <div
              className={
                'nicdark_margin1820 nicdark_marginleft100 nicdark_width_percentage100 ' +
                'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
              }
            >
              <h3 className="subtitle greydark">Ingrese el nombre del socio a buscar</h3>
              <br/>
              <InputBusqueda
                placeholder="ej: Juan Pérez"
                searchHandler={this.busquedaHandler}
              />
              { this.state.loading ?
                <div className="nicdark_width_percentage70">
                  <br/>
                  <h3 className="subtitle greydark">Loading...</h3>
                </div>
                :
                <div/>
              }
              { this.state.sociosLoaded ?
                <div>
                  { !this.state.sociosEmpty ?
                    <div className="nicdark_width_percentage70">
                      <div className="nicdark_space20"/>
                      <div
                        style={
                          {
                            textAlign: 'center'
                          }
                        }
                      >
                      <h3 className="subtitle greydark">Seleccione el socio</h3>
                      </div>
                      <div className="nicdark_space40"/>
                      <ul className="undecored-list" style={{paddingLeft: 0}}>
                        {this.state.sociosList}
                      </ul>
                    </div>
                    :
                    <div className="nicdark_width_percentage70">
                      <br/>
                      <h3 className="subtitle darkgrey">
                        No se han encontrado socios
                        con los parametros solicitados
                      </h3>
                    </div>
                  }
                </div>
                :
                <div/>
              }
              { this.state.socioSelected ?
                <div className="nicdark_width_percentage90">
                  <div className="nicdark_space20"/>
                  <a
                    onClick={this.volver}
                    className={
                      'nicdark_btn nicdark_bg_red small ' +
                      'nicdark_shadow nicdark_radius white nicdark_press'
                    }
                  >
                    <i className="icon-reply-outline">&nbsp;Seleccionar un socio distinto</i>
                  </a>
                  <br/><br/><br/>
                  <h3 className="subtitle greydark">
                    <b>Socio: </b>{this.state.nombreSocio}<br/><br/>
                  </h3>
                  <h3 className="subtitle greydark">
                    <b>Numero de socio: </b>{this.state.numeroSocio}<br/>
                  </h3>
                  <hr className="stylished nicdark_bg_red"/>
                  <Body socioId={this.state.socioId}/>
                </div>
                :
                <div/>
              }
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default RegistrarAsistencia;
