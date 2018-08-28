import * as React from 'react';
import HorarioServicioActions from './flux/HorarioServicioActions';
import FormInput from './childs/actualizar/FormInput';
import FormSelect from './childs/actualizar/FormSelect';

interface MyState {
  optionsDias: {'label': string, 'value': string}[];
  hora_inicial: string;
  hora_final: string;
  capacidad: number;
  id: number;
}

interface PropTypes {
  dia: string;
  hora_inicial: string;
  hora_final: string;
  capacidad: number;
  id: number;
}

class ModalActualizarHS extends React.Component<PropTypes, MyState> {
  private hi: any;
  private hf: any;
  private capacidad: any;
  private dia: any;

  constructor(props: PropTypes) {
    super(props);

    this.state = {

      optionsDias: [{'label': 'LUNES', 'value': 'LU'},
                    {'label': 'MARTES', 'value': 'MA'},
                    {'label': 'MIÉRCOLES', 'value': 'MI'},
                    {'label': 'JUEVES', 'value': 'JU'},
                    {'label': 'VIERNES', 'value': 'VI'},
                    {'label': 'SÁBADO', 'value': 'SA'},
                    {'label': 'DOMINGO', 'value': 'DO'}],
      hora_inicial: this.props.hora_inicial,
      hora_final: this.props.hora_final,
      capacidad: this.props.capacidad,
      id: this.props.id
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onClose() {
    HorarioServicioActions.limpiarHS();
  }

  componentWillReceiveProps(nextProps: any) {
    this.setState({ id: nextProps.id });
    if (nextProps.hora_inicial !== this.props.hora_inicial) {
      this.setState({ hora_inicial: nextProps.hora_inicial });
    }
  }

  onSubmit (event: any) {
     HorarioServicioActions.setId(this.state.id);
     HorarioServicioActions.setHI(this.hi.getValue());
     HorarioServicioActions.setHF(this.hf.getValue());
     HorarioServicioActions.setDia(this.dia.getDia());
     HorarioServicioActions.setCapacidad(this.capacidad.getValue());
     HorarioServicioActions.actualizarHorarioServicio();
  }

  render() {
      return (
        <div className="modal-hs-contenedor">
          <h2 className="subtitle greydark">Actualizar Horario servicio</h2>
          <FormSelect
            textoLabel="Dia: "
            options={this.state.optionsDias}
            ref={(dia) => this.dia = dia}
            dia={this.props.dia}
            name="optionsDias"
          />

          <FormInput
            inputType="time"
            textoLabel="Hora de Inicio"
            ref={(hi) => this.hi = hi}
            value={this.props.hora_inicial}
            length={8}
          />
          <FormInput
            inputType="time"
            textoLabel="Hora Fin"
            ref={(hf) => this.hf = hf}
            value={this.props.hora_final}
            length={8}
          />
          <FormInput
            inputType="number"
            textoLabel="Capacidad"
            ref={(capacidad) => this.capacidad = capacidad}
            value={'' + this.props.capacidad}
            length={2}
          />
          <a className="modal-hs-cerrar" href="#" onClick={this.onClose}>X</a>
          <div className="nicdark_width_percentage90">
            <a
              onClick={this.onSubmit}
              className={
                'nicdark_btn nicdark_bg_green medium ' +
                'nicdark_shadow nicdark_radius white nicdark_press ' +
                'nicdark_width_percentage20'
              }
            >
              Actualizar&nbsp;&#x270E;
            </a>
          </div>
        </div>

      );
    }
}

export default ModalActualizarHS;
