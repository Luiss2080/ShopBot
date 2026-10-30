import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import PanelResumenOrden from './PanelResumenOrden';

export default function FormularioMetodoPago({ items, total, estaCargando, onProcesarPago, onVolverAtras }) {
  const [cuponAplicado, setCuponAplicado] = useState(null);

  const manejarPago = (e) => {
    e.preventDefault();
    onProcesarPago(cuponAplicado);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: 20 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-8"
    >
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm h-fit">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="bg-brand-50 dark:bg-brand-900/30 p-3 rounded-2xl text-brand-600 dark:text-brand-400">
            <CreditCard size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Método de Pago</h2>
        </div>
        
        <form id="formulario-metodo-pago" onSubmit={manejarPago} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Número de Tarjeta</label>
            <input 
              type="text" 
              required 
              placeholder="0000 0000 0000 0000" 
              maxLength="19" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-mono text-sm" 
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Vencimiento</label>
              <input 
                type="text" 
                required 
                placeholder="MM/YY" 
                maxLength="5" 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-mono text-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">CVC</label>
              <input 
                type="text" 
                required 
                placeholder="123" 
                maxLength="4" 
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-mono text-sm" 
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre en la tarjeta</label>
            <input 
              type="text" 
              required 
              placeholder="JUAN PEREZ" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all uppercase text-sm" 
            />
          </div>
        </form>
      </div>

      <PanelResumenOrden 
        items={items} 
        total={total} 
        estaCargando={estaCargando} 
        onVolverAtras={onVolverAtras}
        cuponAplicado={cuponAplicado}
        onAplicarCupon={setCuponAplicado}
        onRemoverCupon={() => setCuponAplicado(null)}
      />
    </motion.div>
  );
}
