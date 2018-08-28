import * as React from 'react';
import ConsultarDatosMiembro from '../../components/miembros/ConsultarDatosMiembro';
import '../../App.css';

class ConsultarMiembroView extends React.Component {

  render() {
    return(
      <div>
        <ConsultarDatosMiembro/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default ConsultarMiembroView;
