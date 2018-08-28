import * as React from 'react';
import InputBusqueda from '../general/InputBusqueda';
import Actions from './flux/RCActions';
import Store from './flux/RCStore';
import ListOptions from './childs/ListElement';
import FormSelect from './childs/FormSelect';
import Body from './BodyRegistrarClases';

import '../../App.css';

interface MyState {
  sociosList: JSX.Element[];
  sociosEmpty: boolean;
  requestMade: boolean;
  loading: boolean;
  socioSelected: boolean;
  optionsClases: string[];
  socioId: number;
  claseId: number;
  nombreSocio: string;
  numeroSocio: string;
  searchButtonPressed: boolean;
  claseSelected: boolean;
}

class RegistrarClases extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      sociosList: [],
      socioId: 0,
      claseId: 0,
      optionsClases: [],
      sociosEmpty: false,
      requestMade: false,
      loading: false,
      socioSelected: false,
      searchButtonPressed: false,
      claseSelected: false,
      nombreSocio: '',
      numeroSocio: ''
    };

    this.loadSociosList = this.loadSociosList.bind(this);
    this.busquedaHandler = this.busquedaHandler.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.loadOptionsClases = this.loadOptionsClases.bind(this);
    this.clasesSelectOnChange = this.clasesSelectOnChange.bind(this);
    this.volver = this.volver.bind(this);
  }

  componentWillMount() {
    Store.wakeUp();
    Store.addChangeListener('STORE_GET_SOCIOS', this.loadSociosList);
    Store.addChangeListener('STORE_GET_CLASE_POR_FECHA_Y_SOCIO_ID', this.loadOptionsClases);
  }

  busquedaHandler(target: any) {
    if (target.value !== null && target.value !== undefined && target.value !== '') {
      this.setState({
        loading: true,
        requestMade: false,
        searchButtonPressed: true
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
      numeroSocio: Store.getNumeroSocio(socioId)
    });

    Actions.loadClases(socioId);
  }

  clasesSelectOnChange(event: any) {
    // event.target.value = fecha de la clase desde el SELECT
    let claseId: number = Store.getClaseIdByFecha(event.target.value);
    this.setState({
      claseId: claseId,
      claseSelected: true
    });
  }

  loadSociosList() {

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

    if (sociosList.length !== 0) {
      this.setState({
        sociosList: sociosList,
        requestMade: true,
        sociosEmpty: false,
        loading: false
      });
    } else {
      this.setState({
        requestMade: true,
        sociosEmpty: true,
        loading: false
      });
    }

  }

  loadOptionsClases() {

    let clasesArray: string[] = [];

    Store.getClases().forEach(
      (clase, index) => {
        clasesArray.push(clase.fecha + '');
      }
    );

    this.setState({
      optionsClases: clasesArray
    });

    this.forceUpdate();

  }

  volver() {
    this.setState({
      sociosList: [],
      socioId: 0,
      sociosEmpty: false,
      requestMade: false,
      loading: false,
      socioSelected: false,
      searchButtonPressed: false,
      claseSelected: false,
      nombreSocio: ''
    });
  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_GET_SOCIOS', this.loadSociosList);
    Store.removeChangeListener('STORE_GET_CLASE_POR_FECHA_Y_SOCIO_ID', this.loadOptionsClases);
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
                    <h3 className="subtitle greydark">REGISTRO DE AVANCES</h3>
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
              { !this.state.socioSelected ?
                <div className="nicdark_width_percentage100">
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
                  { this.state.requestMade ?
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
                          <ul className="undecored-list" style={{marginLeft: '20px'}}>
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
                    <div className="nicdark_focus nicdark_width_percentage70">
                      { !this.state.searchButtonPressed ?
                        <h3 className="subtitle greydark">Ingrese el nombre del socio</h3>
                        :
                        <div/>
                      }
                    </div>
                  }
                </div>
                :
                <div className="nicdark_width_percentage100">
                  <a
                    onClick={this.volver}
                    className={
                      'nicdark_btn nicdark_bg_red small ' +
                      'nicdark_shadow nicdark_radius white nicdark_press'
                    }
                  >
                    <i className="icon-reply-outline">&nbsp;Seleccionar un miembro distinto</i>
                  </a>
                  <br/><br/><br/>
                  <h3 className="subtitle greydarkk">
                    <b>Socio: </b>{this.state.nombreSocio}<br/><br/>
                  </h3>
                  <h3 className="subtitle greydarkk">
                    <b>Numero de socio: </b>{this.state.numeroSocio}<br/>
                  </h3>
                  { !this.state.claseSelected ?
                    <FormSelect
                      onChangeHandler={this.clasesSelectOnChange}
                      options={this.state.optionsClases}
                      textoLabel="Clase a registrar"
                    />
                    :
                    <Body socioId={this.state.socioId} claseId={this.state.claseId}/>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default RegistrarClases;
