import * as React from 'react';
import '../../../../App.css';

// Declaración de una interfaz para definir el tipo de las propiedaes a recibir
interface MyProps {
  nombre: string;
  id?: number;
  imagen: string;
  descripcion: string;
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
        <table className="nicdark_width_percentage90">
          <tbody>
            <tr className="nicdark_width_percentage90">
              <td className="nicdark_width_percentage30">
                <h3 className="subtitle greydark">
                  <b>Modelo:</b><br/>
                  {this.props.nombre}
                </h3>
              </td>
              <td className="nicdark_width_percentage50" rowSpan={2}>
                <img
                  src={'data:image/jpg;base64,' + this.props.imagen}
                  className="modelo-image"
                />
              </td>
            </tr>
            <tr className="nicdark_width_percentage90">
              <td className="nicdark_width_percentage30">
                <h3 className="subtitle greydark">
                  <b>Descripción:</b><br/>
                  {this.props.descripcion}
                </h3>
              </td>
            </tr>
            <tr className="nicdark_width_percentage90">
              <td className="nicdark_width_percentage80" colSpan={2}>
                <div className="nicdark_space10"/>
                <div className="nicdark_focus nicdark_width_percentage60">
                  <a
                    onClick={() => this.props.handleClick(this.props.id)}
                    className={
                      'nicdark_btn fullwidth nicdark_bg_blue medium ' +
                      'nicdark_shadow nicdark_radius white nicdark_press'
                    }
                  >
                    Construir&nbsp;<i className="icon-wrench-1"/>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="nicdark_space20"/>
      </li>
    );
  }

}

export default ListElement;
