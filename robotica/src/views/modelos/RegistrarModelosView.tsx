import * as React from 'react';
import RegistroModelos from '../../components/modelos/RegistrarModelo';
import '../../App.css';

class RegistarModelosVista extends React.Component {

  render() {
    return(
      <div>
        <RegistroModelos/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarModelosVista;
