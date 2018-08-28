import * as React  from 'react';
import FormSelectOption from '../../../general/FormSelectOption';

interface PropTypes {
  textoLabel: string;
  options: string[];
  pagoActual: string;
  onChangeHandler(target: any): void;
}

interface MyState {
  options: JSX.Element[];
}

let upd = 0;

class FormSelect extends React.Component<PropTypes, MyState> {

  private opt1: any;

  constructor(props: PropTypes) {

    super(props);

    this.state = {
      options: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {

      var rows: JSX.Element[] = [] ;
      for (var i = 0; i < this.props.options.length; i++) {
        if (this.props.pagoActual === this.props.options[i]) {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]} selected={true}/>);
        } else {
          rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
        }

      }
      this.setState({
        options: rows
      });

  }

  componentWillReceiveProps() {

    var rows: JSX.Element[] = [] ;
    for (var i = 0; i < this.props.options.length; i++) {
      if (this.props.pagoActual === this.props.options[i]) {
        rows.push(<FormSelectOption key={i} option={this.props.options[i]} selected={true}/>);
      } else {
        rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
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

  onClick() {
    this.opt1.disabled = true;
  }

  getOpt(): any {
    return this.opt1;
  }

  render() {
      return(
        <div className="form-group">
            <label> {this.props.textoLabel} </label>&nbsp;
            <select
              onChange={(target) => this.props.onChangeHandler(target)}
              onClick={this.onClick}
              className="form-control"
            >
            <option ref={(opt1) => this.opt1 = opt1} > -- SELECCIONE UNA OPCION -- </option>
              {this.state.options}
            </select>
        </div>
      );
  }

}

export default FormSelect;
