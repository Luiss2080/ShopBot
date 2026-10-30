import { motion } from 'framer-motion';
import { Truck } from 'lucide-react';

export default function FormularioDatosEnvio({ datosEnvio, onActualizarDatos, onContinuarPago }) {
  const manejarEnvio = (e) => {
    e.preventDefault();
    onContinuarPago();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm"
    >
      <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="bg-brand-50 dark:bg-brand-900/30 p-3 rounded-2xl text-brand-600 dark:text-brand-400">
          <Truck size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Datos de Envío</h2>
      </div>
      
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={manejarEnvio}>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre Completo</label>
          <input 
            type="text" 
            required 
            value={datosEnvio.nombreCliente}
            onChange={(e) => onActualizarDatos('nombreCliente', e.target.value)}
            placeholder="Juan Pérez" 
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Teléfono</label>
          <input 
            type="text" 
            required 
            value={datosEnvio.telefonoCliente}
            onChange={(e) => onActualizarDatos('telefonoCliente', e.target.value)}
            placeholder="+1 234 567 8900" 
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm" 
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Dirección de Envío</label>
          <input 
            type="text" 
            required 
            value={datosEnvio.direccionEnvio}
            onChange={(e) => onActualizarDatos('direccionEnvio', e.target.value)}
            placeholder="Av. Principal 123, Ciudad, País" 
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm" 
          />
        </div>
        
        <div className="sm:col-span-2 flex justify-end mt-4">
          <button 
            type="submit" 
            className="bg-slate-900 hover:bg-brand-500 text-white px-8 py-3.5 rounded-xl font-bold transition-colors flex items-center gap-2"
          >
            Continuar al Pago
          </button>
        </div>
      </form>
    </motion.div>
  );
}
