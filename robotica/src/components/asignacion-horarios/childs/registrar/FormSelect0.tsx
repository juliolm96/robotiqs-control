import * as React  from 'react';
import FormSelectOption from '../../../general/FormSelectOption';
// import FormSelectOption from './FormSelectOption';
import HorarioServicioActions from '../../.././horarios_servicios/flux/HorarioServicioActions';

// Interface para declarar el tipo del cual serán las propiedades recibidas
interface PropTypes {
  textoLabel: string;
  options: string[];
  name: string;
  disabled: boolean;
  (): boolean;
}

// Interface para declarar las variables de estado, en este caso serán un arre-
// glo de objetos del tipo "JSX.Element"
interface MyState {
  options: JSX.Element[];
}

// Variable para controlar si se debe actualizar o no un método
let upd = 0;

// Se declaran los genéricos para las propiedades y las variables de estado respectivamente
class FormSelect extends React.Component<PropTypes, MyState> {

  private opt1: any;

  constructor(props: PropTypes) {

    super(props);

    this.state = {
      options: []
    };
    // Se enlaza el método "onChange" a esta clase
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // Antes de renderizar el componente (SELECT) se ejecuta este método
  // Lo primero que se hace es crear un objeto "rows" para guardar los renglones
  // que contendrá el SELECT, lo siguiente es recorrer un arreglo de strings
  // que se mandó como PROPS desde la clase padre, por cada elemento del arreglo
  // iremos agregando un objeto del tipo JSX.Element a al array "rows".
  // Se tiene que agregar un indice o llave (KEY) para el control del objeto
  // y en "option" se agrega el texto sacado del arreglo de strings recibido del
  // padre, al terminar se ponen los rows creados dentro de las options
  // como variables de estado para renderizarse en el componente
  componentWillMount() {

    var rows: JSX.Element[] = [] ;
    for (var i = 0; i < this.props.options.length; i++) {
        rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
    }
    this.setState({
      options: rows
    });

  }

  // Si llega a haber un cambio en las props recibidas (las options) se vuelve
  // a cargar el SELECT con nuevas Options de la misma forma explicada arriba

  componentWillReceiveProps() {

    var rows: JSX.Element[] = [] ;
    for (var i = 0; i < this.props.options.length; i++) {
        rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
    }
    this.setState({
      options: rows
    });

  }

  // Este evento se dispara cada que cambia el valor dentro del select (se
  // selecciona una nueva opcion del SELECT).
  // Lo primero que hace es obtener la referencia del select y desactivar
  // la primera opción para que no pueda seleccionarse despues, lo siguiente es
  // verificar, si el SELECT se llama 'NivelEd' y la opción selecionada no es
  // la opcion por default ( o sea esta ==> -- SELECCIONE UNA OPCION --)
  // manda llamar las actions para registrar en la store el nivel educativo
  // seleccionado. Lo mismo pasa con el select 'Escuela',
  onChange(event: any) {

    if (this.props.name === 'optionsDias' && event.target.value !== '-- SELECCIONE UNA OPCION --') {

      // Coloca el nivel educativo seleccionado en la store (solo el primer carácter)
      // y carga las escuelas dependiendo el nivel educativo seleccionado

      HorarioServicioActions.filHS(event.target.value);

    }

  }

  componentDidMount() {
    // Actualiza el componenete al montarlo para agregar todas las options
    // y lo re-renderiza, solo una vez
    if (upd === 0) {
      upd = 1;
      this.forceUpdate();
    }
  }

  onClick() {
    this.opt1.disabled = true;
  }

  render() {

      return(
        <div className="nicdark_focus nicdark_width_percentage70">
          <div className="nicdark_space20"/>
          <h3 className="subtitle greydark">{this.props.textoLabel}</h3>
          <div className="nicdark_space10"/>
          <select
            onChange={this.onChange}
            className="nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle"
            onClick={this.onClick}
            disabled={this.props.disabled}
          >
          <option ref={(opt1) => this.opt1 = opt1}> -- SELECCIONE UNA OPCION -- </option>
            {this.state.options}
          </select>
          <div style={{ height: '20px'}} className="nicdark_width_percentage70 nicdark_focus"/>
        </div>
      );

  }

}

export default FormSelect;
