import * as React from 'react';
import BusquedaAsignacionHorarios from '../../components/asignacion-horarios/BusquedaAsignacionHorario';
import '../../App.css';

class BusquedaAsignacionHorariosVista extends React.Component {

  render() {
    return(
      <div>
        <BusquedaAsignacionHorarios/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default BusquedaAsignacionHorariosVista;
