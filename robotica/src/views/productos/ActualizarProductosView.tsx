import * as React from 'react';
import ActualizarProductos from '../../components/productos/ActualizarProductos';
import '../../App.css';

class ActualizarProductosVista extends React.Component {

  render() {
    return(
      <div>
        <ActualizarProductos/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default ActualizarProductosVista;
