import * as React from 'react';
import '../../../App.css';

interface MyProps {

  idDetalle: number;
  cantidad: number;
  precio: number;
  importe: number;
  concepto: string;
  codigo: string;
  eliminarHandler(idDetalle: number): void;
}

class ListItem extends React.Component<MyProps, {}> {

  render() {
    return(
      <li>
        <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
          {this.props.concepto}
        </span><br/>
        <span className="subtitle greydark">
          Cantidad:
        </span> <i className="subtitle greydark">{this.props.cantidad}</i><br/>
        <span className="subtitle greydark">
          Precio:
        </span> <i className="subtitle greydark">${this.props.precio}</i><br/>
        <span className="subtitle greydark">
          Importe
        </span> <i className="subtitle greydark">${this.props.importe}</i><br/>
        <span className="subtitle greydark">
          Código:
        </span> <i className="subtitle greydark">{this.props.codigo}</i><br/>
        <a
          className={'nicdark_btn nicdark_bg_red  ' +
          'nicdark_shadow nicdark_radius nicdark_width_percentage20 white'}
          onClick={() => this.props.eliminarHandler(this.props.idDetalle)}
          style={{marginTop: '5px'}}
        >
          Eliminar<i className="icon-cancel"/>
        </a>
        <hr className="stylished" style={{backgroundColor: "#0A8", opacity: 0.5}}/>
      </li>
    );
  }

}

export default ListItem;
