import * as React from 'react';

interface MyProps {
  objeto: any;
  isHeader: boolean;
}

interface MyState {
  celdas: JSX.Element[];
}

class TableRow extends React.Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);

    this.state = {
      celdas: []
    };

  }

  componentWillMount() {

    let celdas: JSX.Element[] = [];
    let keys: string[] = Object.keys(this.props.objeto);
    if (this.props.isHeader) {
      keys.forEach((key, index) => {
        celdas.push(<th key={index}> {key} </th>);
      });
    } else {
      keys.forEach((key, index) => {
        celdas.push(<td key={index}> {this.props.objeto[key]}</td>);
      });
    }
    this.setState({
      celdas: celdas
    });

  }

  render() {
    return(
      <tr>
        {this.state.celdas}
      </tr>
    );
  }

}

export default TableRow;
