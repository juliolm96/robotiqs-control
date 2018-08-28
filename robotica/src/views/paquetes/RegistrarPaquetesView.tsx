import * as React from 'react';
import RegistrarPaquetes from '../../components/paquetes/RegistrarPaquete';
import '../../App.css';

class RegistarPaquetesVista extends React.Component {
  
  render() {
    return(
      <div>
        <RegistrarPaquetes/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarPaquetesVista;
