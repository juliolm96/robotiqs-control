import * as React from 'react';
import '../../../../App.css';

interface MyState {
  cantidad: number;
}

interface MyProps {
  concepto: string;
  precio: number;
  codigo: string;
  existencias: number;
  imagen: string;
  articuloId: number;
  addHandler(articuloId: number, cantidad: number, btnAgregar: any): void;
}

class ListItem extends React.Component<MyProps, MyState> {

  private minusButton: any;
  private plusButton: any;
  private btnAgregar: any;

  constructor(props: any) {
    super(props);

    this.state = {
      cantidad: 1
    };

    this.minusButtonClick = this.minusButtonClick.bind(this);
    this.plusButtonClick = this.plusButtonClick.bind(this);

  }

  minusButtonClick() {
    this.plusButton.disabled = false;
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
    if (this.state.cantidad >= this.props.existencias) {
      this.plusButton.disabled = true;
    } else {
      this.setState({
        cantidad: (this.state.cantidad + 1)
      });
    }

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
          <div className="nicdark_width_percentage20 nicdark_focus">
            <img
              className="producto-img-preview"
              src={'data:image/jpg;base64,' + this.props.imagen}
            />
          </div>
          <div className="nicdark_width_percentage50 nicdark_focus">
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Concepto:
            </span>&ensp;
            <i className="subtitle greydark">{this.props.concepto}</i><br/>
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Precio:
            </span>&ensp;
            <i className="subtitle greydark">${this.props.precio} MXN.</i><br/>
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Código:
            </span>&ensp;
            <i className="subtitle greydark">{this.props.codigo}</i><br/>
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Existencias:
            </span>&ensp;
            <i className="subtitle greydark">{this.props.existencias}</i><br/>
            <span className="subtitle greydark" style={{fontSize: '1.3em', fontWeight: 'bold'}}>
              Cantidad:
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
                style={{paddingLeft: '9px', paddingRight: '9px'}}
              >
                +
              </a>
              <br/><br/><br/>
              { (this.props.existencias === 0) ?
                <div className="nicdark_width_percentage40 nicdark_focus">
                  <a
                    ref={(referencia) => this.btnAgregar = referencia}
                    className={'nicdark_btn fullwidth nicdark_bg_red ' +
                      'nicdark_shadow white nicdark_radius'}
                    style={{padding: '7px'}}
                  >
                    No disponible
                  </a>
                </div>
                :
                <div className="nicdark_width_percentage40 nicdark_focus">
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
              }
            </div>
        </div>
        <br/>
        <br/>
      </li>
    );
  }

}

export default ListItem;
