import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TarjetaConfirmacionExitosa({ numeroOrden }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 rounded-3xl shadow-sm text-center max-w-lg mx-auto"
    >
      <div className="w-24 h-24 bg-green-50 dark:bg-green-950/40 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle size={48} />
      </div>
      
      <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">¡Compra Exitosa!</h2>
      
      {numeroOrden && (
        <div className="inline-block bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mb-4">
          Orden: {numeroOrden}
        </div>
      )}

      <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm">
        Tu pedido ha sido registrado y procesado correctamente en nuestro sistema. Recibirás un correo electrónico con los detalles del envío pronto.
      </p>

      <Link 
        to="/" 
        className="inline-block bg-slate-900 hover:bg-brand-500 text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-md"
      >
        Volver al Inicio
      </Link>
    </motion.div>
  );
}
