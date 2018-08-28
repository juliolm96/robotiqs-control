import * as React  from 'react';
import ListElement from './childs/actualizar/ListElement';
import MiembrosStore from './flux/MiembrosStore0';
import MiembrosActions from './flux/MiembrosActions';
import * as Interfaces from '../../constantes/Interfaces';
import InputBusqueda from '../general/InputBusqueda';

import '../../App.css';

interface MyState {
  alumnoObj: Interfaces.SocioVista;
  socioSelected: boolean;
  itemsLoaded: boolean;
  listOptions: JSX.Element[];
  edad: number;
  nivelEd: string;
}

class ConsultarDatosMiembro extends React.Component<{}, MyState> {

    constructor(props: any) {
      super(props);

      this.state = {
        alumnoObj: {
          apellido_materno: '',
          apellido_paterno: '',
          escuela_id: 0,
          fecha_ingreso: '',
          fecha_nacimiento: '',
          id: 0,
          nivel_educativo: '',
          nombre: '',
          nombre_escuela: '',
          numero: 0,
          saldo_clases: 0,
          telefono: 0,
          tutor: ''
        },
        itemsLoaded: false,
        listOptions: [],
        socioSelected: false,
        edad: 0,
        nivelEd: ''
      };

      this.miembrosLoaded = this.miembrosLoaded.bind(this);
      this.volver = this.volver.bind(this);
      this.listElementClick = this.listElementClick.bind(this);
      this.renderMiembro = this.renderMiembro.bind(this);
    }

    componentWillMount() {
      MiembrosStore.addChangeListener('STORE_LISTAR_MIEMBROS', this.miembrosLoaded);
      MiembrosStore.addChangeListener('STORE_MOSTRAR_MIEMBRO', this.renderMiembro);
    }

    miembrosLoaded() {
      let miembros: Interfaces.Socio[] = MiembrosStore.getListadoMiembros();

      let _listOptions: JSX.Element[] = [];

      miembros.forEach( (miembro, index) => {
        _listOptions.push((<ListElement
                            key={index}
                            nombre={miembro.nombre + ' ' + miembro.apellido_paterno}
                            numero={'' + miembro.numero}
                            handleClick={this.listElementClick}
                            id={miembro.id}
                          />
                         ));
      });

      this.setState({
        listOptions: _listOptions,
        itemsLoaded: true
      });
    }

    listElementClick(socioId: number) {
      MiembrosActions.mostrarMiembro(socioId);
    }

    renderMiembro() {
      let miembroLoaded = MiembrosStore.mostrarMiembro();
      this.setState({
        alumnoObj: miembroLoaded,
        socioSelected: true,
        edad: this.calcularEdad(miembroLoaded.fecha_nacimiento)
      });

      let nivelEducativo: string;

      if (this.state.alumnoObj.nivel_educativo === 'K') {
        nivelEducativo = 'Kinder';
      } else if (this.state.alumnoObj.nivel_educativo === 'P') {
        nivelEducativo = 'Primaria';
      } else if (this.state.alumnoObj.nivel_educativo === 'S') {
        nivelEducativo = 'Secundaria';
      } else if (this.state.alumnoObj.nivel_educativo === 'B') {
        nivelEducativo = 'Bachillerato';
      } else if (this.state.alumnoObj.nivel_educativo === 'U') {
        nivelEducativo = 'Universitario';
      } else {
        nivelEducativo = 'No definido';
      }

      this.setState({
        nivelEd: nivelEducativo
      });

    }

    calcularEdad(fecha: string): number {

      var hoy = new Date();
      var cumpleanos = new Date(fecha);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
          edad--;
      }

      return edad;
  }

  searchHandler(miembro: any) {
    MiembrosActions.buscarSocios(miembro.value);
  }

  volver() {
    this.setState({
      itemsLoaded: false,
      socioSelected: false,
      listOptions: []
    });
  }

  componentWillUnmount() {
    MiembrosStore.removeChangeListener('STORE_LISTAR_MIEMBROS', this.miembrosLoaded);

  }

  render() {
    return (
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix">
          { this.state.itemsLoaded ?
            <div/>
            :
            <div className="nicdark_width_percentage90">
              <br/>
              <InputBusqueda
                searchHandler={this.searchHandler}
                placeholder="Escriba el nombre del miembro"
              />
            </div>
          }
          { this.state.socioSelected ?
            <div>
            <a
              onClick={this.volver}
              className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
            >
              <i className="icon-reply-outline">&nbsp;Seleccionar socio</i>
            </a>
            <br/> <br/>
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
                      <i className="icon-doc-text-1"/>
                    </a>
                  </td>
                  <td>
                    <div className="grid grid_12">
                      <div className="nicdark_space40"/>
                      <h3 className="subtitle greydark">CONSULTA DE SOCIOS</h3>
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
            <form>
              <div
                className="nicdark_textevidence"
              >
                <div
                  className={
                    'nicdark_margin1820 nicdark_marginleft100 ' +
                    'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
                  }
                >
                  <div style={{}}>
                    <h2 className="subtitle greydark">
                      <b>Nombre: </b>
                      {this.state.alumnoObj.nombre + ' ' + this.state.alumnoObj.apellido_paterno +
                      ' ' + this.state.alumnoObj.apellido_materno}
                    </h2>
                    <br/>

                    <h2 className="subtitle greydark"> <b>Numero de socio: </b> {this.state.alumnoObj.numero}</h2>
                    <br/>

                    <h2 className="subtitle greydark"><b>Saldo en clases: </b> {this.state.alumnoObj.saldo_clases} </h2>
                    <br/>

                    <h2 className="subtitle greydark"><b>Fecha de nacimiento: </b>
                    {this.state.alumnoObj.fecha_nacimiento}
                    </h2>
                    <br/>

                    <h2 className="subtitle greydark"> <b>Edad: </b>{this.state.edad} años</h2>
                    <br/>

                    <h2 className="subtitle greydark"><b>Nivel Educativo: </b>{this.state.nivelEd}</h2>
                    <br/>

                    <h2 className="subtitle greydark"><b>Escuela: </b>{this.state.alumnoObj.nombre_escuela}</h2>
                    <br/>
                    
                    <h2 className="subtitle greydark"> <b>Fecha de ingreso: </b>
                     {this.state.alumnoObj.fecha_ingreso}
                     </h2>
                    <br/>

                    <h2 className="subtitle greydark"><b>Tutor: </b>{this.state.alumnoObj.tutor}</h2>
                    <br/>

                    <h2 className="subtitle greydark"><b>Telefono: </b>{this.state.alumnoObj.telefono}</h2>
                    <br/>

                  </div>
                  {/* Nivel educativo y escuela*/}
                </div>
              </div>
            </form>
            </div>
            :
            <div>
              <div className="nicdark_space40"/>
                <ul className="undecored-list">
                  { this.state.itemsLoaded ?
                    <div>
                      <a
                        onClick={this.volver}
                        className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
                      >
                        <i className="icon-reply-outline">&nbsp;Volver a la busqueda</i>
                      </a>
                      <br/><br/><br/>
                    </div>
                    :
                    <div/>
                  }
                  { !(this.state.listOptions.length === 0 && this.state.itemsLoaded) ?
                    <div>
                      {this.state.listOptions}
                    </div>
                    :
                    <div>
                      No se encontraron resultados
                    </div>
                  }
                </ul>
            </div>
          }
        </div>
      </section>
    );
  }

}

export default ConsultarDatosMiembro;
