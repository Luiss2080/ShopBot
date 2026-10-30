import { AnimatePresence } from 'framer-motion';
import { Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import IndicadorPasosProgreso from '../modulos/checkout/componentes/IndicadorPasosProgreso';
import FormularioDatosEnvio from '../modulos/checkout/componentes/FormularioDatosEnvio';
import FormularioMetodoPago from '../modulos/checkout/componentes/FormularioMetodoPago';
import TarjetaConfirmacionExitosa from '../modulos/checkout/componentes/TarjetaConfirmacionExitosa';
import { useFlujoProcesoCheckout } from '../modulos/checkout/hooks/useFlujoProcesoCheckout';

export default function Checkout({ cart, refreshCart }) {
  const {
    pasoActual,
    estaCargando,
    datosEnvio,
    numeroOrdenGenerada,
    actualizarDatosEnvio,
    avanzarAPago,
    retrocederAEnvio,
    procesarPagoYCrearOrden
  } = useFlujoProcesoCheckout(cart, refreshCart);

  if (cart.items?.length === 0 && pasoActual !== 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <Package size={64} className="text-slate-300 dark:text-slate-700 mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Tu carrito está vacío</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">No puedes proceder al checkout sin productos en tu carrito.</p>
        <Link to="/catalogo" className="bg-brand-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors shadow-md">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]">
      <IndicadorPasosProgreso pasoActual={pasoActual} />

      <AnimatePresence mode="wait">
        {pasoActual === 1 && (
          <FormularioDatosEnvio
            key="paso-envio"
            datosEnvio={datosEnvio}
            onActualizarDatos={actualizarDatosEnvio}
            onContinuarPago={avanzarAPago}
          />
        )}

        {pasoActual === 2 && (
          <FormularioMetodoPago
            key="paso-pago"
            items={cart.items}
            total={cart.total}
            estaCargando={estaCargando}
            onProcesarPago={procesarPagoYCrearOrden}
            onVolverAtras={retrocederAEnvio}
          />
        )}

        {pasoActual === 3 && (
          <TarjetaConfirmacionExitosa
            key="paso-confirmacion"
            numeroOrden={numeroOrdenGenerada}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
