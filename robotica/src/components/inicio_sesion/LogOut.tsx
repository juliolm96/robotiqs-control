import * as React from 'react';
import * as Interfaces from '../../constantes/Interfaces';
import InicioSesionActions from './flux/InicioSesionActions';

class LogOut extends React.Component {

  constructor(props: any) {
    super(props);

    let cleanObject: Interfaces.SessionObject = {
      accessToken: '',
      role: '',
      status: 0,
      tokenType: ''
    };

    if (localStorage.getItem('sessionObject') !== null) {
      localStorage.removeItem('sessionObject');
      InicioSesionActions.cerrarSesion(cleanObject);
    }

    window.location.href = '/';
  }

}

export default LogOut;
