import * as React from 'react';
import AsignacionHorarios from '../../components/asignacion-horarios/AsignacionHorario';
import '../../App.css';

class AsignacionHorariosVista extends React.Component {

  render() {
    return(
      <div>
        <AsignacionHorarios/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default AsignacionHorariosVista;
