import * as React from 'react';
import ConstruccionStore from '../../flux/ConstruccionStore';
import ConstruccionActions from '../../flux/ConstruccionActions';
import '../../../../App.css';
import '../../../../Galeria.css';
import '../../../../styles/zoomImage.css';

interface MyProps {
  modeloActualId: number;
  onClose(): void;
}

interface MyState {
  imgEnsamblado: string;
  imgMaterial: string;
  imgInstruccion: string;
  paso: number;
  modeloActualId: number;
  totalPasos: number;
  pasoInput: number;
  modeloLoaded: boolean;
}

class GalleryBody extends React.Component<MyProps, MyState> {

  private btnAvanzar: any;
  private btnRegresar: any;
  private contenedor: any;
  private imgEnsamblado: any;
  private imgMaterial: any;
  private imgInstruccion: any;
  private modalZoom: any;
  private modalImage: any;
  private captionText: any;

  constructor(props: MyProps) {
    super(props);

    this.state = {
      imgEnsamblado: '',
      imgMaterial: '',
      imgInstruccion: '',
      modeloActualId: this.props.modeloActualId,
      paso: 0,
      totalPasos: 0,
      pasoInput: 0,
      modeloLoaded: false
    };

    this.renderPaso = this.renderPaso.bind(this);
    this.onChangePaso = this.onChangePaso.bind(this);
    this.siguientePaso = this.siguientePaso.bind(this);
    this.pasoAnterior = this.pasoAnterior.bind(this);
    this.onClickIr = this.onClickIr.bind(this);
  }

  componentWillMount() {
    ConstruccionStore.addChangeListener('STORE_LOAD_PRIMER_PASO', this.renderPaso);
    ConstruccionStore.addChangeListener('STORE_LOAD_SIGUIENTE_PASO', this.renderPaso);
    ConstruccionStore.addChangeListener('STORE_LOAD_PASO_ANTERIOR', this.renderPaso);
    ConstruccionStore.addChangeListener('STORE_LOAD_PASO_ESPECIFICO', this.renderPaso);
    ConstruccionActions.loadPrimerPaso(this.props.modeloActualId);
  }

  renderPaso() {

    this.setState({
      imgMaterial: ConstruccionStore.getPasoActual().material,
      imgEnsamblado: ConstruccionStore.getPasoActual().ensamblado,
      imgInstruccion: ConstruccionStore.getPasoActual().instruccion,
      paso: ConstruccionStore.getPasoActual().numero,
      modeloActualId: ConstruccionStore.getPasoActual().modeloId,
      totalPasos: ConstruccionStore.getTotalPasos(),
      pasoInput: ConstruccionStore.getPasoActual().numero
    });

    this.setState({
      modeloLoaded: true
    });

    if (this.state.paso === this.state.totalPasos) {
      this.btnAvanzar.disabled = true;
    } else {
      this.btnAvanzar.disabled = false;
    }

    if (this.state.paso === 1) {
      this.btnRegresar.disabled = true;
    } else {
      this.btnRegresar.disabled = false;
    }

    this.forceUpdate();
  }

  onChangePaso(event: any) {
    this.setState({
      pasoInput: event.target.value
    });
  }

  onClickIr() {
    if ((this.state.pasoInput > 0) && (this.state.pasoInput <= this.state.totalPasos)) {
      ConstruccionActions.loadPasoEspecifico(this.state.modeloActualId, this.state.pasoInput);

      this.setState({
        modeloLoaded: false
      });

      this.forceUpdate();
    } else {
      alert('El paso especificado no se encuentra\ndentro del rango de pasos del modelo');
    }
  }

  pasoAnterior() {
    if (this.state.paso > 1) {
      ConstruccionActions.loadAnterior(this.state.modeloActualId, this.state.paso);

      this.setState({
        modeloLoaded: false
      });

      this.forceUpdate();
    }
  }

  siguientePaso() {

    if (this.state.totalPasos > this.state.paso) {
      ConstruccionActions.loadSiguiente(this.state.modeloActualId, this.state.paso);

      this.setState({
        modeloLoaded: false
      });
    }

  }

  onClickImage(target: any) {
    this.modalZoom.style.display = 'block';
    this.modalImage.src = target.src;
    this.captionText.innerHTML = target.alt;
  }

  zoomClose() {
    this.modalZoom.style.display = 'none';
  }

  componentWillUnmount() {
    ConstruccionStore.removeChangeListener('STORE_LOAD_PRIMER_PASO', this.renderPaso);
    ConstruccionStore.removeChangeListener('STORE_LOAD_SIGUIENTE_PASO', this.renderPaso);
    ConstruccionStore.removeChangeListener('STORE_LOAD_PASO_ANTERIOR', this.renderPaso);
    ConstruccionStore.removeChangeListener('STORE_LOAD_PASO_ESPECIFICO', this.renderPaso);
  }

  render() {
    return(
      <div
        className="popup-contenedor-gc"
        ref={this.contenedor}
      >
        <input
          type="number"
          className="numero-paso"
          value={this.state.pasoInput}
          onChange={this.onChangePaso}
        />
        <label className="gallery-label-paso">{'/' + this.state.totalPasos}</label>
        &ensp;
        <a
          onClick={this.onClickIr}
          className="nicdark_btn_icon nicdark_bg_blue white gallery-btn-ir"
        >Ir
        </a>
        <br/>
        <br/>
        { this.state.modeloLoaded ?
          <div>
            <a
              onClick={this.pasoAnterior}
              ref={(button) => this.btnRegresar = button}
              className="gallery-button-left white"
            >
              <i className="icon-left-1"/>
            </a>
            <a
              onClick={this.siguientePaso}
              ref={(button) => this.btnAvanzar = button}
              className="gallery-button-right white"
            >
              <i className="icon-right-1"/>
            </a>
            <img
              src={'data:image/svg+xml;base64,' + this.state.imgMaterial}
              alt="material"
              title="Material"
              id="imgMaterial"
              className="img-gallery-material zoominImage"
              onClick={() => this.onClickImage(this.imgMaterial)}
              ref={(img) => this.imgMaterial = img}
            />
            <img
              src={'data:image/svg+xml;base64,' + this.state.imgInstruccion}
              title="instrucción"
              alt="Instrucción"
              id="imgInstruccion"
              className="img-gallery-instruccion zoominImage"
              onClick={() => this.onClickImage(this.imgInstruccion)}
              ref={(img) => this.imgInstruccion = img}
            />
            <img
              src={'data:image/svg+xml;base64,' + this.state.imgEnsamblado}
              title="Ensamblado"
              alt="Ensamblado"
              id="imgEnsamblado"
              className="img-gallery-ensamblado zoominImage"
              onClick={() => this.onClickImage(this.imgEnsamblado)}
              ref={(img) => this.imgEnsamblado = img}

            />
            <div
              id="modal-zoominImage"
              className="modal-zoominImage"
              ref={(thisDiv) => this.modalZoom = thisDiv}
            >
              <span
                className="close-zoominImage"
                onClick={() => this.zoomClose()}
              >
                &times;
              </span>
              <img
                className="modal-content-zoominImage"
                id="img01"
                ref={(modalImage) => this.modalImage = modalImage}
              />
              <div
                id="caption-zoominImage"
                ref={(divCaption) => this.captionText = divCaption}
              />
            </div>
          </div>
          :
          <div className="load-label"><h1>Loading. . .</h1></div>
        }
        <a className="popup-cerrar-gc" href="#" onClick={this.props.onClose}>X</a>
      </div>
    );
  }

}

export default GalleryBody;
