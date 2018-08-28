import * as React from 'react';
import Actions from './flux/Actions';
import Store from './flux/Store';
import ListItem from './childs/ListItem';
import FormSelect from './childs/FormSelect';
import * as Interfaces from '../../constantes/Interfaces';
import '../../App.css';

interface MyState {
  itemsList: JSX.Element[];
  loaded: boolean;
  infoLoaded: boolean;
  metodoPago: string;
  ticket: Interfaces.Ticket;
}

class ListaArticulos extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      itemsList: [],
      loaded: false,
      infoLoaded: false,
      metodoPago: '',
      ticket: {
        estado: '',
        fecha: '',
        folio: '',
        forma_pago: '',
        hora: '',
        id: 0,
        iva: 0,
        nombre_socio: '',
        socioId: 0,
        subtotal: 0,
        total: 0
      }
    };

    this.loadDetallesTicket = this.loadDetallesTicket.bind(this);
    this.metodoPagoOnChange = this.metodoPagoOnChange.bind(this);
    this.pagarTicket = this.pagarTicket.bind(this);
    this.loadInfoTicket = this.loadInfoTicket.bind(this);
  }

  componentWillMount() {
    Store.wakeUp();
    Store.addChangeListener('STORE_LOAD_DETALLES_TICKET', this.loadDetallesTicket);
    Store.addChangeListener('STORE_LOAD_INFO_TICKET', this.loadInfoTicket);

    if (localStorage.getItem('ticketId') !== null) {
      Actions.loadDetallesTicket(parseInt('' + localStorage.getItem('ticketId'), 10));
      Actions.loadInfoTicket(parseInt('' + localStorage.getItem('ticketId'), 10));
    } else {
      alert('No se ha generado un ticket');
      window.location.href = '/catalogo';
    }

  }

  loadDetallesTicket() {
    let lista: JSX.Element[] = [];
    Store.getDetallesTicketList().forEach(
      (detalle, index) => {
        lista.push(
          <ListItem
            cantidad={detalle.cantidad}
            codigo={'' + detalle.codigoArticulo}
            concepto={'' + detalle.conceptoArticulo}
            eliminarHandler={this.eliminarHandler}
            idDetalle={detalle.id}
            importe={detalle.importe}
            key={index}
            precio={detalle.precio}
          />
        );
      }
    );

    this.setState({
      itemsList: lista,
      loaded: true
    });

  }

  loadInfoTicket() {
    this.setState({
      ticket: Store.getInfoTicket(),
    });

    this.setState({
      infoLoaded: true
    });

  }

  eliminarHandler(idDetalle: number) {
    Actions.eliminarArticulo(idDetalle);
    window.location.reload();
  }

  cancelarTicket() {
    let cancelacion: boolean = confirm('¿Deséa cancelar el ticket en curso?');
    if (cancelacion) {
      Actions.cancelarTicket(parseInt('' + localStorage.getItem('ticketId'), 10));
    }
  }

  metodoPagoOnChange(event: any) {

    let metodo: string = event.target.value;

    if (metodo === 'Efectivo') {
      this.setState({
        metodoPago: 'EF'
      });
    } else if (metodo === 'Tarjeta de crédito') {
      this.setState({
        metodoPago: 'TC'
      });
    } else if (metodo === 'Tarjeta de debito') {
      this.setState({
        metodoPago: 'TD'
      });
    }

  }

  pagarTicket() {

    if (this.state.metodoPago !== '') {
      let metodoPago: string = this.state.metodoPago;
      let ticketId: number = parseInt('' + localStorage.getItem('ticketId'), 10);

      Actions.pagarTicket(metodoPago, ticketId);
    } else {
      alert('Por favor, seleccione un método de pago');
    }
  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_LOAD_DETALLES_TICKET', this.loadDetallesTicket);
  }

  render() {
    return(
      <div className="animation-div" style={{marginRight: '50px'}}>
        <br/>
        { this.state.loaded ?
          <div>
            { (this.state.infoLoaded) ?
              <div>
                <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                  Folio:
                </span>&ensp;
                <i className="subtitle greydark">{this.state.ticket.folio}</i><br/>
                <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                  Fecha:
                </span>&ensp;
                <i className="subtitle greydark">{this.state.ticket.fecha}</i><br/>
                <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                  Hora:
                </span>&ensp;
                <i className="subtitle greydark">{this.state.ticket.hora}</i><br/>
                <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                  Socio:
                </span>&ensp;
                <i className="subtitle greydark">{this.state.ticket.nombre_socio}</i><br/>
                <br/>
              </div>
              :
              <div/>
            }
            <hr className="stylished nicdark_bg_blue"/>
            <ul className="undecored-list">
              {this.state.itemsList}
            </ul>
            { (localStorage.getItem('ticketId') !== null &&
                this.state.itemsList.length > 0) ?
                <div>
                  <div>
                  <div className="text-right">
                    <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                      SUBTOTAL:
                    </span>&ensp;
                    <i className="subtitle greydark">${this.state.ticket.subtotal}</i><br/>
                    <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                      IVA:
                    </span>&ensp;
                    <i className="subtitle greydark">${this.state.ticket.iva}</i><br/>
                    <span className="subtitle greydark" style={{fontSize: '1.2em', fontWeight: 'bold'}}>
                      TOTAL:
                    </span>&ensp;<i className="subtitle greydark">${this.state.ticket.total}</i><br/>
                  </div>
                  <div className="nicdark_width_percentage100">
                    <FormSelect
                      onChangeHandler={this.metodoPagoOnChange}
                      options={['Efectivo', 'Tarjeta de crédito',
                        'Tarjeta de debito']}
                      textoLabel="Metodo de pago"
                    />
                  </div>
                </div>
               <div className="nicdark_width_percentage50">
                 <a
                  className={'nicdark_bg_green nicdark_width_percentage50 nicdark_btn ' +
                  'white nicdark_press nicdark_shadow nicdark_radius'}
                  onClick={this.pagarTicket}
                  style={{paddingTop: '5px', paddingBottom: '5px'}}
                 >
                   Pagar&nbsp;<i className="icon-dollar"/>
                 </a>
               </div>
              </div>
               :
               <div/>
             }
             <div className="nicdark_space50"/>
             { (localStorage.getItem('ticketId') !== null) ?
               <div className="nicdark_width_percentage40">
                 Cancelar ticket&nbsp;
                 <a
                   className={'nicdark_bg_red nicdark_btn ' +
                   'white nicdark_press nicdark_shadow nicdark_radius'}
                   style={{width: '25px', height: '25px', paddingRight: '4px'}}
                   onClick={this.cancelarTicket}
                 >
                   <i className="icon-cancel"/>
                 </a>
                 <br/><br/>
               </div>
               :
               <div/>
             }
          </div>
          :
          <div>
            <h3
              className="subtitle greydark"
              style={{paddingTop: '40px', marginBottom: '700px', alignContent: 'center'}}
            >
              Loading . . .
            </h3>
          </div>
        }
      </div>
    );
  }

}

export default ListaArticulos;
