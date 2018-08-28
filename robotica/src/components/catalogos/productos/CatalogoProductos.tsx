import * as React from 'react';
import Store from './flux/CatProdStore';
import Actions from './flux/CatProdActions';
import ListItem from './childs/ListItem';

import '../../../styles/Tabs.css';

interface MyState {
  itemsList: JSX.Element[];
  loading: boolean;
}

class CatalogoProductos extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      itemsList: [],
      loading: true
    };

    this.loadProductos = this.loadProductos.bind(this);
    this.onClickAgregarHandler = this.onClickAgregarHandler.bind(this);
  }

  componentWillMount() {
    Store.wakeUp();
    Store.addChangeListener('STORE_LOAD_PRODUCTOS', this.loadProductos);
    Actions.loadProductos();
    // localStorage.removeItem('ticketId');
  }

  loadProductos() {

    let list: JSX.Element[] = [];

    Store.getProductosList().forEach(
      (producto, index) => {
        list.push(
          <ListItem
            addHandler={this.onClickAgregarHandler}
            articuloId={producto.articuloId}
            codigo={producto.codigo}
            existencias={producto.existencias}
            concepto={producto.concepto}
            imagen={producto.imagen}
            key={index}
            precio={producto.precio}
          />
        );
      }
    );

    this.setState({
      itemsList: list,
      loading: false
    });

  }

  onClickAgregarHandler(articuloId: number, cantidad: number, btnAgregar: any) {

    if (localStorage.getItem('ticketId') !== null) {
      let ticketId = parseInt('' + localStorage.getItem('ticketId'), 10);
      Actions.addProductToTicket({ticketId: ticketId,
        articuloId: articuloId, cantidad: cantidad});
      btnAgregar.disabled = true;
    } else {
      alert('No hay un ticket actualmente en curso');
    }

  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_LOAD_PRODUCTOS', this.loadProductos);
  }

  render() {
    return(
      <div className="animation-div">
        { this.state.loading ?
          <div style={{textAlign: 'center'}}>
            <br/>
            <br/>
            <br/>
            <h3
              className="subtitle greydark"
              style={{paddingTop: '40px', marginBottom: '900px', alignContent: 'center'}}
            >
              Loading . . .
            </h3>
            <br/>
            <br/>
          </div>
          :
          <div>
            <ul>
              {this.state.itemsList}
            </ul>
          </div>
        }
      </div>
    );
  }

}

export default CatalogoProductos;
