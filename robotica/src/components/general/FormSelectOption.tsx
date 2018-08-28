import * as React  from 'react';

interface PropTypes {
  option: string;
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
        <option value={this.props.option} selected={this.props.selected} >{this.props.option}</option>
      );
  }

}

export default FormSelectOption;
