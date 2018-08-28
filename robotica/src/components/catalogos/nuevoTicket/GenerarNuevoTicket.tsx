import * as React from 'react';
import FormSelect from './childs/FormSelect';
import Actions from './flux/TicketActions';
import Store from './flux/TicketStore';

interface MyState {

  options: string[];
  socioId: number;

}

class GenerarNuevoTicket extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state = {
      options: [],
      socioId: 0
    };

    this.loadSocios = this.loadSocios.bind(this);
    this.setSocioId = this.setSocioId.bind(this);
    this.buttonOnClick = this.buttonOnClick.bind(this);
  }

  componentWillMount() {
    Store.wakeUp();
    Store.addChangeListener('STORE_LOAD_SOCIOS', this.loadSocios);
    Store.addChangeListener('STORE_LOAD_SOCIO_BY_NUMBER', this.setSocioId);
    Store.addChangeListener('STORE_CREATE_NEW_TICKET', this.setTicketId);
    Actions.loadSocios();
  }

  loadSocios() {
    let options: string[] = [];

    Store.getSociosList().forEach(
      (socio, index) => {
          options.push(
            socio.numero + '---' + socio.nombre
          );
      }
    );

    this.setState({
      options: options
    });

    this.forceUpdate();
  }

  formSelectOnChange(event: any) {
    // Variable para sacar el numero de socio
    let tempString: string [] = [];
    tempString.push(event.target.value);

    tempString = tempString[0].split('---', 1);

    Actions.loadSocioByNumber(parseInt(tempString[0], 10));

  }

  setSocioId() {
    this.setState({
      socioId: parseInt('' + Store.getSocioSeleccionado().id, 10)
    });
  }

  buttonOnClick(event: any) {
    if (localStorage.getItem('ticketId') === null) {
      if (this.state.socioId !== 0) {
        event.target.disabled = true;
        Actions.createNewTicket(this.state.socioId);
      } else {
        alert('SELECCIONE UN SOCIO RELACIONADO A LA VENTA');
      }
    } else {
      alert('Ya existe un ticket en curso');
    }

  }

  setTicketId() {
    localStorage.setItem('ticketId', '' + Store.getTicketId());
    alert('Ticket generado con exito');
    window.location.href = 'catalogo/';
  }

  componentWillUnmount() {
    Store.removeChangeListener('STORE_LOAD_SOCIOS', this.loadSocios);
    Store.removeChangeListener('STORE_LOAD_SOCIO_BY_NUMBER', this.setSocioId);
    Store.removeChangeListener('STORE_CREATE_NEW_TICKET', this.setTicketId);
  }

  render() {
    return(
      <div className="animation-div" style={{marginTop: '40px'}}>
        <FormSelect
          onChangeHandler={this.formSelectOnChange}
          options={this.state.options}
          textoLabel="Seleccionar socio"
        />
        <br/><br/>
        <div className="nicdark_focus nicdark_width_percentage50">
          <div className="nicdark_focus nicdark_width_percentage50">
            <a
              onClick={this.buttonOnClick}
              className={
                'nicdark_btn fullwidth nicdark_bg_blue medium ' +
                'nicdark_shadow nicdark_radius white nicdark_press'
              }
            >
              <i className="icon-doc-text-1"/>Generar Ticket
            </a>
            <div className="nicdark_space20"/>
          </div>
        </div>
      </div>
    );
  }

}

export default GenerarNuevoTicket;
