import * as React from 'react';
import FormInput from '../../components/general/FormInput';
import FormInputCantidad from './childs/actualizar/FormInputCantidad';
import FormSelect from './childs/actualizar/FormSelect';
import PagoActions from './flux/PagoActions';
import PagoStore from './flux/PagoStore';
import ListElement from '../general/ListElement';
import * as Interfaces from '../../constantes/Interfaces';

interface MyState {
  pagoSelected: boolean;
  listOptions: JSX.Element[];
  pagoId: number | undefined;
  conceptosPago: string[];
  pagoActual: string;
  pagoSeleccionado: Interfaces.PagoVista;
  cantidad: number;
  importe: number;
  precio: number;
  conceptoPagoId: number;
}

class ActualizarPago extends React.Component <{}, MyState> {

  private cantidad: any;
  private importe: any;
  private precio: any;

  constructor(props: any) {
    super(props);

    this.state = {
      pagoSelected: false,
      listOptions: [],
      pagoId: 0,
      conceptosPago: [],
      pagoActual: '',
      pagoSeleccionado: {
        cantidad: 0,
        conceptoPagoId: 0,
        fecha: '',
        id: 0,
        importe: 0,
        miembroId: 0,
        numero: 0,
        precio: 0,
        concepto_letra: '',
        numero_miembro: 0
      },
      cantidad: 0,
      importe: 0,
      precio: 0,
      conceptoPagoId: 0
    };
    this.onChangeCantidad = this.onChangeCantidad.bind(this);
    this.loadPagos = this.loadPagos.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.volver = this.volver.bind(this);
    this.loadConceptos = this.loadConceptos.bind(this);
    this.renderPago = this.renderPago.bind(this);
    this.refreshConceptoInfo = this.refreshConceptoInfo.bind(this);
  }

  componentWillMount() {
    PagoStore.addChangeListener('STORE_LOAD_CONCEPTOS', this.loadConceptos);
    PagoStore.addChangeListener('STORE_LOAD_PAGOS', this.loadPagos);
    PagoStore.addChangeListener('STORE_LOAD_PAGO_BY_ID', this.renderPago);
    PagoStore.addChangeListener('STORE_LOAD_CONCEPTO_SELECCIONADO', this.refreshConceptoInfo);
    PagoActions.loadConceptos();
    PagoActions.loadPagos();
  }

  loadPagos() {

        let _listOptions: JSX.Element[] = [];

        PagoStore.getPagos().forEach( (pago, index) => {
          _listOptions.push((
                            <ListElement
                              key={index}
                              value={'PAGO NUMERO: ' + pago.numero}
                              handleClick={this.listElementClick}
                              id={pago.id}
                            />
                           ));
        });

        this.setState({
          listOptions: _listOptions
        });
  }

  renderPago() {

    this.setState({
      pagoSeleccionado: PagoStore.getPagoSeleccionado(),
      pagoSelected: true,
      pagoActual: PagoStore.getPagoSeleccionado().concepto_letra,
      cantidad: PagoStore.getPagoSeleccionado().cantidad,
      importe: PagoStore.getPagoSeleccionado().importe,
      precio: PagoStore.getPagoSeleccionado().precio,
      conceptoPagoId: PagoStore.getPagoSeleccionado().conceptoPagoId
    });

  }

  listElementClick(id: number | undefined) {

    this.setState({
      pagoId: id
    });

    PagoActions.loadPagoById(id);

  }

  loadConceptos() {

    let conceptos: string[] = [];
    PagoStore.getConceptos().forEach((concepto) => {
      conceptos.push(concepto.concepto);
    });
    this.setState({
      conceptosPago: conceptos
    });

  }

  onChangeCantidad(event: any) {

    this.setState({
      pagoSelected: false,
      cantidad: event.target.value,
      importe: event.target.value * this.state.precio
    });

    this.setState({
      pagoSelected: true
    });
  }

  onChangeSelect(event: any) {

    PagoActions.loadConceptoSeleccionado(PagoStore.getConceptoId(event.target.value));

  }

  refreshConceptoInfo() {
    this.setState({
      precio: PagoStore.getConceptoSeleccionado().precio,
      cantidad: 1,
      importe: this.state.cantidad * PagoStore.getConceptoSeleccionado().precio,
      conceptoPagoId: PagoStore.getConceptoSeleccionado().id
    });
    this.forceUpdate();
  }

  volver() {
    this.setState({
      pagoSelected: false
    });
  }

  onSubmit(event: any) {

    let objeto: Interfaces.ActualizacionPago = {
      cantidad: this.cantidad.getValue(),
      id: this.state.pagoId,
      conceptoPagoId: this.state.conceptoPagoId,
      precio: this.precio.getValue(),
      miembroId: PagoStore.getPagoSeleccionado().miembroId
    };

    PagoActions.update(objeto);

    event.preventDefault();
    event.stopPropagation();
  }

  componentWillUnmount() {
    PagoStore.removeChangeListener('STORE_LOAD_CONCEPTOS', this.loadConceptos);
    PagoStore.removeChangeListener('STORE_LOAD_PAGOS', this.loadPagos);
    PagoStore.removeChangeListener('STORE_LOAD_PAGO_BY_ID', this.renderPago);
    PagoStore.removeChangeListener('STORE_LOAD_CONCEPTO_SELECCIONADO', this.refreshConceptoInfo);
  }

  render() {
    return(
      <div>
        { this.state.pagoSelected ?
          <div>
            <input type="Button" onClick={this.volver} defaultValue="<- REGRESAR"/>
            <br/> <br/>
            <label className="col-md-10">REGISTRO DE PAGOS</label>
            <form
              className="form-horizontal col-md-10"
              onSubmit={(submit) => this.onSubmit(submit)}
            >
              <FormInput
                disabled={true}
                inputType="date"
                textoLabel="Fecha"
                value={this.state.pagoSeleccionado.fecha}
              />
              <FormInput
                disabled={true}
                inputType="number"
                textoLabel="Numero de pago"
                value={'' + this.state.pagoSeleccionado.numero}
              />
              <FormSelect
                onChangeHandler={this.onChangeSelect}
                textoLabel="Concepto de pago"
                options={this.state.conceptosPago}
                pagoActual={this.state.pagoActual}
              />
              <FormInputCantidad
                textoLabel="Cantidad"
                inputType="number"
                isRequired={true}
                onChangeHandler={this.onChangeCantidad}
                value={'' + this.state.cantidad}
                ref={(cant) => this.cantidad = cant}
              />
              <FormInput
                disabled={true}
                inputType="number"
                textoLabel="Precio"
                value={'' + this.state.precio}
                ref={(precio) => this.precio = precio}
              />
              <FormInput
                disabled={true}
                textoLabel="Importe"
                inputType="number"
                value={'' + this.state.importe}
                ref={(importe) => this.importe = importe}
              />
              <input type="Submit" defaultValue="ACTUALIZAR"/>
            </form>
          </div>
          :
          <div>
            <ul>
            {this.state.listOptions}
            </ul>
          </div>
        }
      </div>
    );
  }

}

export default ActualizarPago;
