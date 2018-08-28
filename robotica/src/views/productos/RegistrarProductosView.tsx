import * as React from 'react';
import RegistrarProductos from '../../components/productos/RegistrarProductos';
import '../../App.css';

class RegistarProductosVista extends React.Component {

  render() {
    return(
      <div>
        <RegistrarProductos/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarProductosVista;
