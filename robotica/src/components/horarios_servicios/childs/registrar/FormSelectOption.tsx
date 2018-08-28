import * as React  from 'react';

interface PropTypes {
  option: {'label': string, 'value': string};
  selected?: boolean;
  id?: number;
}

class FormSelectOption extends React.Component<PropTypes> {

  constructor(props: PropTypes) {
    super(props);
  }

  getId() {
    return this.props.id;
  }

  render() {
      return(
        <option value={this.props.option.value} selected={this.props.selected} >{this.props.option.label}</option>
      );
  }

}

export default FormSelectOption;
