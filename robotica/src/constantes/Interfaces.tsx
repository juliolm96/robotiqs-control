
export default null;

export interface Socio {

  apellido_materno: string;
  apellido_paterno: string;
  escuela_id: number;
  fecha_ingreso?: string;
  fecha_nacimiento: string;
  id?: number;
  nivel_educativo: string;
  nombre: string;
  numero?: number;
  saldo_clases?: number;
  telefono: number;
  tutor: string;

}

export interface SocioVista {

  apellido_materno: string;
  apellido_paterno: string;
  escuela_id: number;
  fecha_ingreso?: string;
  fecha_nacimiento: string;
  id?: number;
  nivel_educativo: string;
  nombre: string;
  numero?: number;
  saldo_clases?: number;
  telefono: number;
  tutor: string;
  nombre_escuela: string;

}

export interface Action {
  actionType: string;
  estado?: any,
  value?: any;
}

export interface Escuela {
  clave?: string;
  nombre: string;
  id: number;
}

export interface Set {
  id: number;
  numero: string;
  nombre: string;
  descripcion: string;
}

export interface ConceptoPago {
  id: number;
  clave: string;
  concepto: string;
  numero_clases: number;
  precio: number;
}

export interface Pago {
  id: number;
  fecha: string;
  numero: number;
  cantidad: number;
  importe: number;
  precio: number;
  miembroId: number;
  conceptoPagoId: number;
}

export interface PagoVista {
  id: number;
  fecha: string;
  numero: number;
  cantidad: number;
  importe: number;
  precio: number;
  miembroId: number;
  conceptoPagoId: number;
  numero_miembro: number;
  concepto_letra: string;
}

export interface ActualizacionPago {
    cantidad: number;
    precio: number;
    conceptoPagoId: number;
    id: number | undefined;
    miembroId: number
}

export interface Modelo {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  paquete_id: number;
}

export interface Paquete {
  id: number;
  nombre: string;
  descripcion: string;
  setId: number;
}

export interface PaqueteVista {
  id: number;
  nombre: string;
  descripcion: string;
  setId: number;
  nombre_set: string;
}

export interface ModeloVista {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  nombre_paquete: string;
  paqueteId: number;
}

export interface Construccion {
  material: string;
  instruccion: string;
  ensamblado: string;
  numero: number;
  modeloId: number;
}

export interface NivelEscuela {
  id: number;
  ESCUELA_id: number;
  NIVEL_EDUCATIVO_id: number;
}

export interface NivelEscuelaVista {
  id: number;
  nombre: string;
  descripcion: string;
}

export interface Producto {

  id: number;
  concepto: string;
  precio: number;
  codigo: string;
  existencias: number;
  imagen: string;
  articuloId: number;

}

export interface Servicio {

  id: number;
  concepto: string;
  precio: number;
  codigo: string;
  dias: number;
  tipo: string;
  articuloId: number;
  paqueteId: number;
  nombrePaquete?: string;

}

export interface DetalleTicket {

  id: number;
	cantidad: number;
	precio: number;
	importe: number;
	articuloId: number;
	conceptoArticulo?: string;
	codigoArticulo?: string;
	ticketId: number;

}

export interface Ticket {

  id: number;
  folio: string;
  fecha: string;
  hora: string;
  subtotal: number;
  iva: number;
  total: number;
  forma_pago: string;
  estado: string;
  socioId: number;
  nombre_socio: string;

}

export interface HorarioServicio {
  id: number;
  hora_inicial: string;
  hora_final: string;
  dia: string;
  capacidad: number;
}

export interface HorarioServicioVista {
  id: number;
  hora_inicial: string;
  hora_final: string;
  dia: string;
  capacidad: number;
  disponible: number;
}

export interface AsignacionHorario {
  id?: number;
  activo?: number;
  socio_id: number;
  horario_servicio_id: number;
}

export interface AsignacionHorarioVista {
  id: number;
  numero: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  dia: string;
  hora_inicial: string;
  hora_final: string;
}

export interface Clase {
  id: number;
  fecha?: string;
  hora_entrada: string;
  hora_salida: string;
  clases_tomadas: number;
  socioId: number;
}

export interface avanceObject {
  modeloId: number;
  alcance: string;
}

export interface ClaseAlcance {
  claseId: number;
  socioId?: number;
  avance: avanceObject;
}

export interface Modelo_Clase {
  id: number;
  descripcion: string;
  imagen: string;
  nombre: string;
  paqueteId: number;
  claseId: number;
  alcance: string;
  nombre_paquete: string;
}

export interface Actividad {
  id: number;
  claseId: number;
  modeloId: number;
  alcance: string;
}

export interface ActividadVista {
  id: number;
  claseId: number;
  modeloId: number;
  alcance: string;
  nombreModelo: string;
  fecha: string;
  nombrePaquete: string;
}

export interface SessionObject {
  accessToken: string;
  role: string;
  tokenType: string;
  status: number;
}

export interface registroObject {
  username: string;
  email: string;
  password: string;
}
