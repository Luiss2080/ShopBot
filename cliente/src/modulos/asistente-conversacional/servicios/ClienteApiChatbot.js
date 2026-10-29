import InstanciaClienteHttpAxios from '../../../compartido/cliente-http/InstanciaClienteHttpAxios';

class ClienteApiChatbot {
  static async enviarMensajeUsuario(mensaje) {
    const respuesta = await InstanciaClienteHttpAxios.post('/chat/mensaje', { mensaje });
    return respuesta.data;
  }

  static async obtenerHistorialConversacion() {
    const respuesta = await InstanciaClienteHttpAxios.get('/chat/historial');
    return respuesta.data;
  }

  static async vaciarHistorialConversacion() {
    const respuesta = await InstanciaClienteHttpAxios.delete('/chat/historial');
    return respuesta.data;
  }
}

export default ClienteApiChatbot;
