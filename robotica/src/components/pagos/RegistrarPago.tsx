import * as React from 'react';
import FormInput from '../general/FormInput';
import FormSelect from './childs/registrar/FormSelect';
import FormInputCantidad from './childs/registrar/FormInputCantidad';
import * as Interfaces from '../../constantes/Interfaces';
import PagoActions from './flux/PagoActions';
import PagoStore from './flux/PagoStore';
import ListElement from '../general/ListElement';

interface MyState {
  conceptosPago: string[];
  conceptoId: number;
  userSelected: boolean;
  listOptions: JSX.Element[];
  miembroId: number | undefined;
  conceptoSelected: boolean;
  conceptoInfo: Interfaces.ConceptoPago;
  cantidad: number;
  noClases: number;
  importe: number;
}

class RegistrarPago extends React.Component<{}, MyState> {

  private conceptoPagoSelect: any;
  private cantidad: any;
  private importe: any;
  private precio: any;

  constructor(props: any) {
    super(props);

    this.state = {
      conceptosPago: [],
      conceptoId: 0,
      userSelected: false,
      listOptions: [],
      miembroId: 0,
      conceptoSelected: false,
      conceptoInfo: {
        clave: '',
        concepto: '',
        id: 0,
        numero_clases: 0,
        precio: 0
      },
      cantidad: 0,
      noClases: 0,
      importe: 0
    };

    this.renderConceptos = this.renderConceptos.bind(this);
    this.selectChangeHandler = this.selectChangeHandler.bind(this);
    this.loadMiembros = this.loadMiembros.bind(this);
    this.listElementClick = this.listElementClick.bind(this);
    this.volver = this.volver.bind(this);
    this.renderConceptoInfo = this.renderConceptoInfo.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  componentWillMount() {
    PagoStore.addChangeListener('STORE_LOAD_CONCEPTOS', this.renderConceptos);
    PagoStore.addChangeListener('STORE_LOAD_MIEMBROS', this.loadMiembros);
    PagoStore.addChangeListener('STORE_LOAD_CONCEPTO_SELECCIONADO', this.renderConceptoInfo);
    PagoActions.loadConceptos();
    PagoActions.loadMiembros();
  }

  loadMiembros() {

    let _listOptions: JSX.Element[] = [];

    PagoStore.getMiembros().forEach( (miembro, index) => {
      _listOptions.push((
                        <ListElement
                          key={index}
                          value={'NOMBRE: ' + miembro.nombre.concat(
                              ' NUMERO: ' + miembro.numero)}
                          handleClick={this.listElementClick}
                          id={miembro.id}
                        />
                       ));
    });

    this.setState({
      listOptions: _listOptions
    });
  }

  renderConceptos() {

    let conceptos: string[] = [];

    PagoStore.getConceptos().forEach( (concepto) => {
      conceptos.push(concepto.concepto);
    });

    this.setState({
      conceptosPago: conceptos
    });

    this.forceUpdate();
  }

  renderConceptoInfo() {

    this.setState({
      conceptoSelected: false
    });

    this.setState({
      conceptoInfo: PagoStore.getConceptoSeleccionado(),
      conceptoSelected: true,
      importe: PagoStore.getConceptoSeleccionado().precio
    });

  }

  selectChangeHandler(event: any) {

    let conceptoId = PagoStore.getConceptoId(event.target.value);
    PagoActions.loadConceptoSeleccionado(conceptoId);

    this.setState({
      conceptoId: conceptoId
    });

  }

  onSubmit(event: any) {

    PagoActions.setMiembroId(this.state.miembroId);
    PagoActions.setConceptoId(this.state.conceptoId);
    PagoActions.setCantidad(this.cantidad.getValue());
    PagoActions.setImporte(this.state.importe);
    PagoActions.setPrecio(this.precio.getValue());

    PagoStore.submit();

    event.preventDefault();
    event.stopPropagation();

  }

  volver() {

    this.conceptoPagoSelect.getOpt().value = ' -- SELECCIONE UNA OPCION -- ';
    this.setState({
      userSelected: false,
      conceptoSelected: false
    });

  }

  listElementClick(id: number | undefined) {
    this.setState({
      miembroId: id,
      userSelected: true
    });
  }

  onChangeInput(event: any) {

    this.setState({
      conceptoSelected: false,
      cantidad: event.target.value,
      importe: event.target.value * this.state.conceptoInfo.precio
    });

    this.setState({
      conceptoSelected: true
    });

  }

  componentWillUnmount() {
    PagoStore.removeChangeListener('STORE_LOAD_CONCEPTOS', this.renderConceptos);
    PagoStore.removeChangeListener('STORE_LOAD_MIEMBROS', this.loadMiembros);
    PagoStore.removeChangeListener('STORE_LOAD_CONCEPTO_SELECCIONADO', this.renderConceptoInfo);
  }

  render() {
    return(
      <div>
      { this.state.userSelected ?
        <div>
          <input type="Button" onClick={this.volver} defaultValue="<- REGRESAR"/>
          <br/> <br/>
          <label className="col-md-10">REGISTRO DE PAGOS</label>
          <form
            className="form-horizontal col-md-10"
            onSubmit={(submit) => this.onSubmit(submit)}
          >
            <FormSelect
              ref={(con) => this.conceptoPagoSelect = con}
              textoLabel="Concepto de pago"
              options={this.state.conceptosPago}
              onChangeHandler={this.selectChangeHandler}
            />{this.state.conceptoSelected ?
                <div>
                  <FormInputCantidad
                    isRequired={true}
                    inputType="number"
                    textoLabel="Cantidad: "
                    ref={(cantidad) => this.cantidad = cantidad}
                    value="1"
                    onChangeHandler={this.onChangeInput}
                  />
                  <FormInput
                    inputType="number"
                    textoLabel="Numero de clases: "
                    isRequired={true}
                    ref={(importe) => this.importe = importe}
                    value={'' + this.state.conceptoInfo.numero_clases}
                    disabled={true}
                  />
                  <FormInput
                    isRequired={true}
                    textoLabel="Precio: "
                    inputType="number"
                    ref={(precio) => this.precio = precio}
                    value={'' + this.state.conceptoInfo.precio}
                    disabled={true}
                  />
                  <FormInput
                    ref={(importe) => this.importe = importe}
                    isRequired={true}
                    textoLabel="Importe: "
                    inputType="number"
                    value={'' + this.state.importe}
                  />
                  <input type="Submit" defaultValue="REGISTRAR"/>
                </div>
                :
                <div/>
              }
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

export default RegistrarPago;
