import * as React from 'react';
import '../../App.css';

interface MyState {
  width: number;
}

class NoSessionNavBar extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);
    this.state =  {
      width: window.innerWidth
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions.bind(this));
  }

  updateDimensions() {
    this.setState({
      width: window.innerWidth
    });
  }

  selectOnChange(event: any) {
    let direction: string = event.target.value;

    if (direction.charAt(0) === '/') {
      window.location.href = direction;
    }

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions.bind(this));
  }

  render() {
    return(
        <div
          className="nicdark_menu_boxed"
          style={{position: 'fixed', transition: 'top 0.5s', zIndex: 2}}
          id="navMenu"
        >
          <div className="nicdark_section nicdark_bg_greydark nicdark_displaynone_responsive">
            <div className="nicdark_container nicdark_clearfix">
              <div className="grid grid_6">
                <div className="nicdark_focus">
                  <h6 className="white">
                    <i className="icon-calendar-outlilne"/>&nbsp;&nbsp;
                    <a className="white" href="events.html">EVENTOS</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="grey">·</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="icon-phone-outline"/>&nbsp;&nbsp; TELÉFONO (352) 52 6 81 78
                  </h6>
                </div>
              </div>
              <div className="grid grid_6 right">
                <div className="nicdark_focus right">
                  <h6 className="white">
                    <i className="icon-plus-outline"/>&nbsp;&nbsp;
                    <a className="white nicdark_mpopup_ajax" href="/signup">REGISTRARSE</a>
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="grey">·</span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <i className="icon-lock-1"/>&nbsp;&nbsp;
                    <a className="white nicdark_mpopup_ajax" href="/login">INICIAR SESIÓN</a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="nicdark_space3 nicdark_bg_gradient"/>
          <div className="nicdark_section nicdark_bg_grey nicdark_shadow nicdark_radius_bottom">
            <div className="nicdark_container nicdark_clearfix">
              { (this.state.width < 960) ?
                <div>
                  <div className="nicdark_space20"/>
                  <div className="nicdark_logo nicdark_marginleft10">
                    {/* LOGO */}
                    <a href="/">
                      <img
                        alt="Logo"
                        src="/resources/img/logo.png"
                      />
                    </a>
                  </div>
                  <div className="nicdark_space20"/>
                  <select className="tinynav tinynav1" onChange={this.selectOnChange}>
                    <option className="tn-title" >MENU</option>
                    <optgroup>
                      <option disabled={true}/>
                      <option className="tn-group-title" value="/login">
                        &#x270E; INICIAR SESION
                      </option>
                    </optgroup>
                    <optgroup>
                      <option disabled={true}/>
                      <option className="tn-group-title" value="/signup">
                        &#x271A; REGISTRARSE
                      </option>
                    </optgroup>
                    <optgroup>
                    <option disabled={true}/>
                      <option className="tn-group-title" value="/contacto">
                        &#x260E; CONTACTO
                      </option>
                    </optgroup>
                  </select>
                  <div className="nicdark_space20"/>
                </div>
                :
                <div className="grid grid_12 percentage">
                  {/* Contenedor bajo (MENÚ NAVBAR) --EL COMPONENTE DE ARRIBA ES EL INICIO-- */}

                  <div className="nicdark_space20"/>
                  <div className="nicdark_logo nicdark_marginleft10">
                    {/* LOGO */}
                    <a href="/"><img alt="Logo" src="/resources/img/logo.png"/></a>
                  </div>
                  <nav>
                    <ul className="nicdark_menu nicdark_margin010 nicdark_padding50">
                      <li className="grey">
                        <a href="/contacto">CONTACTO</a>
                      </li>
                    </ul>
                  </nav>
                  <div className="nicdark_space20"/>
                </div>
              }
              {/* Fin de Contenedor bajo (MENÚ NAVBAR) */}
            </div>
            {/*<!--end container-->*/}
          </div>
          {/*end header*/}
        </div>
    );
  }

}

export default NoSessionNavBar;
