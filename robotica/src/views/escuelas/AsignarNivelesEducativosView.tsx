import * as React from 'react';
import AsignarNivelesEducativos from '../../components/niveles_escuelas/RegistroNivelEscuela';
import '../../App.css';

class AsignarNivelesEducativosVista extends React.Component {

  render() {
    return(
      <div>
        <AsignarNivelesEducativos/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default AsignarNivelesEducativosVista;
