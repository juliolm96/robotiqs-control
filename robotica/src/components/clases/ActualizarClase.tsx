import * as React from 'react';
import InputBusqueda from '../general/InputBusqueda';
import ListElement from '../general/ListElement';
import Actions from './flux/RCActions';
import Store from './flux/RCStore';
import ListModelItem from './childs/ListModelItem';
import ActualizarAlcance from './ActualizarAlcance';

interface MyState {
  busquedaHecha: boolean;
  sociosLoaded: boolean;
  modelosLoaded: boolean;
  loadingModelos: boolean;
  showingModels: boolean;
  renderUpdater: boolean;
  claseId: number;
  sociosList: JSX.Element[];
  modelosList: JSX.Element[];
}

class ActualizarClase extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      busquedaHecha: false,
      sociosLoaded: false,
      modelosLoaded: false,
      loadingModelos: false,
      showingModels: false,
      renderUpdater: false,
      claseId: 0,
      sociosList: [],
      modelosList: []
    };

    this.busquedaHandler = this.busquedaHandler.bind(this);
    this.sociosLoaded = this.sociosLoaded.bind(this);
    this.modelosLoaded = this.modelosLoaded.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
    this.actualizarModelo = this.actualizarModelo.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener('STORE_GET_SOCIOS', this.sociosLoaded);
    Store.addChangeListener('STORE_GET_MODELOS_POR_SOCIO', this.modelosLoaded);
  }

  busquedaHandler(target: any) {

    if (target.value !== '' && target.value !== null) {
      Actions.buscarSocios(target.value);
      this.setState({
        busquedaHecha: true,
        sociosLoaded: false,
        modelosLoaded: false,
        loadingModelos: false,
        showingModels: false,
        renderUpdater: false
      });
    } else {
      alert('Escriba un nombre de socio para iniciar la busqueda');
    }

  }

  sociosLoaded() {

    let sociosList: JSX.Element[] = [];

    this.setState({
      sociosLoaded: true
    });

    if (Store.getSociosList().length !== 0) {
      Store.getSociosList().forEach(
        (socio, index) => {
          sociosList.push(
            <ListElement
              key={index}
              handleClick={this.listItemClick}
              id={socio.id}
              value={
                'Nombre: ' + socio.nombre + ' ' +
                  socio.apellido_paterno + ' ' + socio.apellido_materno + ' ' +
                ' ---> Número: ' + socio.numero
              }
            />
          );
        }
      );
      this.setState({
        sociosList: sociosList
      });
    } else {
      alert('No se encontraron resultados para esta busqueda');
      this.setState({
        busquedaHecha: false
      });
    }
  }

  listItemClick(socioId: number) {
    Actions.getModelosBySocioId(socioId);
    this.setState({
      loadingModelos: true,
      showingModels: true
    });
  }

  modelosLoaded() {

    let listaModelos: JSX.Element[] = [];

    Store.getModelosClase().forEach(
      (modeloClase, index) => {
        listaModelos.push(
          <ListModelItem
            actualizarHandler={this.actualizarModelo}
            id={modeloClase.claseId}
            descripcion={modeloClase.descripcion}
            key={index}
            imagen={modeloClase.imagen}
            nombre={modeloClase.nombre}
            nombre_paquete={modeloClase.nombre_paquete}
            alcance={modeloClase.alcance}
          />
        );
      }
    );

    this.setState({
      modelosLoaded: true,
      modelosList: listaModelos,
      loadingModelos: false
    });
  }

  actualizarModelo(claseId: number) {
    if (claseId !== 0) {
      this.setState({
        claseId: claseId,
        renderUpdater: true
      });
    } else {
      alert('Error al conseguir (CLASES)');
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_GET_SOCIOS', this.sociosLoaded);
    Store.removeChangeListener('STORE_GET_MODELOS_POR_SOCIO', this.modelosLoaded);
  }

  render() {
    return(
      <div>
        <h1 className="subtitle greydark">Modelos realizados por socio</h1><br/>
        <InputBusqueda
          placeholder="nombre"
          searchHandler={this.busquedaHandler}
        />
        <br/>
        { !this.state.renderUpdater ?
          <div>
          { !this.state.busquedaHecha ?
            <h3>Ingrese el nombre del socio para buscar</h3>
            :
            <div>
            { !this.state.showingModels ?
              <div>
                { this.state.sociosLoaded ?
                  <div>
                    {this.state.sociosList}
                  </div>
                  :
                  <label>Loading . . .</label>
                }
              </div>
              :
              <div>
                { this.state.modelosLoaded ?
                  <div>
                    <br/>
                    <h2>AVANCES DE MODELOS</h2><br/>
                    { (this.state.modelosList.length !== 0) ?
                      <div className="ListaModelos" >
                        {this.state.modelosList}
                      </div>
                      :
                      <div>
                        No existen modelos realizados por este miembro
                      </div>
                    }
                  </div>
                  :
                  <div>
                    { this.state.loadingModelos ?
                      <div>
                        Loading . . .
                      </div>
                      :
                      <div/>
                    }
                  </div>
                }
              </div>
            }
            </div>
          }
          </div>
          :
          <div>
            <br/>
            <ActualizarAlcance
              claseId={this.state.claseId}
            />
          </div>
        }
      </div>
    );
  }

}

export default ActualizarClase;
