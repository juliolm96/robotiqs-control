import * as React from 'react';
import '../../../styles/Tabs.css';

interface MyProps {
  clickHandler(tabId: string): void;
}

interface MyState {
  classProductos: string;
  classServicios: string;
  classCarrito: string;
  claseEstandar: string;
  colorNegro: string;
  colorCarrito: string;
  colorProductos: string;
  colorServicios: string;
}

class Tabs extends React.Component<MyProps, MyState> {

  private tabProductos: any;
  private tabServicios: any;
  private tabCarrito: any;

  constructor(props: any) {
    super(props);

    let claseEstandar: string = 'standar-tab nicdark_tooltip nicdark_btn ' +
      'medium nicdark_radius_top white';
    let colorProductos: string = ' nicdark_bg_blue';
    let colorServicios: string = ' nicdark_bg_yellow';
    let colorCarrito: string = ' nicdark_bg_green';
    let colorNegro: string = ' nicdark_bg_greydark';

    this.state = {
      classCarrito: claseEstandar + colorCarrito,
      classProductos: claseEstandar + colorProductos,
      classServicios: claseEstandar + colorServicios,
      claseEstandar: claseEstandar,
      colorNegro: colorNegro,
      colorCarrito: colorCarrito,
      colorProductos: colorProductos,
      colorServicios: colorServicios
    };

  }

  onClickTab(target: any) {
    if (target.id === 'tb1') {
      this.setState({
        classProductos: this.state.claseEstandar + this.state.colorNegro,
        classServicios: this.state.claseEstandar + this.state.colorServicios,
        classCarrito: this.state.claseEstandar + this.state.colorCarrito
      });
    } else if (target.id === 'tb2') {
      this.setState({
        classProductos: this.state.claseEstandar + this.state.colorProductos,
        classServicios: this.state.claseEstandar + this.state.colorNegro,
        classCarrito: this.state.claseEstandar + this.state.colorCarrito
      });
    } else if (target.id === 'tb3') {
      this.setState({
        classProductos: this.state.claseEstandar + this.state.colorProductos,
        classServicios: this.state.claseEstandar + this.state.colorServicios,
        classCarrito: this.state.claseEstandar + this.state.colorNegro
      });
    }

    this.props.clickHandler(target.id);
  }

  render() {
    return(
      <section className="nicdark_section nicdark_bg_grey">
        <div className="nicdark_container nicdark_clearfix">
          <div className="grid grid_12">
            <div className="nicdark_tab" style={{marginTop: '10px', marginLeft: '-18px'}}>
              <ul className="nicdark_tabslist grey">
                  <li>
                    <a
                      title="Sección de productos"
                      href="#tabs-1"
                      className={this.state.classProductos}
                      id="tb1"
                      ref={(productos) => this.tabProductos = productos}
                      onClick={() => this.onClickTab(this.tabProductos)}
                    >
                      <i className={'icon-shop nicdark_displaynone_iphoneland ' +
                        'nicdark_displaynone_iphonepotr nicdark_marginright10'}
                      />
                      Productos
                    </a>
                  </li>
                  <li>
                    <a
                      title="Clases presenciales y suscripciones"
                      href="#tabs-2"
                      id="tb2"
                      className={this.state.classServicios}
                      ref={(servicios) => this.tabServicios = servicios}
                      onClick={() => this.onClickTab(this.tabServicios)}
                    >
                      <i
                        className={'icon-lightbulb-1 nicdark_displaynone_iphoneland ' +
                        'nicdark_displaynone_iphonepotr nicdark_marginright10'}
                      />
                      Servicios
                    </a>
                  </li>
                  <li>
                    <a
                      title="Carrito de productos"
                      href="#tabs-3"
                      id="tb3"
                      className={this.state.classCarrito}
                      ref={(carrito) => this.tabCarrito = carrito}
                      onClick={() => this.onClickTab(this.tabCarrito)}
                    >
                      <i
                        className={'icon-basket nicdark_displaynone_iphoneland ' +
                        'nicdark_displaynone_iphonepotr nicdark_marginright10'}
                      />
                      Resumen
                    </a>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

}

export default Tabs;
