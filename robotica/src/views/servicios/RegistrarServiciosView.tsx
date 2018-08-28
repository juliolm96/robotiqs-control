import * as React from 'react';
import RegistrarServicios from '../../components/servicios/RegistrarServicios';
import '../../App.css';

class RegistrarServiciosVista extends React.Component {
  
  render() {
    return(
      <div>
        <RegistrarServicios/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistrarServiciosVista;
