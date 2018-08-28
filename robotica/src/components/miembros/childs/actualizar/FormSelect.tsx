import * as React from 'react';
import FormSelectOption from '../../../general/FormSelectOption';
import MiembrosStore from '../../flux/MiembrosStore0';
import MiembrosActions from '../../flux/MiembrosActions';

// Interface para declarar el tipo del cual serán las propiedades recibidas
interface PropTypes {
  textoLabel: string;
  options: string[];
  name: string;
}

// Interface para declarar las variables de estado, en este caso serán un arre-
// glo de objetos del tipo "JSX.Element"
interface MyState {
  options: JSX.Element[];
  charNE: string;
}

// Variable para controlar si se debe actualizar o no un método
let upd = 0;

// Se declaran los genéricos para las propiedades y las variables de estado respectivamente
class FormSelect extends React.Component<PropTypes, MyState> {

  private opt1: any;
  private selectBox: any;

  constructor(props: PropTypes) {

    super(props);

    this.state = {
      options: [],
      charNE: ''
    };
    // Se enlaza el método "onChange" a esta clase
    this.onChange = this.onChange.bind(this);
    this.updateEscuela = this.updateEscuela.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  // Antes de renderizar el componente (SELECT) se ejecuta este método
  // Lo primero que se hace es crear un objeto "rows" para guardar los renglones
  // que contendrá el SELECT, en seguida se declara una variable 'dato', la cual
  // guardará un dato dependiente...
  componentWillMount() {

    var rows: JSX.Element[] = [] ;
    var dato: string | undefined = '';

    // si el select es para "nivel educativo", se hará una petición a la STORE
    // para obtener el nivel educativo del miembro seleccionado. si el compo-
    // nente es el SELECT de 'Escuela' se pedirá a la store el nombre de la es-
    // cuela del miembro .
    if (this.props.name === 'NivelEd') {
      dato = MiembrosStore.getNivelEducativo();
    } else if (this.props.name === 'Escuela') {
      dato = MiembrosStore.getNombreEscuela();
      MiembrosStore.addChangeListener('RESET_ESCUELAS', this.updateEscuela);
    }

    // en ete ciclo, se hace una comparación. Si el componente es "Nivel edu-
    // cativo", comparará las options con las que se va a llenar (KINDER, PRI-
    // MARIA...) y checa la primera letra de la opción para compararla con el
    // carácter de nivel educativo registrado para el miembro y poner así como
    // seleccionada esa opción. Con el mismo principio, si el componente es
    // 'Escuela' se compara el dato del usuario actual con las options
    for (var i = 0; i < this.props.options.length; i++) {

      if (this.props.name === 'NivelEd') {

        if (dato === this.props.options[i].charAt(0)) {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]} selected={true}/>);
          this.setState({
            charNE: this.props.options[i].charAt(0)
          });
          MiembrosActions.fillEscuelasNivel(dato);
        } else {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
        }

      } else {

        if (dato === this.props.options[i]) {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]} selected={true}/>);
        } else {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
        }

      }
    }

    // coloca la lista de <OPTIONS> con los datos especificados con anterioridad
    this.setState({
      options: rows
    });

  }

  // Si llega a haber un cambio en las props recibidas (las options) se vuelve
  // a cargar el SELECT con nuevas Options de la misma forma explicada arriba
  componentWillReceiveProps() {

    var rows: JSX.Element[] = [] ;
    var dato: string  = '';

    if (this.props.name === 'NivelEd') {
      dato = MiembrosStore.getNivelEducativoActualizado();
    } else if (this.props.name === 'Escuela') {
      dato = MiembrosStore.getNombreEscuela();
    }

    for (var i = 0; i < this.props.options.length; i++) {

      if (this.props.name === 'NivelEd') {

        if (dato === this.props.options[i].charAt(0)) {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]} selected={true}/>);
          this.setState({
            charNE: this.props.options[i].charAt(0)
          });
        } else {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
        }

      } else {

        if (dato === this.props.options[i]) {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]} selected={true}/>);
        } else {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
        }

      }
    }

    this.setState({
      options: rows
    });

  }

  componentDidMount() {

    // Actualiza el componenete al montarlo para agregar todas las options
    // y lo re-renderiza, solo una vez
    if (upd === 0) {
      upd = 1;
      this.forceUpdate();
    }
  }

  // Este evento se dispara cada que cambia el valor dentro del select (se
  // selecciona una nueva opcion del SLEECT).
  // Lo primero que hace es obtener la referencia del select y desactivar
  // la primera opción para que no pueda seleccionarse despues, lo siguiente es
  // verificar, si el SELECT se llama 'NivelEd' y la opción selecionada no es
  // la opcion por default (-- SELECCIONE UNA OPCION --) manda llamar las actions
  // para registrar en la store el nivel educativo seleccionado.
  // Lo mismo pasa con el select 'Escuela',
  onChange(event: any) {

    this.opt1.disabled = true;
    if (this.props.name === 'NivelEd' && event.target.value !== '-- SELECCIONE UNA OPCION --') {
      MiembrosActions.setNivelEducativo(event.target.value);
      MiembrosActions.fillEscuelasNivel(event.target.value.charAt(0));
      MiembrosActions.resetEscuelas();
    } else if (this.props.name === 'Escuela'  && event.target.value !== '-- SELECCIONE UNA OPCION --') {
      MiembrosActions.setEscuela(event.target.value);
    }
  }

  componentWillUnmount() {
    if (this.props.name === 'Escuela') {
      MiembrosStore.removeChangeListener('RESET_ESCUELAS', this.updateEscuela);
    }
  }

  onClick() {
    this.opt1.disabled = true;
  }

  updateEscuela() {
    this.opt1.disabled = false;
  }

  render() {
      return(
        <div className="nicdark_focus nicdark_width_percentage70">
          <div className="nicdark_space20"/>
          <h3 className="subtitle greydark">{this.props.textoLabel}</h3>
          <div className="nicdark_space10"/>
            <select
              ref={(selectBox) => this.selectBox = selectBox}
              onChange={this.onChange}
              className="nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle"
              onClick={this.onClick}
            >
              <option ref={(opt1) => this.opt1 = opt1} > -- SELECCIONE UNA OPCION -- </option>
              {this.state.options}
            </select>
            <div style={{ height: '20px'}} className="nicdark_width_percentage70 nicdark_focus"/>
        </div>
      );
  }

}

export default FormSelect;
