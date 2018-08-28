import * as React  from 'react';

// Declaración de los tipos para las propiedades recibidas desde el elemento padre
interface PropTypes {
  textoLabel: string;
  inputType: string;
  length?: number;
  value?: string;
  disabled?: boolean;
  isRequired?: boolean;
  onChangeHandler(something: any): void;
}

// declaración de los tipos para las variables de estado
interface MyState {
  value: string;
  length?: number;
}

class FormInputCantidad extends React.Component<PropTypes, MyState> {

  // ya que puede, o no, ponerse un length para el campo del tipo TEXT se asigna
  // un valor por defecto al maximo de carácteres que se pueden ingresar a un INPUT
  public static defaultProps: Partial<PropTypes> = {
      length: 40,
      value: '',
      disabled: false,
      isRequired: false
  };

  constructor(props: PropTypes) {

    super(props);

    // value es para el contenido en el INPUT y length para el maximo de carac-
    // teres permitidos en el mismo
    this.state = {
      value: '',
      length: this.props.length
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event: any) {
    this.setState({
      value: event.target.value
    });
    this.props.onChangeHandler(event);
  }

  // Método para obtener el valor guardado en la variable de estado, accesible
  // desde el componente padre
  getValue(): string {
    return this.state.value;
  }

  componentWillMount() {
    this.setState({
      value: '' + this.props.value
    });
  }

  render(): JSX.Element {
      return(
        <div className="form-group">
            <label>{this.props.textoLabel}</label>&nbsp;
            <input
              maxLength={this.state.length}
              type={this.props.inputType}
              className="form-control"
              onChange={(onchange) => this.onChange(onchange)}
              value={this.state.value}
              disabled={this.props.disabled}
              required={this.props.isRequired}
            />
        </div>
      );
  }

}

export default FormInputCantidad;
