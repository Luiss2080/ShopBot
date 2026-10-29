import InstanciaClienteHttpAxios from '../../../compartido/cliente-http/InstanciaClienteHttpAxios';

class ClienteApiProductos {
  static async obtenerCatalogoCompleto() {
    const respuesta = await InstanciaClienteHttpAxios.get('/productos');
    return respuesta.data;
  }

  static async buscarProductosPorTermino(termino) {
    const respuesta = await InstanciaClienteHttpAxios.get(`/productos/buscar?q=${encodeURIComponent(termino)}`);
    return respuesta.data;
  }

  static async obtenerPorIdentificador(idProducto) {
    const respuesta = await InstanciaClienteHttpAxios.get(`/productos/${idProducto}`);
    return respuesta.data;
  }

  static async obtenerPorCategoria(nombreCategoria) {
    const respuesta = await InstanciaClienteHttpAxios.get(`/productos/categoria/${encodeURIComponent(nombreCategoria)}`);
    return respuesta.data;
  }
}

export default ClienteApiProductos;
