import * as React  from 'react';

// Declaración de los tipos para las propiedades recibidas desde el elemento padre
interface PropTypes {
  textoLabel: string;
  inputType: string;
  length?: number;
  value: string;
  disabled?: boolean;
  isRequired?: boolean;
}

// declaración de los tipos para las variables de estado
interface MyState {
  value: string;
  length?: number;
  renderComponent?: boolean;
}

class FormInput extends React.Component<PropTypes, MyState> {

  // ya que puede, o no, ponerse un length para el campo del tipo TEXT se asigna
  // un valor por defecto al maximo de carácteres que se pueden ingresar a un INPUT
  public static defaultProps: Partial<PropTypes> = {
      length: 10,
      disabled: false,
      isRequired: false
  };

  constructor(props: PropTypes) {

    super(props);

    // value es para el contenido en el INPUT y length para el maximo de carac-
    // teres permitidos en el mismo
    this.state = {
      value: this.props.value,
      length: this.props.length,
      renderComponent: false
    };

    // Enlace del método 'onChange' a esta clase
    this.onChange = this.onChange.bind(this);

  }

 componentWillReceiveProps(nextProps: any) {
   this.setState({
     value: '' + nextProps.value,
     length: nextProps.length,
     renderComponent: true
   });
   this.forceUpdate();
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
  return this.state.value;
  }
/*
  componentDidMount() {
    this.setState({
      value: '' +  this.props.value,
      renderComponent: false
    });
  } */

  render(): JSX.Element {

      return(
        <div className="nicdark_focus nicdark_width_percentage70">
          { this.state.renderComponent ?
            <div>
              <div className="nicdark_space20"/>
              <h3 className="subtitle greydark">{this.props.textoLabel}</h3>
              <div className="nicdark_space10"/>
              <input
                maxLength={this.state.length}
                type={this.props.inputType}
                className={
                  'nicdark_bg_grey2 nicdark_radius ' +
                  'nicdark_width_percentage100 nicdark_shadow grey medium subtitle'
                }
                value={this.state.value}
                disabled={this.props.disabled}
                required={this.props.isRequired}
                onChange={this.onChange}
                style={{fontSize: '1.7em', color: 'grey'}}
              />
              <div style={{ height: '20px'}} className="nicdark_width_percentage70 nicdark_focus"/>
            </div>
            :
            <div/>
          }
        </div>
      );
  }

}

export default FormInput;
