import * as React from 'react';
import RegistrarPasoConstruccion from '../../components/construccion/RegPasoConstruccion';
import '../../App.css';

class RegistarPasoConstruccionVista extends React.Component {

  render() {
    return(
      <div>
        <RegistrarPasoConstruccion/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarPasoConstruccionVista;
