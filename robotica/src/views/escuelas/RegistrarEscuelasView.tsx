import * as React from 'react';
import RegistrarEscuelas from '../../components/escuelas/FormEscuela';
import '../../App.css';

class RegistarEscuelasVista extends React.Component {

  render() {
    return(
      <div>
        <RegistrarEscuelas/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarEscuelasVista;
