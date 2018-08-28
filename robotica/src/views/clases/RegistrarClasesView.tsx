import * as React from 'react';
import RegistrarClases from '../../components/clases/RegistrarClases';
import '../../App.css';

class RegistarClasesVista extends React.Component {

  render() {
    return(
      <div>
        <RegistrarClases/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarClasesVista;
