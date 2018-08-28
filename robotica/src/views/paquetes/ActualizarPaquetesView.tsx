import * as React from 'react';
import ActualizarPaquetes from '../../components/paquetes/ActualizarPaquete';
import '../../App.css';

class ActualizarPaquetesVista extends React.Component {

  render() {
    return(
      <div>
        <ActualizarPaquetes/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default ActualizarPaquetesVista;
