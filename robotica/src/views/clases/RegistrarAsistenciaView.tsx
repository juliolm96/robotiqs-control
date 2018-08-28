import * as React from 'react';
import RegistrarAsistencia from '../../components/clases/RegistrarAsistencia';
import '../../App.css';

class RegistarAsistenciaVista extends React.Component {

  render() {
    return(
      <div>
        <RegistrarAsistencia/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarAsistenciaVista;
