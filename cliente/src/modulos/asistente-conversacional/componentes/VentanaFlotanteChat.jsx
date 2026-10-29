import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send } from 'lucide-react';
import BurbujaMensajeChat from './BurbujaMensajeChat';

export default function VentanaFlotanteChat({
  estaAbierto,
  onCerrar,
  mensajes,
  estaEscribiendo,
  referenciaFinMensajes,
  valorInput,
  onCambioInput,
  onEnviarFormulario,
  onAccionTextoMensaje
}) {
  return (
    <AnimatePresence>
      {estaAbierto && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 w-[360px] h-[600px] max-h-[80vh] bg-surface dark:bg-slate-900 rounded-3xl shadow-floating flex flex-col overflow-hidden z-50 border border-slate-100/50 dark:border-slate-800/50"
        >
          {/* Cabecera del Asistente */}
          <div className="bg-gradient-to-r from-brand-600 to-brand-500 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold">ShopBot AI</h3>
                <div className="flex items-center gap-1.5 text-brand-100 text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  En línea
                </div>
              </div>
            </div>
            <button
              onClick={onCerrar}
              className="text-brand-100 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Área de Conversación */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/50 dark:bg-slate-900/50">
            <AnimatePresence>
              {mensajes.map((mensaje) => (
                <BurbujaMensajeChat
                  key={mensaje.id}
                  mensaje={mensaje}
                  onAccionTexto={onAccionTextoMensaje}
                />
              ))}
            </AnimatePresence>

            {estaEscribiendo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 max-w-[85%] self-start"
              >
                <div className="w-8 h-8 rounded-full bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-300 flex items-center justify-center shrink-0">
                  <Bot size={16} />
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-2xl rounded-tl-sm flex gap-1.5 items-center h-[46px]">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-slate-300 rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-slate-300 rounded-full"></motion.div>
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-slate-300 rounded-full"></motion.div>
                </div>
              </motion.div>
            )}
            <div ref={referenciaFinMensajes} />
          </div>

          {/* Formulario de Entrada */}
          <form
            className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-2"
            onSubmit={onEnviarFormulario}
          >
            <input
              type="text"
              value={valorInput}
              onChange={(e) => onCambioInput(e.target.value)}
              placeholder="Pregúntale algo al bot..."
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 transition-all"
            />
            <button
              type="submit"
              disabled={!valorInput.trim() || estaEscribiendo}
              className="bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white w-12 rounded-xl transition-colors flex items-center justify-center shadow-md hover:shadow-lg"
              aria-label="Enviar mensaje"
            >
              <Send size={18} />
            </button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

