import * as React from 'react';

interface MyProps {
  id: number;
  nombre_paquete: string;
  descripcion: string;
  imagen: string;
  nombre: string;
  alcance: string;
  actualizarHandler(modeloId: number): void;
}

class ListModelItem extends React.Component<MyProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return(
      <div>
        Paquete: {this.props.nombre_paquete}<br/>
        Modelo: {this.props.nombre}<br/>
        Descripcion: {this.props.descripcion}<br/>
        Alcance: {this.props.alcance} <br/><br/>
        <img src={'data:image/jpg;base64,' + this.props.imagen} width="250px" height="270px"/>
        <br/><br/>
        <button
          type="button"
          onClick={() => this.props.actualizarHandler(this.props.id)}
          className=""
        >
          ACTUALIZAR
        </button>
        <br/><br/><br/>
      </div>
    );
  }

}

export default ListModelItem;
