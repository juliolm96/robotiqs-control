import * as React from 'react';
import Actions from './flux/CatServActions';
import Store from './flux/CatServStore';
import ListItem from './childs/ListItem';

interface MyState {
  itemsList: JSX.Element[];
  loading: boolean;
}

class CatalogoServicios extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      itemsList: [],
      loading: true
    };

    this.loadServiciosList = this.loadServiciosList.bind(this);

  }

  componentWillMount() {
    Store.wakeUp();
    Store.addChangeListener('STORE_LOAD_SERVICIOS', this.loadServiciosList);
    Actions.loadServicios();
  }

  loadServiciosList() {

    let list: JSX.Element[] = [];

    Store.getServiciosList().forEach(
      (servicio, index) => {
        if (servicio.nombrePaquete != null) {
          list.push(
            <ListItem
              addHandler={this.addToTicketHandler}
              articuloId={servicio.articuloId}
              codigoArticulo={servicio.codigo}
              precioArticulo={servicio.precio}
              nombrePaquete={servicio.nombrePaquete}
              conceptoArticulo={servicio.concepto}
              diasArticulo={servicio.dias}
              key={index}
            />);
        } else {
          list.push(
            <ListItem
              addHandler={this.addToTicketHandler}
              articuloId={servicio.articuloId}
              codigoArticulo={servicio.codigo}
              precioArticulo={servicio.precio}
              conceptoArticulo={servicio.concepto}
              diasArticulo={servicio.dias}
              key={index}
            />);
        }
      }
    );

    this.setState({
      itemsList: list,
      loading: false
    });

  }

  addToTicketHandler(articuloId: number, cantidad: number, ref: any) {

    if (localStorage.getItem('ticketId') !== null) {
      let ticketId: number = parseInt('' + localStorage.getItem('ticketId'), 10);
      Actions.addProductToTicket({ticketId: ticketId, articuloId: articuloId, cantidad: cantidad});
      ref.disabled = true;
    } else {
      alert('No hay un ticket al cual agregar el servicio');
    }

  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_LOAD_SERVICIOS', this.loadServiciosList);
  }

  render() {
    return(
      <div className="animation-div">
      { this.state.loading ?
        <div>
          <h3
            className="subtitle greydark"
            style={{paddingTop: '300px', marginTop: '200px', marginBottom: '200px', alignContent: 'center'}}
          >
            Loading . . .
          </h3>
        </div>
        :
        <div style={{marginRight: '50px'}}>
          <ul>
            {this.state.itemsList}
          </ul>
        </div>
      }
      </div>
    );
  }

}

export default CatalogoServicios;
