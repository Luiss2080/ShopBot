import axios from 'axios';
import GestorIdentificadorSesion from '../identificadores/GestorIdentificadorSesion';

const InstanciaClienteHttpAxios = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Interceptor para inyectar automáticamente la cabecera x-session-id
InstanciaClienteHttpAxios.interceptors.request.use((configuracionPeticion) => {
  const sessionId = GestorIdentificadorSesion.obtenerOInicializarIdentificador();
  configuracionPeticion.headers['x-session-id'] = sessionId;
  return configuracionPeticion;
});

export default InstanciaClienteHttpAxios;

