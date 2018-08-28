import * as React  from 'react';
// import FormSelectOption from '../../../general/FormSelectOption';
import FormSelectOption from './FormSelectOption';
// import HorarioServicioActions from '../../flux/HorarioServicioActions';

// Interface para declarar el tipo del cual serán las propiedades recibidas
interface PropTypes {
  textoLabel: string;
  options: {'label': string, 'value': string}[];
  name: string;
  dia: string;
  (): boolean;
}

// Interface para declarar las variables de estado, en este caso serán un arre-
// glo de objetos del tipo "JSX.Element"
interface MyState {
  options: JSX.Element[];
  dia: string;
}

// Variable para controlar si se debe actualizar o no un método
let upd = 0;

// Se declaran los genéricos para las propiedades y las variables de estado respectivamente
class FormSelect extends React.Component<PropTypes, MyState> {

  private opt1: any;

  constructor(props: PropTypes) {

    super(props);

    this.state = {
      options: [],
      dia: this.props.dia
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
    /*var rows: JSX.Element[] = [] ;

    for (var i = 0; i < this.props.options.length; i++) {
        rows.push(<FormSelectOption key={i} option={this.props.options[i]} dia={this.props.dia}/>);
    }
    this.setState({
      options: rows
    });*/

  }

  // Si llega a haber un cambio en las props recibidas (las options) se vuelve
  // a cargar el SELECT con nuevas Options de la misma forma explicada arriba

  /*componentWillReceiveProps() {
    var rows: JSX.Element[] = [] ;
    alert(this.props.dia);
    for (var i = 0; i < this.props.options.length; i++) {
        rows.push(<FormSelectOption key={i} option={this.props.options[i]} dia={this.props.dia}/>);
    }
    this.setState({
      options: rows
    });

  }*/

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
          this.setState({
            dia: event.target.value
          });
      // Coloca el nivel educativo seleccionado en la store (solo el primer carácter)
      // y carga las escuelas dependiendo el nivel educativo seleccionado
    //  HorarioServicioActions.setDia(event.target.value);
    }

  }
  getDia(): string {
  return this.state.dia;
  }
   componentWillReceiveProps(nextProps: any) {
     this.setState({
       dia: '' + nextProps.dia
     });
     this.forceUpdate();
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
            value={this.state.dia}
          >
            <option ref={(opt1) => this.opt1 = opt1}> -- SELECCIONE UNA OPCION -- </option>
              <FormSelectOption  option={this.props.options[0]} />
              <FormSelectOption  option={this.props.options[1]} />
              <FormSelectOption  option={this.props.options[2]} />
              <FormSelectOption  option={this.props.options[3]} />
              <FormSelectOption  option={this.props.options[4]} />
              <FormSelectOption  option={this.props.options[5]}/>
              <FormSelectOption  option={this.props.options[6]} />
          </select>
          <div style={{ height: '20px'}} className="nicdark_width_percentage70 nicdark_focus"/>
        </div>
      );

  }

}

export default FormSelect;
