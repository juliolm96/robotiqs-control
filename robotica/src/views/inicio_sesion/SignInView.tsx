import * as React from 'react';
import SignIn from '../../components/inicio_sesion/SignIn';
import '../../App.css';

class RegistarHorarioServicioVista extends React.Component {

  render() {
    return(
      <div>
        <SignIn/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarHorarioServicioVista;
