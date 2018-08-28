import * as React from 'react';
import '../../App.css';

// Declaración de los tipos para las propiedades recibidas desde el elemento padre
interface PropTypes {
  textoLabel: string;
  maxRows?: number;
  length?: number;
  value?: string;
}

// declaración de los tipos para las variables de estado
interface MyState {
  value: string;
  length?: number;
}

class FormTextArea extends React.Component<PropTypes, MyState> {

  public static defaultProps: Partial<PropTypes> = {
      length: 40,
      value: '',
      maxRows: 8
  };

  constructor(props: PropTypes) {

    super(props);

    // value es para el contenido en el INPUT y length para el maximo de carac-
    // teres permitidos en el mismo
    this.state = {
      value: '',
      length: this.props.length
    };

    // Enlace del método 'onChange' a esta clase
    this.onChange = this.onChange.bind(this);

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
            <textarea
              maxLength={this.state.length}
              rows={this.props.maxRows}
              onChange={this.onChange}
              value={this.state.value}
              className="nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle"
              style={{resize: 'none'}}
            />
            <div style={{ height: '20px'}} className="nicdark_width_percentage70 nicdark_focus"/>
        </div>
      );
  }

}

export default FormTextArea;
