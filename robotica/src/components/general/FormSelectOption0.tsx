import * as React from 'react';

interface PropTypes {
  option: string;
  selected?: boolean;
  value: number;
}

class FormSelectOption extends React.Component<PropTypes> {

  constructor(props: PropTypes) {
    super(props);
  }

  render() {
      return(
        <option value={this.props.value} selected={this.props.selected} >{this.props.option}</option>
      );
  }

}

export default FormSelectOption;
