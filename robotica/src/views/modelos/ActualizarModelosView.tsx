import * as React from 'react';
import ActualizarModelos from '../../components/modelos/ActualizarModelo';
import '../../App.css';

class ActualizarModelosVista extends React.Component {

  render() {
    return(
      <div>
        <ActualizarModelos/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default ActualizarModelosVista;
