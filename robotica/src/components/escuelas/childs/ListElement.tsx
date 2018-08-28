import * as React from 'react';

// Declaración de una interfaz para definir el tipo de las propiedaes a recibir
interface MyProps {
  nombre: string;
  clave: string;
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
        <table>
          <tbody>
            <tr>
              <td>
                <h3 className="subtitle greydark">
                  <b>Escuela: {this.props.nombre}</b><br/>
                  Clave: {this.props.clave}<br/>
                </h3>
              </td>
              <td>
                &emsp;
                <a
                  onClick={() => {this.props.handleClick(this.props.id); }}
                  className={
                    'nicdark_btn_icon nicdark_bg_yellow ' +
                    'medium nicdark_radius_left white nicdark_relative'
                  }
                  style={
                    {
                      borderRadius: '0px 10px 10px 0px'
                    }
                  }
                >
                  <i className="icon-pencil-1"/>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="nicdark_divider left small">
          <span className="nicdark_bg_yellow nicdark_radius"/>
        </div>
        <div className="nicdark_space20"/>
      </li>
    );
  }

}

export default ListElement;
