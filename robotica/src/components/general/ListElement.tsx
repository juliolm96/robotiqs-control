import * as React from 'react';

// Declaración de una interfaz para definir el tipo de las propiedaes a recibir
interface MyProps {
  value: string;
  id?: number;
  handleClick(id: number | undefined): void;
}

class ListElement extends React.Component<MyProps> {

  // El constructor recibe propiedades desde su componente padre, las cuales se
  // definen en la interfaz. Además enlaza los metodos
  constructor(props: MyProps) {
    super(props);
    this.render = this.render.bind(this);
  }

  render() {
    return(
      <li>
        <a
          onClick={() => {this.props.handleClick(this.props.id); }}
        >{this.props.value}
        </a>
      </li>
    );
  }

}

export default ListElement;
