import * as React from 'react';
import Store from './flux/RCStore';
import Actions from './flux/RCActions';

interface MyState {
  fecha: string;
  nombreModelo: string;
  nombrePaqueteModelo: string;
  alcance: string;
  alcanceActualizado: string;
  alcanceLoaded: boolean;
  inconcluso: boolean;
  construido: boolean;
  programado: boolean;
  funcional: boolean;
  modificado: boolean;
}

interface MyProps {
  claseId: number;
}

class ActualizarAlcance extends React.Component<MyProps, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      fecha: '',
      nombreModelo: '',
      nombrePaqueteModelo: '',
      alcance: '',
      alcanceActualizado: '',
      alcanceLoaded: false,
      construido: false,
      funcional: false,
      inconcluso: false,
      modificado: false,
      programado: false
    };

    this.alcanceLoaded = this.alcanceLoaded.bind(this);
    this.radioButtonEvaluation = this.radioButtonEvaluation.bind(this);
    this.radioButtonOnChange = this.radioButtonOnChange.bind(this);
    this.aceptar = this.aceptar.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener('STORE_GET_ALCANCE_POR_CLASE_ID', this.alcanceLoaded);
    Actions.getAlcanceByClaseId(this.props.claseId);

  }

  alcanceLoaded() {

    this.radioButtonEvaluation(Store.getAlcance().alcance);

    this.setState({
      fecha: Store.getAlcance().fecha,
      nombreModelo: Store.getAlcance().nombreModelo,
      nombrePaqueteModelo: Store.getAlcance().nombrePaquete,
      alcance: Store.getAlcance().alcance,
      alcanceLoaded: true
    });
  }

  aceptar() {

    Actions.updateClase(
      {
        alcance: this.state.alcanceActualizado,
        id: this.props.claseId
      }
    );
  }

  radioButtonOnChange(event: any) {

    let alcance: string = event.target.value;

    this.setState({
      construido: false,
      funcional: false,
      inconcluso: false,
      modificado: false,
      programado: false
    });

    if (alcance === 'I') {
      this.setState({
        inconcluso: true,
        alcanceActualizado: 'I'
      });
    } else if (alcance === 'C') {
      this.setState({
        construido: true,
        alcanceActualizado: 'C'
      });
    } else if (alcance === 'P') {
      this.setState({
        programado: true,
        alcanceActualizado: 'P'
      });
    } else if (alcance === 'F') {
      this.setState({
        funcional: true,
        alcanceActualizado: 'F'
      });
    } else if (alcance === 'M') {
      this.setState({
        modificado: true,
        alcanceActualizado: 'M'
      });
    }

  }

  radioButtonEvaluation(alcance: string) {

    this.setState({
      construido: false,
      funcional: false,
      inconcluso: false,
      modificado: false,
      programado: false
    });

    if (alcance === 'Inconcluso') {
      this.setState({
        inconcluso: true
      });
    } else if (alcance === 'Construido') {
      this.setState({
        construido: true
      });
    } else if (alcance === 'Programado') {
      this.setState({
        programado: true
      });
    } else if (alcance === 'Funcional') {
      this.setState({
        funcional: true
      });
    } else if (alcance === 'Modificado') {
      this.setState({
        modificado: true
      });
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_GET_ALCANCE_POR_CLASE_ID', this.alcanceLoaded);
  }

  render() {
    return(
      <div>
        {this.state.alcanceLoaded ?
          <div>
            Fecha: {this.state.fecha}<br/>
            Nombre del modelo: {this.state.nombreModelo}<br/>
            Paquete: {this.state.nombrePaqueteModelo}<br/>
            Alcance: {this.state.alcance}<br/>
            <br/>
            <input
              type="radio"
              name="alcance"
              value="I"
              onClick={this.radioButtonOnChange}
              defaultChecked={this.state.inconcluso}
            />Inconcluso<br/>
            <input
              type="radio"
              name="alcance"
              value="C"
              onClick={this.radioButtonOnChange}
              defaultChecked={this.state.construido}
            />Construido<br/>
            <input
              type="radio"
              name="alcance"
              value="P"
              onClick={this.radioButtonOnChange}
              defaultChecked={this.state.programado}
            />Programado<br/>
            <input
              type="radio"
              name="alcance"
              value="F"
              onClick={this.radioButtonOnChange}
              defaultChecked={this.state.funcional}
            />Funcional<br/>
            <input
              type="radio"
              name="alcance"
              value="M"
              onClick={this.radioButtonOnChange}
              defaultChecked={this.state.modificado}
            />Modificado<br/><br/>
            <button className="btn btn-success" onClick={this.aceptar}>
            Aceptar
            </button>
          </div>
          :
          <label> Loading . . . </label>
        }
      </div>
    );
  }

}

export default ActualizarAlcance;
