import * as React  from 'react';
import * as jQuery from 'jquery';

// Declaración de los tipos para las propiedades recibidas desde el elemento padre
interface PropTypes {
  textoLabel: string;
  inputType: string;
  length?: number;
  value?: string;
  disabled?: boolean;
  isRequired?: boolean;
}

// declaración de los tipos para las variables de estado
interface MyState {
  value: string;
  length?: number;
  inputType: string;
  class: string;
}

class FormInput extends React.Component<PropTypes, MyState> {

  // ya que puede, o no, ponerse un length para el campo del tipo TEXT se asigna
  // un valor por defecto al maximo de carácteres que se pueden ingresar a un INPUT
  public static defaultProps: Partial<PropTypes> = {
      length: 40,
      value: '',
      disabled: false,
      isRequired: false
  };

  private input: any;

  constructor(props: PropTypes) {

    super(props);

    // value es para el contenido en el INPUT y length para el maximo de carac-
    // teres permitidos en el mismo
    if (this.props.inputType === 'date') {
      this.state = {
        value: '',
        length: this.props.length,
        inputType: 'text',
        class: 'nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle nicdark_calendar'
      };
    } else {
      this.state = {
        value: '',
        length: this.props.length,
        inputType: this.props.inputType,
        class: 'nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle'
      };
    }

    // Enlace del método 'onChange' a esta clase
    this.onChange = this.onChange.bind(this);

  }

  componentDidMount() {

    if (this.props.inputType === 'date') {
      jQuery('.nicdark_calendar').datepicker({ dateFormat: 'yy-mm-dd' });
    }

    if (this.props.inputType === 'number' && this.state.inputType !== 'text') {
      this.setState({
        inputType: 'text'
      });
      this.input.pattern = '[0-9]+[\.]{0,1}[0-9]{0,2}';
      this.input.title = 'El formato solo acepta numeros, sin guiones ni caracteres especiales';
    }
  }

  // esté metodo es llamado cada que se hace un cambio en el INPUT, ya sea borrar
  // un carácter o escribirlo. Lo que hace es actualizar la variable de estado
  // 'value' con lo escrito en el INPUT
  onChange(event: any) {

    this.setState({
      value: event.target.value
    });

  }

  // Método para obtener el valor guardado en la variable de estado, accesible
  // desde el componente padre
  getValue(): string {
    if (this.props.inputType === 'date') {
      return this.input.value;
    } else {
      return this.state.value;
    }
  }

  componentWillMount() {
    this.setState({
      value: '' + this.props.value
    });
  }

  render(): JSX.Element {
      return(
        <div className="nicdark_focus nicdark_width_percentage70">
            <div className="nicdark_space20"/>
            <h3 className="subtitle greydark">{this.props.textoLabel}</h3>
            <div className="nicdark_space10"/>
            <input
              maxLength={this.state.length}
              type={this.state.inputType}
              className={this.state.class}
              onChange={this.onChange}
              value={this.state.value}
              disabled={this.props.disabled}
              required={this.props.isRequired}
              ref={(inp) => this.input = inp}
            />
            <div style={{ height: '20px'}} className="nicdark_width_percentage70 nicdark_focus"/>
        </div>
      );
  }

}

export default FormInput;
