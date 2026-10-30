import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ClienteApiAutenticacion from '../servicios/ClienteApiAutenticacion';

const ContextoEstadoSesion = createContext();

const CLAVE_ALMACENAMIENTO_USUARIO = 'shopbot_usuario_activo';

export function ProveedorEstadoSesion({ children }) {
  const [usuarioActual, setUsuarioActual] = useState(() => {
    try {
      const serializado = localStorage.getItem(CLAVE_ALMACENAMIENTO_USUARIO);
      return serializado ? JSON.parse(serializado) : null;
    } catch {
      return null;
    }
  });

  const [estaCargando, setEstaCargando] = useState(false);

  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem(CLAVE_ALMACENAMIENTO_USUARIO, JSON.stringify(usuarioActual));
    } else {
      localStorage.removeItem(CLAVE_ALMACENAMIENTO_USUARIO);
    }
  }, [usuarioActual]);

  const iniciarSesion = async (email, password) => {
    setEstaCargando(true);
    try {
      const res = await ClienteApiAutenticacion.iniciarSesion({ email, password });
      setUsuarioActual(res.usuario);
      toast.success(`¡Bienvenido de nuevo, ${res.usuario.nombre}!`, { icon: '👋' });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al iniciar sesión';
      toast.error(mensaje);
      return false;
    } finally {
      setEstaCargando(false);
    }
  };

  const registrarUsuario = async (nombre, email, password) => {
    setEstaCargando(true);
    try {
      const res = await ClienteApiAutenticacion.registrar({ nombre, email, password });
      setUsuarioActual(res.usuario);
      toast.success('¡Cuenta creada exitosamente!', { icon: '🎉' });
      return true;
    } catch (error) {
      const mensaje = error.response?.data?.error || 'Error al registrar la cuenta';
      toast.error(mensaje);
      return false;
    } finally {
      setEstaCargando(false);
    }
  };

  const cerrarSesion = () => {
    setUsuarioActual(null);
    toast('Sesión cerrada correctamente.', { icon: '🔒' });
  };

  return (
    <ContextoEstadoSesion.Provider
      value={{
        usuarioActual,
        estaAutenticado: Boolean(usuarioActual),
        estaCargando,
        iniciarSesion,
        registrarUsuario,
        cerrarSesion
      }}
    >
      {children}
    </ContextoEstadoSesion.Provider>
  );
}

export function useEstadoSesion() {
  const contexto = useContext(ContextoEstadoSesion);
  if (!contexto) {
    throw new Error('useEstadoSesion debe utilizarse dentro de un ProveedorEstadoSesion');
  }
  return contexto;
}

