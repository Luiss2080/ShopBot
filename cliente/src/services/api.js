import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const getSessionId = () => {
  let id = localStorage.getItem('shopbot_session_id');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('shopbot_session_id', id);
  }
  return id;
};

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el session ID a todas las peticiones
api.interceptors.request.use((config) => {
  config.headers['x-session-id'] = getSessionId();
  return config;
});

export const productAPI = {
  getAll: () => api.get('/productos').then(res => res.data),
  search: (q) => api.get(`/productos/buscar?q=${q}`).then(res => res.data),
};

export const cartAPI = {
  getCart: () => api.get('/carrito').then(res => res.data),
  addItem: (productoId, cantidad = 1) => api.post('/carrito', { productoId, cantidad }).then(res => res.data),
  removeItem: (itemId) => api.delete(`/carrito/${itemId}`).then(res => res.data),
};

export const chatAPI = {
  sendMessage: (mensaje) => api.post('/chat/mensaje', { mensaje }).then(res => res.data),
  getHistory: () => api.get('/chat/historial').then(res => res.data),
};

export default api;
