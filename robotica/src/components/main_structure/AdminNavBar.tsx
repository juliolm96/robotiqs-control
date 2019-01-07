import * as React from 'react';
import '../../App.css';

interface MyState {
  width: number;
}

class AdminNavBar extends React.Component<{}, MyState> {

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
                    <i className="icon-lock-1"/>&nbsp;&nbsp;
                    <a className="white nicdark_mpopup_ajax" href="/logout">CERRAR SESIÓN</a>
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
                      <option className="tn-group-title" disabled={true}>ADMINISTRACIÓN</option>
                      <option className="tn-first-level" disabled={true}>- Miembros</option>
                      <option
                        className="tn-second-level"
                        value="/miembros/registrar"
                      >-- Registrar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/miembros/actualizar"
                      >-- Actualizar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/miembros/consultar"
                      >-- Consultar
                      </option>
                      <option className="tn-first-level" disabled={true}>- Sets</option>
                      <option
                        className="tn-second-level"
                        value="/sets/registrar"
                      >-- Registrar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/sets/actualizar"
                      >-- Actualizar
                      </option>

                      <option className="tn-first-level" disabled={true}>- Paquetes</option>
                      <option
                        className="tn-second-level"
                        value="/paquetes/registrar"
                      >-- Registrar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/paquetes/actualizar"
                      >-- Actualizar
                      </option>
                      <option className="tn-first-level" disabled={true}>- Modelos</option>
                      <option
                        className="tn-second-level"
                        value="/modelos/registrar"
                      >-- Registrar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/modelos/actualizar"
                      >-- Actualizar
                      </option>

                      <option className="tn-first-level" disabled={true}>- Construcción</option>
                      <option
                        className="tn-second-level"
                        value="/construccion/registrar"
                      >-- Registrar Paso
                      </option>

                      <option className="tn-first-level" disabled={true}>- Productos</option>
                      <option
                        className="tn-second-level"
                        value="/productos/registrar"
                      >-- Registrar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/productos/actualizar"
                      >-- Actualizar
                      </option>

                      <option className="tn-first-level" disabled={true}>- Servicios</option>
                      <option
                        className="tn-second-level"
                        value="/servicios/registrar"
                      >-- Registrar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/servicios/actualizar"
                      >-- Actualizar
                      </option>

                      <option className="tn-first-level" disabled={true}>- Escuelas</option>
                      <option
                        className="tn-second-level"
                        value="/escuela/registrar"
                      >-- Registrar
                      </option>
                      <option
                        className="tn-second-level"
                        value="/nivel-escuela/registrar"
                      >-- Asignar nivel educativo
                      </option>
                      <option
                        className="tn-second-level"
                        value="/escuela/actualizar"
                      >-- Actualizar
                      </option>

                      <option className="tn-first-level" disabled={true}>- Clases</option>
                      <option
                        className="tn-second-level"
                        value="/clases/registrar"
                      >-- Registrar Avance
                      </option>

                      <option className="tn-first-level"  >- Horarios de servicio</option>
                      <option
                        className="tn-second-level"
                        value="/horario-servicio/administrar"
                      >-- Administrar Horarios de Servicios
                      </option>
                      <option
                        className="tn-second-level"
                        value="/asignacion-horario/"
                      >-- Asignar Horarios
                      </option>
                      <option
                        className="tn-second-level"
                        value="/asignacion-horario/busqueda"
                      >-- Administrar Horarios Asignados
                      </option>
                    </optgroup>
                    <optgroup>
                      <option className="tn-group-title" disabled={true}>
                        MODELOS Y PROGRAMACION
                      </option>
                      <option
                        className="tn-first-level"
                        value="/construccion/consultar"
                      >
                        - Modelos
                      </option>
                    </optgroup>
                    <optgroup>
                      <option className="tn-group-title" value="/catalogo">
                        TIENDA
                      </option>
                    </optgroup>
                    <optgroup>
                      <option disabled={true}/>
                      <option className="tn-group-title" value="/logout">
                        CERRAR SESION
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
                      <li className="green">
                        <a href="#">ADMINISTRACIÓN</a>
                        <ul className="sub-menu">
                          <li>
                            <a>Socios y Escuelas ></a>
                            <ul className="sub-menu">
                              <li><a href="/miembros/registrar">Registrar Socio</a></li>
                              <li><a href="/miembros/actualizar">Actualizar Socio</a></li>
			      <li><a href="/miembros/consultar">Consultar Socio</a></li>
                              <li><a href="/escuela/registrar">Registrar Escuela</a></li>
                              <li><a href="/nivel-escuela/registrar">Asignar nivel educativo (Escuela)</a></li>
                              <li><a href="/escuela/actualizar">Actualizar Escuela</a></li>
                            </ul>
                          </li>
                          <li>
                            <a>Sets y Paquetes ></a>
                            <ul className="sub-menu">
                              <li><a href="/sets/registrar">Registrar Set</a></li>
                              <li><a href="/sets/actualizar">Actualizar Set</a></li>
                              <li><a href="/paquetes/registrar">Registrar Paquete</a></li>
                              <li><a href="/paquetes/actualizar">Actualizar Paquete</a></li>
                            </ul>
                          </li>
                          <li>
                            <a >Modelos ></a>
                            <ul className="sub-menu">
                              <li><a href="/modelos/registrar">Registrar</a></li>
                              <li><a href="/modelos/actualizar">Actualizar</a></li>
                            </ul>
                          </li>
                          <li>
                            <a>Productos y Servicios ></a>
                            <ul className="sub-menu">
                              <li><a href="/productos/registrar">Registrar Producto</a></li>
                              <li><a href="/productos/actualizar">Actualizar Producto</a></li>
                              <li><a href="/servicios/registrar">Registrar Servicio</a></li>
                              <li><a href="/servicios/actualizar">Actualizar Servicio</a></li>
                            </ul>
                          </li>
                          <li>
                            <a>Clases y Horarios></a>
                            <ul className="sub-menu">
                              <li><a href="/clases/registrar">Registrar Avance</a></li>
                              <li><a href="/clases/registrar/asistencia">Registrar Asistencia</a></li>
                              <li><a href="/horario-servicio/administrar">Administrar Horarios de Serv.</a></li>
                              <li><a href="/asignacion-horario/">Asignar Horario</a></li>
                              <li><a href="/asignacion-horario/busqueda">Administrar Asignaciones</a></li>
                            </ul>
                          </li>
                          <li>
                            <a>Construccion ></a>
                            <ul className="sub-menu">
                              <li><a href="/construccion/registrar">Registrar</a></li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="red">
                        <a href="#">MODELOS Y PROGRMACION</a>
                        <ul className="sub-menu">
                          <li><a href="/construccion/consultar">Construccion</a></li>
                        </ul>
                      </li>
                      <li className="blue">
                        <a href="/catalogo">TIENDA</a>
                      </li>
                      <li className="grey">
                        <a href="contact-1.html">CONTACTO</a>
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

export default AdminNavBar;
