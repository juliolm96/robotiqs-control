import * as React from 'react';
import ActualizarMiembro from '../../components/miembros/ActualizarMiembro';
import '../../App.css';

class ActualizarMiembrosVista extends React.Component {

  render() {
    return(
      <div>
        <ActualizarMiembro/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default ActualizarMiembrosVista;
