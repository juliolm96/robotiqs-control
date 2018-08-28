import * as React from 'react';
import FormSelectOption from '../../../general/FormSelectOption';

interface PropTypes {
  textoLabel: string;
  options: string[];
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
          rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
      }
      this.setState({
        options: rows
      });

  }

  componentWillReceiveProps() {

    var rows: JSX.Element[] = [] ;

    for (var i = 0; i < this.props.options.length; i++) {
        rows.push(<FormSelectOption key={i} option={this.props.options[i]}/>);
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
        <div className="nicdark_focus nicdark_width_percentage70">
          <div className="nicdark_space20"/>
          <h3 className="subtitle greydark">{this.props.textoLabel}</h3>
          <div className="nicdark_space10"/>
          <select
            onChange={(target) => this.props.onChangeHandler(target)}
            className="nicdark_bg_grey2 nicdark_radius nicdark_shadow grey medium subtitle"
            onClick={this.onClick}
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
