import * as React from 'react';
import FormInput from '../general/FormInput';
import FormTextArea from '../general/FormTextArea';
import SetsActions from './flux/SetsActions';
import SetsStore from './flux/SetsStore';
import * as Interfaces from '../../constantes/Interfaces';
import ListElement from './childs/actualizar/ListElement';

import '../../App.css';

interface MyState {
  setSelected: boolean;
  listOptions: any[];
  set: Interfaces.Set;
  itemsLoaded: boolean;
}

class ActualizarSet extends React.Component<{}, MyState> {

  private nombre: any;
  private numero: any;
  private descripcion: any;

  constructor(props: any) {

    super(props);

    this.state = {
      setSelected: false,
      listOptions: [],
      set: {
        id: 0,
        descripcion: '',
        nombre: '',
        numero: ''
      },
      itemsLoaded: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.volver = this.volver.bind(this);
    this.loadSets = this.loadSets.bind(this);
    this.renderSets = this.renderSets.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    // SetsStore.wakeUp();

  }

  volver() {
    this.setState({
      setSelected: false
    });
  }

  onSubmit(event: any) {
    event.preventDefault();
    SetsActions.setNombre(this.nombre.getValue());
    SetsActions.setNumero(this.numero.getValue());
    SetsActions.setDescripcion(this.descripcion.getValue());

    SetsActions.updateSet();

    event.preventDefault();
    event.stopPropagation();

  }

  loadSets() {

    let sets: Interfaces.Set[] = SetsStore.getSets();
    let _listOptions: any[] = [];

    sets.forEach( (set, index) => {
      _listOptions.push( (
                          <ListElement
                            key={index}
                            nombre={set.nombre}
                            numero={set.numero}
                            handleClick={this.listElementClick}
                            id={set.id}
                          />
                        ));
    });

    this.setState({
      listOptions: _listOptions,
      itemsLoaded: true
    });

  }

  // El id, al recibirse es un valor de control, un elemento oculto, pero, se
  // utiliza al dar clic a un elemento de la lista, ejecuta el método 'mostrar-
  // Miembro' de las actions, las cuales terminan disparando un ChangeListener
  // para cargar los datos del miembro seleccionado

  // recibe undefined porque ID es un elemento opcional :c
  listElementClick(id: number | undefined) {
    SetsActions.showSet(id);
    // Cuando la store termina de procesar este método, se ejecuta un 'emit'
    // Para disparar el evento 'STORE_SHOW_SET', agregado y enlazado mas abajo
  }

  renderSets() {
    this.setState({
      setSelected: true,
      set: SetsStore.getSetActual()
    });
  }

  componentWillMount() {
    SetsStore.addChangeListener('STORE_LOAD_SETS', this.loadSets);
    SetsStore.addChangeListener('STORE_SHOW_SET', this.renderSets);
    SetsActions.loadSets();
  }

  componentWillUnmount() {
    SetsStore.removeChangeListener('STORE_LOAD_SETS', this.loadSets);
    SetsStore.removeChangeListener('STORE_SHOW_SET', this.renderSets);
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
          { this.state.setSelected ?
            <div>
              <a
                onClick={this.volver}
                className="nicdark_btn nicdark_bg_red small nicdark_shadow nicdark_radius white"
              >
                <i className="icon-reply-outline">&nbsp;Seleccionar set</i>
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
                        <h3 className="subtitle greydark">ACTUALIZACIÓN DE SETS</h3>
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
                      ref={(nombre) => this.nombre = nombre}
                      inputType="text"
                      length={50}
                      textoLabel="Nombre: "
                      value={this.state.set.nombre}
                      isRequired={true}
                    />
                    <FormInput
                      ref={(numero) => this.numero = numero}
                      textoLabel="Número: "
                      length={5}
                      inputType="text"
                      value={this.state.set.numero}
                      isRequired={true}
                    />
                    <FormTextArea
                      ref={(descripcion) => this.descripcion = descripcion}
                      textoLabel="Descripcion"
                      length={150}
                      maxRows={3}
                      value={this.state.set.descripcion}
                    />
                    <div className="nicdark_focus nicdark_width_percentage40">
                      <div className="nicdark_space20"/>
                      <div className="nicdark_focus nicdark_width_percentage40">
                        <input
                          type="Submit"
                          defaultValue="ACTUALIZAR &nbsp; &#x2714;"
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
                <h2 className="subtitle greydark">ACTUALIZACIÓN DE SETS</h2>
              </div>
              <div className="nicdark_space40"/>
              <ul className="undecored-list">
                {this.state.listOptions}
              </ul>
            </div>
          }
        </div>
      </section>
    );
  }

}

export default ActualizarSet;
