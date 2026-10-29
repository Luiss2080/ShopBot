import InstanciaClienteHttpAxios from '../../../compartido/cliente-http/InstanciaClienteHttpAxios';

class ClienteApiCarrito {
  static async obtenerCarritoActual() {
    const respuesta = await InstanciaClienteHttpAxios.get('/carrito');
    return respuesta.data;
  }

  static async agregarItem(productoId, cantidad = 1) {
    const respuesta = await InstanciaClienteHttpAxios.post('/carrito', { productoId, cantidad });
    return respuesta.data;
  }

  static async eliminarItem(itemId) {
    const respuesta = await InstanciaClienteHttpAxios.delete(`/carrito/${itemId}`);
    return respuesta.data;
  }
}

export default ClienteApiCarrito;

