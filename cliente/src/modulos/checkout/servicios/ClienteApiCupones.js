import InstanciaClienteHttpAxios from '../../../compartido/cliente-http/InstanciaClienteHttpAxios';

class ClienteApiCupones {
  static async validarCupon(codigo, montoTotal) {
    const respuesta = await InstanciaClienteHttpAxios.post('/cupones/validar', {
      codigo,
      montoTotal
    });
    return respuesta.data;
  }

  static async obtenerCuponesVigentes() {
    const respuesta = await InstanciaClienteHttpAxios.get('/cupones/vigentes');
    return respuesta.data;
  }
}

export default ClienteApiCupones;

