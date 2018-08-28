import * as React from 'react';
import ConceptoPagoActions from './flux/ConceptoPagoActions';
import ConceptoPagoStore from './flux/ConceptoPagoStore';
import FormInput from '../general/FormInput';

class RegistrarConceptoPago extends React.Component {

  private clave: any;
  private concepto: any;
  private numeroClases: any;
  private precio: any;

  constructor(props: any) {
    super(props);
    ConceptoPagoStore.wakeUp();
  }

  onSubmit(event: any) {
    ConceptoPagoActions.setClave(this.clave.getValue());
    ConceptoPagoActions.setConcepto(this.concepto.getValue());
    ConceptoPagoActions.setNumero_clases(this.numeroClases.getValue());
    ConceptoPagoActions.setPrecio(this.precio.getValue());
    ConceptoPagoActions.submitConceptoPago();
    event.preventDefault();
    event.stopPropagation();
  }

  render() {
    return(
      <div>
        <label className="col-md-10">Registrar concepto de pago</label>
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
          />
          <FormInput
            ref={(concepto) => this.concepto = concepto}
            inputType="text"
            textoLabel="Concepto"
            length={50}
            isRequired={true}
          />
          <FormInput
            ref={(numeroClases) => this.numeroClases = numeroClases}
            inputType="number"
            textoLabel="Numero de clases"
            isRequired={true}
          />
          <FormInput
            ref={(precio) => this.precio = precio}
            inputType="number"
            textoLabel="Precio"
            isRequired={true}
          />
          <input type="Submit" defaultValue="REGISTRAR"/>
        </form>
      </div>
    );
  }

}

export default RegistrarConceptoPago;
