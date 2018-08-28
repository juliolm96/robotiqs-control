import * as React from 'react';
import '../../../../App.css';

interface MyState {
  cantidad: number;
}

interface MyProps {
  articuloId: number;
  conceptoArticulo: string;
  codigoArticulo: string;
  diasArticulo: number;
  precioArticulo: number;
  nombrePaquete?: string;
  addHandler(articuloId: number, cantidad: number, ref: any): void;
}

class ListItem extends React.Component <MyProps, MyState> {

  private minusButton: any;
  private plusButton: any;
  private btnAgregar: any;

  constructor(props: MyProps) {
    super(props);

    this.state = {
      cantidad: 1
    };

    this.minusButtonClick = this.minusButtonClick.bind(this);
    this.plusButtonClick = this.plusButtonClick.bind(this);

  }

  minusButtonClick() {

    if (this.state.cantidad <= 1) {
      this.minusButton.disabled = true;
    } else {
      this.minusButton.disabled = false;
      this.setState({
        cantidad: (this.state.cantidad - 1)
      });
    }

  }

  plusButtonClick() {
    this.minusButton.disabled = false;
    this.setState({
      cantidad: (this.state.cantidad + 1)
    });

  }

  render() {
    return(
      <li className="undecored-list">
        <div
          className={
            'nicdark_margin1820 nicdark_width_percentage100 ' +
            'nicdark_marginleft20_iphoneland nicdark_marginleft20_iphonepotr'
          }
        >
          <div className="nicdark_width_percentage40">
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Concepto:
            </span>&ensp;
            <i className="subtitle greydark" style={{fontSize: '1.1em'}}>{this.props.conceptoArticulo}</i><br/>
            {(this.props.codigoArticulo.charAt(0) === 'S') ?
              <div>
                <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
                  Paquete:
                </span>&ensp;
                  <i className="subtitle greydark" style={{fontSize: '1.1em'}}>{this.props.nombrePaquete}</i><br/>
              </div>
              :
              <div/>
            }
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Código:
            </span>&ensp;
            <i className="subtitle greydark" style={{fontSize: '1.1em'}}>{this.props.codigoArticulo}</i><br/>
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Precio:
            </span>&ensp;
            <i className="subtitle greydark" style={{fontSize: '1.1em'}}>{this.props.precioArticulo}</i><br/>
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Días
            </span>&ensp;
            <i className="subtitle greydark" style={{fontSize: '1.1em'}}>{this.props.diasArticulo}</i><br/>
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Cantidad
            </span>&ensp;
            <a
              className="nicdark_btn nicdark_bg_yellow nicdark_radius nicdark_shadow"
              ref={minusButton => this.minusButton = minusButton}
              onClick={this.minusButtonClick}
              style={{paddingLeft: '10px', paddingRight: '10px'}}
            >
              -
            </a>
              &nbsp; {this.state.cantidad} &nbsp;
            <a
              className="nicdark_btn nicdark_bg_green nicdark_radius nicdark_shadow"
              ref={plusButton => this.plusButton = plusButton}
              onClick={this.plusButtonClick}
              style={{paddingLeft: '10px', paddingRight: '10px'}}
            >
              +
            </a>
            <br/>
            <br/>
            <div className="nicdark_width_percentage50">
              <a
                onClick={
                  (ref) => this.props.addHandler(
                    this.props.articuloId,
                    this.state.cantidad,
                    this.btnAgregar)
                }
                ref={(referencia) => this.btnAgregar = referencia}
                className={'nicdark_btn fullwidth nicdark_bg_green ' +
                  'nicdark_shadow white nicdark_radius nicdark_press'}
                style={{padding: '7px'}}
              >
                Agregar <i className="icon-plus"/>
              </a>
            </div>
          </div>
          <br/>
        </div>
      </li>
    );
  }

}

export default ListItem;
