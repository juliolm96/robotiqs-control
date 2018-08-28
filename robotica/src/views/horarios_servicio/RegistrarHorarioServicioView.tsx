import * as React from 'react';
import RegistrarHorarioServicio from '../../components/horarios_servicios/HorarioServicio';
import '../../App.css';

class RegistarHorarioServicioVista extends React.Component {

  render() {
    return(
      <div>
        <RegistrarHorarioServicio/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarHorarioServicioVista;
