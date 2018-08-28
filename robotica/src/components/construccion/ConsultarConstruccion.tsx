import * as React from 'react';
import ConstruccionStore from './flux/ConstruccionStore';
import ConstruccionActions from './flux/ConstruccionActions';
import ListElement from './childs/consultar/ListElement';
import PaqueteListItem from './childs/consultar/PaqueteListItem';
import GalleryBody from './childs/consultar/GalleryBody';

import '../../App.css';
// import FormInput from '../general/FormInput';

interface MyState {
  modeloLoaded: boolean;
  imgMaterial: string;
  imgInstruccion: string;
  imgEnsamblado: string;
  paso: number;
  pasoInput: number;
  modelosList: JSX.Element[];
  paquetesList: JSX.Element[];
  paquetesReady: boolean;
  paqueteSelected: boolean;
  modeloSelected: boolean;
  modeloActualId: number;
  totalPasos: number;
}

class ConsultarConstruccion extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      imgEnsamblado: '',
      imgInstruccion: '',
      imgMaterial: '',
      modeloLoaded: false,
      paso: 0,
      pasoInput: 1,
      modeloSelected: false,
      modelosList: [],
      paquetesList: [],
      paquetesReady: false,
      paqueteSelected: false,
      modeloActualId: 0,
      totalPasos: 0
    };

    this.listarModelos = this.listarModelos.bind(this);
    this.renderPaquetes = this.renderPaquetes.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.paqueteItemClick = this.paqueteItemClick.bind(this);
    this.volverAPaquetes = this.volverAPaquetes.bind(this);
    this.modeloLoaded = this.modeloLoaded.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  componentWillMount() {
    ConstruccionStore.addChangeListener('STORE_LOAD_PRIMER_PASO', this.modeloLoaded);
    ConstruccionStore.addChangeListener('STORE_LOAD_MODELOS', this.listarModelos);
    ConstruccionStore.addChangeListener('STORE_LOAD_PAQUETES', this.renderPaquetes);
    ConstruccionActions.loadPaquetes();

  }

  renderPaquetes() {

    let listaPaquetes: JSX.Element[] = [];

    ConstruccionStore.getPaquetes().forEach(
        (paquete, index) => {
          listaPaquetes.push(
            <PaqueteListItem
              handleClick={this.paqueteItemClick}
              descripcion={paquete.descripcion}
              key={index}
              id={paquete.id}
              paquete={paquete.nombre}
              set={paquete.nombre_set}
            />
          );
        }
    );

    this.setState({
      paquetesList: listaPaquetes,
      paquetesReady: true
    });

  }

  listarModelos() {

    let listaModelos: JSX.Element[] = [];

    ConstruccionStore.getModelos().forEach(
      (modelo, index) => {
        listaModelos.push(
          <ListElement
            handleClick={this.listElementClick}
            id={modelo.id}
            key={index}
            nombre={modelo.nombre}
            descripcion={modelo.descripcion}
            imagen={modelo.imagen}
          />
        );
      }
    );

    this.setState({
      modelosList: listaModelos,
    });

  }

  paqueteItemClick(paqueteId: number) {
      this.setState({
        paqueteSelected: true
      });
      ConstruccionActions.loadModelosPorPaquete(paqueteId);
  }

  volverAPaquetes() {
    this.setState({
      paqueteSelected: false
    });
  }

  onCloseModal() {
    this.setState({
      modeloSelected: false
    });
  }

  listElementClick(modeloId: number) {

    ConstruccionActions.loadTotalPasos(modeloId);
    ConstruccionActions.loadPrimerPaso(modeloId);

    this.setState({
      modeloSelected: true,
      modeloActualId: modeloId
    });

  }

  modeloLoaded() {
    this.setState({
      modeloLoaded: true
    });
  }

  componentWillUnmount() {
    ConstruccionStore.addChangeListener('STORE_LOAD_PRIMER_PASO', this.modeloLoaded);
    ConstruccionStore.removeChangeListener('STORE_LOAD_MODELOS', this.listarModelos);
    ConstruccionStore.removeChangeListener('STORE_LOAD_PAQUETES', this.renderPaquetes);
  }

  render() {
    return(
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix">
          { !this.state.paqueteSelected ?
            !this.state.paquetesReady ?
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <br/>
                <h3 className="subtitle greydark" style={{paddingTop: '40px'}}>
                  Loading . . .
                </h3>
              </div>
              :
              <div>
                <ul className="undecored-list">
                  {
                    /*LISTA DE PAQUETES ACTIVAN EL this.state.paqueteSelected*/
                    this.state.paquetesList
                  }
                </ul>
              </div>
            :
              this.state.modeloSelected ?
                this.state.modeloLoaded ?
                  <div id="popup-gc">
                    <GalleryBody
                      onClose={this.onCloseModal}
                      modeloActualId={this.state.modeloActualId}
                    />
                  </div>
                :
                  <div>
                    Loading . . .
                  </div>
              :
                <div>
                  <a
                    onClick={this.volverAPaquetes}
                    className={
                      'nicdark_btn nicdark_bg_red small nicdark_shadow ' +
                      'nicdark_radius white nicdark_press'
                    }
                  >
                    <i className="icon-reply-outline">&nbsp;Cambiar Paquete</i>
                  </a>
                  <ul className="undecored-list">
                    {this.state.modelosList}
                  </ul>
                </div>
          }
        </div>
      </section>
    );
  }

}

export default ConsultarConstruccion;
