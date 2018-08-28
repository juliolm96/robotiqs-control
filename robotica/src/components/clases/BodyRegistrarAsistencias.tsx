import * as React from 'react';
import FormInput from '../general/FormInput';
import * as Interfaces from '../../constantes/Interfaces';
import Actions from './flux/RCActions';

interface State {
  today: string;
  selectOptions: string[];
  fecha: string;
  horaEntrada: string;
  horaSalida: string;
  fechaActual: boolean;
  horasValidadas: boolean;
}

interface Props {
  socioId: number;
}

class BodyRegistrarAsistencias extends React.Component<Props, State> {

  private fechaActual: any;
  private fechaEspecifica: any;
  private fechaSeleccionada: any;
  private horaEntrada: any;
  private horaSalida: any;
  private noClases: any;

  constructor(props: Props) {
    super(props);

    let date: Date = new Date();

    this.state = {
      today: date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
      selectOptions: [],
      fecha: '',
      horaEntrada: '',
      horaSalida: '',
      fechaActual: true,
      horasValidadas: false
    };

    this.usarFechaActual = this.usarFechaActual.bind(this);
    this.usarFechaEspecifica = this.usarFechaEspecifica.bind(this);
    this.horaEntradaOnChange = this.horaEntradaOnChange.bind(this);
    this.horaSalidaOnChange = this.horaSalidaOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  usarFechaActual() {
    this.fechaActual.checked = true;
    this.fechaEspecifica.checked = false;
    this.setState({
      fechaActual: true
    });
  }

  usarFechaEspecifica() {
    this.fechaActual.checked = false;
    this.fechaEspecifica.checked = true;
    this.setState({
      fechaActual: false
    });
  }

  horaEntradaOnChange(event: any) {
    let inicio: string = event.target.value;

    if (inicio !== '' && this.horaSalida.value !== '') {

      let inicioMinutos: number = parseInt(inicio.substr(3, 2), 10);
      let inicioHoras: number = parseInt(inicio.substr(0, 2), 10);
      let finMinutos: number = parseInt(this.horaSalida.value.substr(3, 2), 10);
      let finHoras: number = parseInt(this.horaSalida.value.substr(0, 2), 10);

      let transcurridoMinutos = finMinutos - inicioMinutos;
      let transcurridoHoras = finHoras - inicioHoras;

      if (transcurridoMinutos < 0) {
        transcurridoHoras--;
        transcurridoMinutos = 60 + transcurridoMinutos;
      }

      if ((transcurridoHoras >= 0) && (transcurridoMinutos >= 0)) {

        if (transcurridoHoras === 0) {
          if (transcurridoMinutos >= 45) {
            this.noClases.value = '1';
          } else {
            this.noClases.value = '0.5';
          }
        } else if (transcurridoHoras === 1) {
          if (transcurridoMinutos <= 50) {
            this.noClases.value = '1';
          } else {
            this.noClases.value = '1.5';
          }
        }  else if (transcurridoHoras >= 2) {
          if (transcurridoHoras === 2 && transcurridoMinutos > 50) {
            this.noClases.value = '1.5';
          } else {
            this.noClases.value = '2';
          }
        }

        this.setState({
          horasValidadas: true
        });

      } else {
        alert('Hay un error al calcular la estancia, \n' +
          'Por favor, verifique los datos');
        this.noClases.value = '0';
        this.setState({
          horasValidadas: false
        });
      }
    }

  }

  horaSalidaOnChange(event: any) {
    let fin: string = event.target.value;
    let inicio: string = this.horaEntrada.value;

    if (inicio !== '' && fin !== '') {

      let inicioMinutos: number = parseInt(inicio.substr(3, 2), 10);
      let inicioHoras: number = parseInt(inicio.substr(0, 2), 10);
      let finMinutos: number = parseInt(fin.substr(3, 2), 10);
      let finHoras: number = parseInt(fin.substr(0, 2), 10);

      let transcurridoMinutos = finMinutos - inicioMinutos;
      let transcurridoHoras = finHoras - inicioHoras;

      if (transcurridoMinutos < 0) {
        transcurridoHoras--;
        transcurridoMinutos = 60 + transcurridoMinutos;
      }

      if ((transcurridoHoras >= 0) && (transcurridoMinutos >= 0)) {

        if (transcurridoHoras === 0) {
          if (transcurridoMinutos >= 45) {
            this.noClases.value = '1';
          } else {
            this.noClases.value = '0.5';
          }
        } else if (transcurridoHoras === 1) {
          if (transcurridoMinutos <= 50) {
            this.noClases.value  = '1';
          } else {
            this.noClases.value = '1.5';
          }
        }  else if (transcurridoHoras >= 2) {
          if (transcurridoHoras === 2 && transcurridoMinutos > 50) {
            this.noClases.value = '1.5';
          } else {
            this.noClases.value = '2';
          }
        }

        this.setState({
          horasValidadas: true
        });

      } else {
        alert('Hay un error al calcular la estancia, \n' +
          'Por favor, verifique los datos');
        this.noClases.value = '0';
        this.setState({
          horasValidadas: false
        });
      }
    }

  }

  onSubmit (event: any) {
    event.preventDefault();

    let fecha: string = '';

    if (!this.state.fechaActual) {
      fecha = this.fechaSeleccionada.getValue();
    }

    try {

      let asistenciaClase: Interfaces.Clase;

      asistenciaClase = {
        id: 0,
        fecha: fecha,
        hora_entrada: this.horaEntrada.value,
        hora_salida: this.horaSalida.value,
        clases_tomadas: this.noClases.value,
        socioId: this.props.socioId
      };

      Actions.submitAsistencia(asistenciaClase);

    } catch (error) {
      alert(
        'Ha sucedido un error al validar los datos\n' +
        'Por favor,Compruebe su información.\n\n Error: ' + error.message
      );
    }

    event.stopPropagation();
  }

  render() {
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="nicdark_focus nicdark_width_percentage70">
              <div className="nicdark_space20"/>
              <h3 className="subtitle greydark">Hora de entrada</h3>
              <div className="nicdark_space10"/>
          </div>
          <br/>
          <input
            type="time"
            required={true}
            onChange={this.horaEntradaOnChange}
            className="nicdark_bg_grey2 nicdark_radius nicdark_shadow"
            style={{width: '70%', fontSize: '1.7em', color: 'grey'}}
            ref={(horaEntrada) => this.horaEntrada = horaEntrada}
          />
          <br/>
          <div className="nicdark_space20"/>
          <h3 className="subtitle greydark">Hora de salida</h3>
          <div className="nicdark_space10"/>
          <input
            type="time"
            required={true}
            onChange={this.horaSalidaOnChange}
            className="nicdark_bg_grey2 nicdark_radius nicdark_shadow"
            style={{width: '70%', fontSize: '1.7em', color: 'grey'}}
            ref={(horaSalida) => this.horaSalida = horaSalida}
          />
          <br/>
          <div className="nicdark_space20"/>
          <h3 className="subtitle greydark">Numero de clases</h3>
          <div className="nicdark_space10"/>
          <div className="nicdark_width_percentage70">
            <input
              type="text"
              required={true}
              className="nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle"
              ref={(noClases) => this.noClases = noClases}
            />
          </div>
          <div className="nicdark_width_percentage70">
            <div className="nicdark_space40"/>
            <h3 className="subtitle greydark">
              <b>Fecha:</b>
            </h3>
            <br/>
            <label className="radio-container">
              <h4 className="subtitle greydark" style={{paddingTop: '5px'}}>Utilizar fecha actual</h4>
              <input
                type="radio"
                name="fecha"
                defaultChecked={true}
                onClick={this.usarFechaActual}
                ref={(fecha) => this.fechaActual = fecha}
              />
              <span className="radio-checkmark"/>
            </label>
            <label className="radio-container">
              <h4
                className="subtitle greydark"
                style={{paddingTop: '5px'}}
              >
                Utilizar fecha específica
              </h4>
              <input
                type="radio"
                name="fecha"
                onClick={this.usarFechaEspecifica}
                ref={(fecha) => this.fechaEspecifica = fecha}
              />
              <span className="radio-checkmark"/>
            </label>
          </div>
          { this.state.fechaActual ?
            <div className="nicdark_width_percentage100"/>
            :
            <FormInput
              ref={(fechaS) => this.fechaSeleccionada = fechaS}
              textoLabel="Seleccione la fecha de la clase: "
              inputType="date"
              isRequired={true}
            />
          }
          <div className="nicdark_focus nicdark_width_percentage40">
            <div className="nicdark_space20"/>
            <div className="nicdark_focus nicdark_width_percentage40">
              <input
                type="submit"
                defaultValue="ACTUALIZAR &nbsp; &#x2714;"
                className={
                  'nicdark_btn fullwidth nicdark_bg_violet medium ' +
                  'nicdark_shadow nicdark_radius white nicdark_press'
                }
              />
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default BodyRegistrarAsistencias;
