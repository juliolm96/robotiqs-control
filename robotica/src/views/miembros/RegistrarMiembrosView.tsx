import * as React from 'react';
import RegistroMiembros from '../../components/miembros/RegistroMiembros';
import '../../App.css';

class RegistarMiembrosVista extends React.Component {

  render() {
    return(
      <div>
        <RegistroMiembros/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarMiembrosVista;
