import * as React from 'react';
import ConceptoPagoActions from './flux/ConceptoPagoActions';
import ConceptoPagoStore from './flux/ConceptoPagoStore';
import FormInput from '../general/FormInput';
import ListElement from '../general/ListElement';
import * as Interfaces from '../../constantes/Interfaces';

interface MyState {
  listOptions: JSX.Element[];
  conceptoSelected: boolean;
  conceptoPago: Interfaces.ConceptoPago;
}

class ActualizarConceptoPago extends React.Component<{}, MyState> {

  private clave: any;
  private concepto: any;
  private numeroClases: any;
  private precio: any;

  constructor(props: any) {
    super(props);
    this.state = {
      conceptoSelected: false,
      listOptions: [],
      conceptoPago: {
        clave: '',
        concepto: '',
        id: 0,
        numero_clases: 0,
        precio: 0
      }
    };

    ConceptoPagoStore.wakeUp();
    this.objectsLoaded = this.objectsLoaded.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.renderConcepto = this.renderConcepto.bind(this);
    this.volver = this.volver.bind(this);
  }

  componentWillMount() {
    ConceptoPagoActions.loadConceptosPago();
    ConceptoPagoStore.addChangeListener('STORE_LOAD_CONCEPTOS_PAGO', this.objectsLoaded);
    ConceptoPagoStore.addChangeListener('STORE_SHOW_CONCEPTO_PAGO', this.renderConcepto);
  }

  onSubmit(event: any) {
    ConceptoPagoActions.setClave(this.clave.getValue());
    ConceptoPagoActions.setConcepto(this.concepto.getValue());
    ConceptoPagoActions.setNumero_clases(this.numeroClases.getValue());
    ConceptoPagoActions.setPrecio(this.precio.getValue());
    ConceptoPagoActions.updateConceptoPago();
    event.preventDefault();
    event.stopPropagation();
  }

  listElementClick(id: number | undefined) {
    ConceptoPagoActions.showConceptoPago(id);
  }

  renderConcepto() {
    this.setState({
      conceptoPago: ConceptoPagoStore.getConceptoPagoActual(),
      conceptoSelected: true
    });
  }

  objectsLoaded() {
    let listOptions: JSX.Element[] = [];
    ConceptoPagoStore.getConceptosPago().forEach((conceptoPago, index) => {
      listOptions.push(
                        <ListElement
                          handleClick={this.listElementClick}
                          id={conceptoPago.id}
                          key={index}
                          value={'DESCRIPCION: ' + conceptoPago.concepto +
                                ' CLAVE: ' + conceptoPago.clave}
                        />
      );
    });
    this.setState({
      listOptions: listOptions
    });

  }

  componentWillUnmount() {
    ConceptoPagoStore.removeChangeListener('STORE_LOAD_CONCEPTOS_PAGO', this.objectsLoaded);
    ConceptoPagoStore.removeChangeListener('STORE_SHOW_CONCEPTO_PAGO', this.renderConcepto);
  }

  volver() {
    this.setState({
      conceptoSelected: false
    });
  }

  render() {
    return(
      <div>
        { this.state.conceptoSelected ?
        <div>
        <input type="Button" onClick={this.volver} defaultValue="<- REGRESAR"/>
        <br/> <br/>
          <label className="col-md-10">INFORMACION SETS</label>
          <form
            className="form-horizontal col-md-10"
            onSubmit={(submit) => this.onSubmit(submit)}
          >
            <FormInput
              ref={(clave) => this.clave = clave}
              inputType="text"
              textoLabel="Clave"
              length={5}
              isRequired={true}
              value={this.state.conceptoPago.clave}
            />
            <FormInput
              ref={(concepto) => this.concepto = concepto}
              inputType="text"
              textoLabel="Concepto"
              length={50}
              isRequired={true}
              value={this.state.conceptoPago.concepto}
            />
            <FormInput
              ref={(numeroClases) => this.numeroClases = numeroClases}
              inputType="number"
              textoLabel="Numero de clases: "
              isRequired={true}
              value={'' + this.state.conceptoPago.numero_clases}
            />
            <FormInput
              ref={(precio) => this.precio = precio}
              inputType="number"
              textoLabel="Precio"
              isRequired={true}
              value={'' + this.state.conceptoPago.precio}
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

export default ActualizarConceptoPago;
