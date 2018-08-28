import * as React from 'react';
import '../../styles/Escuela.css';
import EscuelaActions from './flux/EscuelaActions';
import EscuelaStore from './flux/EscuelaStore';
import * as Interfaces from '../.././constantes/Interfaces';
import ListElement from './childs/ListElement';
import FormInput from '../general/FormInput';

import '../../App.css';

interface MyState {
  listOptions: JSX.Element[];
  escuela: Interfaces.Escuela;
  escuelaSelected: boolean;
  itemsLoaded: boolean;
}

class ListaEscuela extends React.Component<{}, MyState> {
private clave: any;
private nombre: any;

  constructor(props: any) {
    super(props);
    this.state = {
      listOptions: [],
      escuela: {
        clave: '',
        nombre: '',
        id: 0
      },
      escuelaSelected: false,
      itemsLoaded: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.loadEscuelas = this.loadEscuelas.bind(this);
    this.cargarEscuela = this.cargarEscuela.bind(this);
    this.volver = this.volver.bind(this);
  }

  onSubmit (event: any) {
    EscuelaActions.setClave(this.clave.getValue());
    EscuelaActions.setNombre(this.nombre.getValue());
    EscuelaActions.actualizarEscuela();
    event.preventDefault();
    event.stopPropagation();
  }

  componentWillMount() {
    EscuelaActions.ListarEscuelas();
  }

  componentDidMount() {
    EscuelaStore.addChangeListener('STORE_LISTAR_ESCUELAS', this.loadEscuelas);
    EscuelaStore.addChangeListener('STORE_MOSTRAR_ESCUELA', this.cargarEscuela);
  }

  componentWillUnmount() {
    EscuelaStore.removeChangeListener('STORE_LISTAR_ESCUELAS', this.loadEscuelas);
    EscuelaStore.addChangeListener('STORE_MOSTRAR_ESCUELA', this.cargarEscuela);
  }

  loadEscuelas() {
      let escuelas: Interfaces.Escuela[] = EscuelaStore.getListadoEscuelas();
      let _listOptions: JSX.Element[] = [];

      escuelas.forEach( (escuela, index) => {
        _listOptions.push((
          <ListElement
            key={index}
            nombre={escuela.nombre}
            clave={'' + escuela.clave}
            handleClick={this.listElementClick}
            id={escuela.id}
          />

        ));
      });

      this.setState({
        listOptions: _listOptions,
        itemsLoaded: true
      });
  }

  volver() {
    this.setState({
      escuelaSelected: false
    });
  }

  cargarEscuela() {
    let escuelaLoaded = EscuelaStore.mostrarEscuela();

    this.setState({
      escuela: escuelaLoaded,
      escuelaSelected: true
    });
  }

  listElementClick(id: number | undefined) {
    EscuelaActions.mostrarEscuela(id);
  }

  render() {

    return(
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix">
          { this.state.itemsLoaded ?
            <div/>
            :
            <div
              style={
                {
                  display: 'flex',
                  justifyContent: 'center'
                }
              }
            >
              <br/>
              <h3
                className="subtitle greydark"
                style={{paddingTop: '40px'}}
              >
                Loading . . .
              </h3>
            </div>
          }
          {this.state.escuelaSelected ?
          <div>
            <a
              onClick={this.volver}
              className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
            >
              <i className="icon-reply-outline">&nbsp;Seleccionar escuela</i>
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
                        'nicdark_btn_icon nicdark_bg_yellow ' +
                        'extrabig nicdark_radius_left white nicdark_relative'
                      }
                    >
                      <i className="icon-doc-text-1"/>
                    </a>
                  </td>
                  <td>
                    <div className="grid grid_12">
                      <div className="nicdark_space40"/>
                      <h3 className="subtitle greydark">ACTUALIZACIÓN DE ESCUELAS</h3>
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
                    value={this.state.escuela.clave}
                  />
                  <FormInput
                    ref={(nombre) => this.nombre = nombre}
                    textoLabel="Nombre: "
                    inputType="text"
                    value={this.state.escuela.nombre}
                  />
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <div className="nicdark_space20"/>
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <input
                        type="Submit"
                        defaultValue="ACTUALIZAR&nbsp;&#x2714;"
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
          :
          <div>
            <div className="nicdark_space20"/>
            <div
              style={
                {
                  textAlign: 'center'
                }
              }
            >
              <h2 className="subtitle greydark">ACTUALIZACIÓN DE ESCUELAS</h2>
            </div>
            <div className="nicdark_space40"/>
            <div>
              <ul className="undecored-list">
                {this.state.listOptions}
              </ul>
            </div>
          </div>
          }
        </div>
      </section>
    );
  }
}

export default ListaEscuela;
