import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ColumnaInformativaBranding from './ColumnaInformativaBranding';
import FormularioCredencialesCliente from './FormularioCredencialesCliente';

export default function ModalAutenticacionCliente({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative bg-[#FFF9F5]"
        >
          {/* Columna Branding ShopBot */}
          <ColumnaInformativaBranding />

          {/* Columna Formulario de Interacción */}
          <div className="w-full md:w-[55%] p-6 md:p-10 relative flex flex-col justify-center">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full flex items-center justify-center transition-colors z-10"
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>

            <FormularioCredencialesCliente onCerrarModal={onClose} />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
