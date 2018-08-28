import * as React from 'react';
import FormEscuela from '../escuelas/FormEscuela';

class Escuela extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <FormEscuela/>
    );
  }

}

export default Escuela;
