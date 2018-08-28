import * as React from 'react';
import '../../../../App.css';

// Declaración de una interfaz para definir el tipo de las propiedaes a recibir
interface MyProps {
  paquete: string;
  descripcion: string;
  set: string;
  id: number;
  handleClick(id: number): void;
}

class PaqueteListItem extends React.Component<MyProps> {
  constructor(props: MyProps) {
    super(props);
    this.render = this.render.bind(this);
  }

  render() {
    return(
      <li>
        <table className="nicdark_width_percentage100">
          <tbody>
            <tr>
              <td className="nicdark_width_percentage50">
                <h3 className="subtitle greydark">
                  <b>PAQUETE:</b> {this.props.paquete}<br/><br/>
                  <b>Descripción:</b> {this.props.descripcion}<br/><br/>
                  <b>Set:</b> {this.props.set}
                </h3>
              </td>
              <td className="nicdark_width_percentage40">
                &emsp;
                <a
                  onClick={() => {this.props.handleClick(this.props.id); }}
                  className={
                    'nicdark_btn_icon nicdark_bg_blue ' +
                    'medium nicdark_radius_left white nicdark_relative'
                  }
                  style={
                    {
                      borderRadius: '0px 10px 10px 0px'
                    }
                  }
                >
                  <i className="icon-right-outline"/>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="nicdark_width_percentage60">
          <hr className="stylished nicdark_bg_blue"/>
        </div>
        <div className="nicdark_space20"/>
      </li>
    );
  }

}

export default PaqueteListItem;
