import * as React from 'react';
import FormSelect from './childs/FormSelect';
import Actions from './flux/RCActions';
import Store from './flux/RCStore';
import * as Interfaces from '../../constantes/Interfaces';

interface State {
  today: string;
  selectOptions: string[];
  paquetesLoaded: boolean;
  paqueteSelected: boolean;
  modelosOptions: string[];
  modeloSelected: boolean;
  fechaClase: string;
  paqueteId: number;
  modeloId: number;
  alcance: string;
}

interface Props {
  socioId: number;
  claseId: number;
}

class BodyRegistrarClases extends React.Component< Props, State> {

  constructor(props: Props) {
    super(props);

    let date: Date = new Date();

    this.state = {
      today: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      selectOptions: [],
      modelosOptions: [],
      paquetesLoaded: false,
      paqueteSelected: false,
      modeloSelected: false,
      paqueteId: 0,
      fechaClase: Store.getFechaClaseById(this.props.claseId),
      modeloId: 0,
      alcance: 'I'
    };

    this.paquetesLoaded = this.paquetesLoaded.bind(this);
    this.modelosLoaded = this.modelosLoaded.bind(this);
    this.modelosSelectOnChange = this.modelosSelectOnChange.bind(this);
    this.paquetesSelectOnChange = this.paquetesSelectOnChange.bind(this);
    this.modelosSelectOnChange = this.modelosSelectOnChange.bind(this);
    this.avanceOnClick = this.avanceOnClick.bind(this);
    this.registrar = this.registrar.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener('STORE_GET_PAQUETES', this.paquetesLoaded);
    Store.addChangeListener('STORE_GET_MODELOS_POR_PAQUETE', this.modelosLoaded);
    Actions.getPaquetes();
  }

  paquetesLoaded() {
    let selectOptions: string[] = [];

    Store.getPaquetes().forEach(
      (paquete, index) => {
        selectOptions.push(paquete.nombre);
      }
    );

    this.setState({
      selectOptions: selectOptions,
      paquetesLoaded: true
    });

    this.forceUpdate();
  }

  paquetesSelectOnChange(event: any) {

    let paqueteId: number = Store.getPaqueteId(event.target.value);
    Actions.getModelosByPaqueteId(paqueteId);
    this.setState({
      paqueteId: paqueteId
    });

  }

  modelosSelectOnChange(event: any) {

    let modeloId: number = Store.getModeloId(event.target.value);

    this.setState({
      modeloSelected: true,
      modeloId: modeloId
    });

  }

  modelosLoaded() {

    let modelos: string[] = [];

    Store.getModelos().forEach(
      (modelo, index) => {
        modelos.push(modelo.nombre);
      }
    );

    this.setState({
      paqueteSelected: false
    });

    this.setState({
      modelosOptions: modelos,
      paqueteSelected: true
    });

  }

  avanceOnClick(event: any) {

    this.setState({
      alcance: event.target.value
    });

  }

  registrar() {

    let actividad: Interfaces.Actividad = {
      alcance: this.state.alcance,
      claseId: this.props.claseId,
      id: 0,
      modeloId: this.state.modeloId
    };

    Actions.submitActividad(actividad);

  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_GET_PAQUETES', this.paquetesLoaded);
    Store.removeChangeListener('STORE_GET_MODELOS_POR_PAQUETE', this.modelosLoaded);
  }

  render() {
    return(
      <div>
        <br/>
        <h3 className="subtitle greydark">
          <b>Fecha Actual:</b> {this.state.today}<br/><br/>
        </h3>
        <h3 className="subtitle greydark">
          <b>Fecha de la clase:</b> {this.state.fechaClase}<br/><br/>
        </h3>
        { this.state.paquetesLoaded ?
          <FormSelect
            onChangeHandler={this.paquetesSelectOnChange}
            options={this.state.selectOptions}
            textoLabel="Seleccione el paquete"
          />
          :
          <div>
            Cargando opciones...
          </div>
        }

        { this.state.paqueteSelected ?
          <div>
            <FormSelect
              onChangeHandler={this.modelosSelectOnChange}
              options={this.state.modelosOptions}
              textoLabel="Seleccione el modelo construido"
            />
            { this.state.modeloSelected ?
              <div className="nicdark_width_percentage70">
                <br/>
                <h3 className="subtitle greydark">Alcance del modelo</h3><br/>
                <label className="radio-container">
                  <h4 className="subtitle greydark" style={{paddingTop: '5px'}}>Inconcluso</h4>
                  <input
                    type="radio"
                    name="alcance"
                    value="I"
                    defaultChecked={true}
                    onClick={this.avanceOnClick}
                  />
                  <span className="radio-checkmark"/>
                </label>
                <label className="radio-container">
                  <h4 className="subtitle greydark" style={{paddingTop: '5px'}}>Construido</h4>
                  <input
                    type="radio"
                    name="alcance"
                    value="C"
                    onClick={this.avanceOnClick}
                  />
                  <span className="radio-checkmark"/>
                </label>
                <label className="radio-container">
                  <h4 className="subtitle greydark" style={{paddingTop: '5px'}}>Programado</h4>
                  <input
                    type="radio"
                    name="alcance"
                    value="P"
                    onClick={this.avanceOnClick}
                  />
                  <span className="radio-checkmark"/>
                </label>
                <label className="radio-container">
                  <h4 className="subtitle greydark" style={{paddingTop: '5px'}}>Funcional</h4>
                  <input
                    type="radio"
                    name="alcance"
                    value="F"
                    onClick={this.avanceOnClick}
                  />
                  <span className="radio-checkmark"/>
                </label>
                <label className="radio-container">
                  <h4 className="subtitle greydark" style={{paddingTop: '5px'}}>Modificado</h4>
                  <input
                    type="radio"
                    name="alcance"
                    value="M"
                    onClick={this.avanceOnClick}
                  />
                  <span className="radio-checkmark"/>
                </label>
                <div className="nicdark_focus nicdark_width_percentage40">
                  <div className="nicdark_space20"/>
                  <div className="nicdark_focus nicdark_width_percentage40">
                    <a
                      onClick={this.registrar}
                      className={
                        'nicdark_btn fullwidth nicdark_bg_violet medium ' +
                        'nicdark_shadow nicdark_radius white nicdark_press '
                      }
                    >
                      REGISTRAR&nbsp;&#x2714;
                    </a>
                  </div>
                </div>
              </div>
              :
              <div/>
            }
          </div>
          :
          <div/>
        }
      </div>
    );
  }

}

export default BodyRegistrarClases;
