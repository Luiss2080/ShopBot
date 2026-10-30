import InstanciaClienteHttpAxios from '../../../compartido/cliente-http/InstanciaClienteHttpAxios';

class ClienteApiOrdenes {
  static async procesarNuevaOrden({ nombreCliente, telefonoCliente, direccionEnvio }) {
    const respuesta = await InstanciaClienteHttpAxios.post('/ordenes', {
      nombreCliente,
      telefonoCliente,
      direccionEnvio
    });
    return respuesta.data;
  }

  static async obtenerOrdenPorNumero(numeroOrden) {
    const respuesta = await InstanciaClienteHttpAxios.get(`/ordenes/${numeroOrden}`);
    return respuesta.data;
  }

  static async obtenerHistorialOrdenesSesion() {
    const respuesta = await InstanciaClienteHttpAxios.get('/ordenes/historial');
    return respuesta.data;
  }
}

export default ClienteApiOrdenes;

