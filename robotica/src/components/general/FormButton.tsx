import * as React from 'react';
import '../../styles/FormButton.css';

class FormBoton extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
      return(
        <div>
            <a className="btn btn-success FormBoton" href="#">
            <i className=""/>Enviar</a>
        </div>
      );
    }
}
export default FormBoton;
