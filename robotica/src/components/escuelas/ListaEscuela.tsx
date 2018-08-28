import * as React from 'react';
import '../../styles/Escuela.css';
import EscuelaActions from './flux/EscuelaActions';
import EscuelaStore from './flux/EscuelaStore';
import * as Interfaces from '../.././constantes/Interfaces';

interface MyState {
  listOptions: Interfaces.Escuela[];
}

class ListaEscuela extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);
    this.state = {
      listOptions: []
    };
    this.loadEscuelas = this.loadEscuelas.bind(this);
  }
  componentWillMount() {
    EscuelaActions.ListarEscuelas();
    EscuelaStore.addChangeListener('STORE_LISTAR_ESCUELAS', this.loadEscuelas);
  }

  loadEscuelas() {
      let escuelas: Interfaces.Escuela[] = EscuelaStore.getListadoEscuelas();
      let _listOptions: any[] = [];

      for (var i = 0; i < escuelas.length; i++) {
        _listOptions.push((

          <li >{escuelas[i].clave}</li>

        ));
      }

      this.setState({
        listOptions: _listOptions
      });
  }
  render() {

    return(
      <div className="ListaEscuela">
      <ul>{this.state.listOptions}</ul>
      </div>
    );
  }
}

export default ListaEscuela;
