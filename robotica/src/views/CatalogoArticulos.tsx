import * as React from 'react';
import CatalogoServicios from '../components/catalogos/servicios/CatalogoServicios';
import CatalogoProductos from '../components/catalogos/productos/CatalogoProductos';
import ListaArticulosTicket from '../components/articulos_ticket/ListaArticulos';
import Tabs from '../components/catalogos/Tabs';
import GenerarNuevoTicket from '../components/catalogos/nuevoTicket/GenerarNuevoTicket';
import '../App.css';

interface MyState {
  componente: string;
  ticketSelected: boolean;
}

class CatalogoArticulos extends React.Component<{} , MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      componente: 'tb1',
      ticketSelected: false
    };

    this.menuOnClick = this.menuOnClick.bind(this);

  }

  componentWillMount() {

    if (localStorage.getItem('ticketId') !== null) {
      this.setState({
        ticketSelected: true
      });
    }

  }

  menuOnClick(component: string) {

    this.setState({
      componente: component
    });

  }

  render() {
    return(
      <section className="nicdark_section">
        <div className="nicdark_container nicdark_clearfix" style={{marginTop: '-40px'}}>
          { !this.state.ticketSelected ?
            <GenerarNuevoTicket/>
            :
            <div>
              <Tabs clickHandler={this.menuOnClick}/>
              <div>
                {
                  (() => {
                           switch (this.state.componente) {
                            case 'tb3': return (<ListaArticulosTicket/>);
                            case 'tb1': return (<CatalogoProductos/>);
                            case 'tb2': return (<CatalogoServicios/>);
                            default: return (<div/>);
                           }
                         })()
                }
              </div>
            </div>
          }
        </div>
      </section>
    );
  }

}

export default CatalogoArticulos;
