import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// ---INICIO DE LA IMPORTACION DE COMPONENTES
import ActualizarMiembro from './views/miembros/ActualizarMiembrosView';
import ConsultarMiembro from './views/miembros/ConsultarMiembroView';
import RegistroMiembros from './views/miembros/RegistrarMiembrosView';
import ActualizarSet from './views/sets/ActualizarSetsView';
import RegistrarSet from './views/sets/RegistrarSetsView';
import ActualizarPaquete from './views/paquetes/ActualizarPaquetesView';
import RegistrarPaquete from './views/paquetes/RegistrarPaquetesView';
import ActualizarModelo from './views/modelos/ActualizarModelosView';
import RegistrarModelo from './views/modelos/RegistrarModelosView';
import RegPasoConstruccion from './views/construccion/RegistrarPasoConstruccionView';
import ActualizarProductos from './views/productos/ActualizarProductosView';
import RegistrarProductos from './views/productos/RegistrarProductosView';
import RegistrarServicios from './views/servicios/RegistrarServiciosView';
import ActualizarServicio from './views/servicios/ActualizarServiciosView';
import RegistroEscuela from './views/escuelas/RegistrarEscuelasView';
import RegistroNE from './views/escuelas/AsignarNivelesEducativosView';
import ActualizarEscuela from './views/escuelas/ActualizarEscuelasView';
import HorarioServicio from './views/horarios_servicio/RegistrarHorarioServicioView';
import AsignacionHorario from './views/asignacion_horarios/AsignarHorariosView';
import BusquedaAsignacionHorario from './views/asignacion_horarios/BusquedaAsignacionHorarioView';
import ActualizarClase from './components/clases/ActualizarClase';
import RegistrarAsistencia from './views/clases/RegistrarAsistenciaView';
import RegistrarClases from './views/clases/RegistrarClasesView';

// ********************************************************************************
// COMPONENTES DE USUARIO
import ConsultarConstruccion from './components/construccion/ConsultarConstruccion';
import CatalogoArticulos from './views/CatalogoArticulos';
// FIN DE LOS COMPONENTES DE USUARIO

// INICIO DE VISTAS
import AdminNavBar from './components/main_structure/AdminNavBar';
import UserNavBar from './components/main_structure/UserNavBar';
import NoSessionNavBar from './components/main_structure/NoSessionNavBar';
import Banner from './components/main_structure/Banner';
// FIN DE VISTAS

import LogIn from './views/inicio_sesion/LogInView';
import SignIn from './views/inicio_sesion/SignInView';
import LogOut from './components/inicio_sesion/LogOut';
import InicioSesionStore from './components/inicio_sesion/flux/InicioSesionStore';
import * as Interfaces from './constantes/Interfaces';
// ---FIN DE LAS IMPORTACIONES DE COMPONENTES

interface MyState {
  sessionObject: Interfaces.SessionObject;
}

class App extends React.Component<{}, MyState> {

  constructor(props: any) {
    super(props);

    this.state =  {
      sessionObject:  {
        accessToken: '',
        role: '',
        status: 0,
        tokenType: 'Bearer'
      }
    };

    if (localStorage.getItem('sessionObject') !== null) {
      let _sessionObject: Interfaces.SessionObject =
        JSON.parse('' + localStorage.getItem('sessionObject'));

      this.state =  {
        sessionObject:  {
          accessToken: _sessionObject.accessToken,
          role: _sessionObject.role,
          status: 0,
          tokenType: _sessionObject.tokenType
        }
      };
    }

    this.setSessionState = this.setSessionState.bind(this);

  }

  componentWillMount() {

    InicioSesionStore.wakeUp();
    InicioSesionStore.addChangeListener('STORE_SET_SESION_OBJECT', this.setSessionState);

  }

  setSessionState() {

    this.setState({
      sessionObject: InicioSesionStore.getSessionObject()
    });

    localStorage.setItem('sessionObject', JSON.stringify(InicioSesionStore.getSessionObject()));

  }

  componentWillUnmount() {

    InicioSesionStore.removeChangeListener('STORE_SET_SESION_OBJECT', this.setSessionState);

  }

  render() {
    return (
      <div className="container">
        {
          (() => {
                   switch (this.state.sessionObject.role) {
                    case 'ADMIN': return (<AdminNavBar/>);
                    case 'USER': return (<UserNavBar/>);
                    default: return (<NoSessionNavBar/>);
                   }
                 })()
        }
        <div className="menu-separator"/>
        <Router>
          <div>
            {/* COMPONENTE BASE o INDEX*/}
            <Route exact={true} path="/" component={Banner}/>
            {/* FIN DE COMPONENTE BASE */}
            { (this.state.sessionObject.role === 'ADMIN') ?
              <div>
                <Route exact={true} path="/miembros/actualizar" component={ActualizarMiembro}/>
                <Route exact={true} path="/miembros/registrar" component={RegistroMiembros} />
                <Route exact={true} path="/miembros/consultar" component={ConsultarMiembro} />
                <Route exact={true} path="/sets/registrar" component={RegistrarSet}/>
                <Route exact={true} path="/sets/actualizar" component={ActualizarSet}/>
                <Route exact={true} path="/modelos/registrar" component={RegistrarModelo} />
                <Route exact={true} path="/modelos/actualizar" component={ActualizarModelo} />
                <Route exact={true} path="/paquetes/registrar" component={RegistrarPaquete} />
                <Route exact={true} path="/paquetes/actualizar" component={ActualizarPaquete} />
                <Route exact={true} path="/construccion/registrar" component={RegPasoConstruccion} />
                <Route exact={true} path="/productos/registrar" component={RegistrarProductos}/>
                <Route exact={true} path="/productos/actualizar" component={ActualizarProductos}/>
                <Route exact={true} path="/servicios/registrar" component={RegistrarServicios}/>
                <Route exact={true} path="/servicios/actualizar" component={ActualizarServicio}/>

                <Route exact={true} path="/clases/registrar" component={RegistrarClases} />
                <Route exact={true} path="/clases/actualizar" component={ActualizarClase} />
                <Route exact={true} path="/clases/registrar/asistencia" component={RegistrarAsistencia}/>
                <Route exact={true} path="/nivel-escuela/registrar" component={RegistroNE}/>
                <Route exact={true} path="/escuela/registrar" component={RegistroEscuela} />
                <Route exact={true} path="/escuela/actualizar" component={ActualizarEscuela}/>

                <Route exact={true} path="/horario-servicio/administrar" component={HorarioServicio} />
                <Route exact={true} path="/asignacion-horario" component={AsignacionHorario} />
                <Route exact={true} path="/asignacion-horario/busqueda" component={BusquedaAsignacionHorario} />
                <Route path="/catalogo" component={CatalogoArticulos}/>
              </div>
              :
              <div/>
            }
            <Route exact={true} path="/construccion/consultar" component={ConsultarConstruccion} />


            <Route exact={true} path="/login" component={LogIn} />
            <Route exact={true} path="/logout" component={LogOut} />
            <Route exact={true} path="/signup" component={SignIn} />

          </div>
        </Router>
      </div>
    );
  }
}

export default App;
