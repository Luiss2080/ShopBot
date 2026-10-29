import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import CarruselProductosChat from './CarruselProductosChat';
import SugerenciasRespuestasRapidas from './SugerenciasRespuestasRapidas';

export default function BurbujaMensajeChat({ mensaje, onAccionTexto }) {
  const esUsuario = mensaje.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex gap-3 max-w-[85%] ${esUsuario ? 'self-end flex-row-reverse' : 'self-start'}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
          esUsuario
            ? 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
            : 'bg-brand-100 text-brand-600 dark:bg-brand-900 dark:text-brand-300'
        }`}
      >
        {esUsuario ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div className="flex flex-col gap-2">
        <div
          className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
            esUsuario
              ? 'bg-brand-500 text-white rounded-tr-sm'
              : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-sm'
          }`}
        >
          {mensaje.text}
        </div>

        <CarruselProductosChat
          productos={mensaje.products}
          onComprarProducto={(nombre) => onAccionTexto(`Comprar ${nombre}`)}
        />

        <SugerenciasRespuestasRapidas
          opciones={mensaje.options}
          onSeleccionarOpcion={(opcion) => onAccionTexto(opcion)}
        />
      </div>
    </motion.div>
  );
}

