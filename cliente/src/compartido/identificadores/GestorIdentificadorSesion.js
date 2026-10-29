import { v4 as uuidv4 } from 'uuid';

const CLAVE_ALMACENAMIENTO_SESION = 'shopbot_session_id';

class GestorIdentificadorSesion {
  static obtenerOInicializarIdentificador() {
    let idActual = localStorage.getItem(CLAVE_ALMACENAMIENTO_SESION);
    if (!idActual) {
      idActual = uuidv4();
      localStorage.setItem(CLAVE_ALMACENAMIENTO_SESION, idActual);
    }
    return idActual;
  }

  static reiniciarIdentificador() {
    const nuevoId = uuidv4();
    localStorage.setItem(CLAVE_ALMACENAMIENTO_SESION, nuevoId);
    return nuevoId;
  }
}

export default GestorIdentificadorSesion;

