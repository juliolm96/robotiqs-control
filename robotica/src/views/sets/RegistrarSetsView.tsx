import * as React from 'react';
import RegistrarSet from '../../components/sets/RegistrarSet';
import '../../App.css';

class RegistarSetsVista extends React.Component {
  
  render() {
    return(
      <div>
        <RegistrarSet/>
        <div className="nicdark_space20"/>
      </div>
    );
  }

}

export default RegistarSetsVista;
