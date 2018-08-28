import * as React from 'react';
import { Link } from 'react-router-dom';

class Index extends React.Component {

  render() {
    return(
      <div>
        <Link to="/miembros/registrar">REGISTRAR SOCIO</Link>
        <br/><br/>
        <Link to="/miembros/actualizar"> ACTUALIZAR SOCIO</Link>
        <br/><br/>
        <Link to="/sets/registrar">REGISTAR SET</Link>
        <br/><br/>
        <Link to="/sets/actualizar">ACTUALIZAR SET</Link>
        <br/><br/>
        <Link to="/concepto-pago/registrar">REGISTRAR CONCEPTO DE PAGO</Link>
        <br/><br/>
        <Link to="/concepto-pago/actualizar">ACTUALIZAR CONCEPTO DE PAGO</Link>
        <br/><br/>
        <Link to="/pagos/registrar">REGISTRAR PAGO</Link>
        <br/><br/>
        <Link to="/pagos/actualizar">ACTUALIZAR PAGO</Link>
        <br/><br/>
        <Link to="/paquetes/registrar">REGISTRAR PAQUETE</Link>
        <br/><br/>
        <Link to="/paquetes/actualizar">ACTUALIZAR PAQUETE</Link>
        <br/><br/>
        <Link to="/modelos/registrar">REGISTRAR MODELO</Link>
        <br/><br/>
        <Link to="/modelos/actualizar">ACTUALIZAR MODELO</Link>
        <br/><br/>
        <Link to="/construccion/registrar">REGISTRAR PASO DE CONSTRUCCIÓN</Link>
        <br/><br/>
        <Link to="/construccion/consultar">CONSULTAR PASOS DE CONSTRUCCIÓN</Link>
        <br/><br/>

        <Link to="/nivel-escuela/registrar">NIVELES ESCUELAS</Link>
        <br/><br/>
        <Link to="/escuela/consultar">CONSULTAR ESCUELAS</Link>
        <br/><br/>
        <Link to="/escuela/registrar">REGISTRAR ESCUELA</Link>
        <br/><br/>
        <Link to="/escuela/actualizar">ACTUALIZAR ESCUELA</Link>
        <br/><br/>
        <Link to="/productos/registrar">REGISTRAR PRODUCTOS</Link>
        <br/><br/>
        <Link to="/productos/actualizar">ACTUALIZAR PRODUCTOS</Link>
        <br/><br/>
        <Link to="/servicios/registrar">REGISTRAR SERVICIOS</Link>
        <br/><br/>
        <Link to="/servicios/actualizar">ACTUALIZAR SERVICIOS</Link>
        <br/><br/>
        <Link to="/catalogo">CATALOGO DE ARTÍCULOS</Link>
        <br/><br/>
        <Link to="/horario-servicio/hs">HORARIOS SERVICIO</Link>
        <br/><br/>
        <Link to="/clases/registrar">REGISTRAR CLASES</Link>
        <br/><br/>
        <Link to="/clases/actualizar">ACTUALIZAR CLASES</Link>
        <br/><br/>
        <Link to="/asignacion-horario/ah/busqueda">CONSULTAR ASIGNACIONES POR SOCIO</Link>
        <br/><br/>
        <Link to="/asignacion-horario/ah">ASIGNAR HORARIO</Link>
        <br/><br/>
      </div>
    );
  }

}

export default Index;
