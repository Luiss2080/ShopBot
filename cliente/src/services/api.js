// Adaptador de compatibilidad hacia clientes HTTP por dominio
import InstanciaClienteHttpAxios from '../compartido/cliente-http/InstanciaClienteHttpAxios';
import ClienteApiProductos from '../modulos/catalogo/servicios/ClienteApiProductos';
import ClienteApiCarrito from '../modulos/carrito/servicios/ClienteApiCarrito';
import ClienteApiChatbot from '../modulos/asistente-conversacional/servicios/ClienteApiChatbot';

export const productAPI = {
  getAll: ClienteApiProductos.obtenerCatalogoCompleto,
  search: ClienteApiProductos.buscarProductosPorTermino,
  getById: ClienteApiProductos.obtenerPorIdentificador
};

export const cartAPI = {
  getCart: ClienteApiCarrito.obtenerCarritoActual,
  addItem: ClienteApiCarrito.agregarItem,
  removeItem: ClienteApiCarrito.eliminarItem
};

export const chatAPI = {
  sendMessage: ClienteApiChatbot.enviarMensajeUsuario,
  getHistory: ClienteApiChatbot.obtenerHistorialConversacion,
  clearHistory: ClienteApiChatbot.vaciarHistorialConversacion
};

export default InstanciaClienteHttpAxios;
