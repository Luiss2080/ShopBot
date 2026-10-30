import { useState } from 'react';
import toast from 'react-hot-toast';
import ClienteApiOrdenes from '../servicios/ClienteApiOrdenes';

export function useFlujoProcesoCheckout(cart, refreshCart) {
  const [pasoActual, setPasoActual] = useState(1);
  const [estaCargando, setEstaCargando] = useState(false);
  const [numeroOrdenGenerada, setNumeroOrdenGenerada] = useState(null);

  const [datosEnvio, setDatosEnvio] = useState({
    nombreCliente: '',
    telefonoCliente: '',
    direccionEnvio: ''
  });

  const actualizarDatosEnvio = (campo, valor) => {
    setDatosEnvio(prev => ({ ...prev, [campo]: valor }));
  };

  const avanzarAPago = () => {
    setPasoActual(2);
  };

  const retrocederAEnvio = () => {
    setPasoActual(1);
  };

  const procesarPagoYCrearOrden = async () => {
    setEstaCargando(true);

    try {
      const respuesta = await ClienteApiOrdenes.procesarNuevaOrden(datosEnvio);
      
      if (refreshCart) {
        await refreshCart();
      }

      setNumeroOrdenGenerada(respuesta.orden?.numeroOrden || null);
      setPasoActual(3);
      toast.success('¡Orden y pago procesados con éxito!', { icon: '🎉' });
    } catch (error) {
      console.error('Error al procesar la orden:', error);
      const mensaje = error.response?.data?.error || 'Ocurrió un error al procesar la orden';
      toast.error(mensaje);
    } finally {
      setEstaCargando(false);
    }
  };

  return {
    pasoActual,
    estaCargando,
    datosEnvio,
    numeroOrdenGenerada,
    actualizarDatosEnvio,
    avanzarAPago,
    retrocederAEnvio,
    procesarPagoYCrearOrden
  };
}

