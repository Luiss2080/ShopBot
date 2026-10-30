import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { usePreferenciaTema } from '../contexto/ProveedorPreferenciaTema';

export default function InterruptorTemaVisual() {
  const { esModoOscuro, alternarTema } = usePreferenciaTema();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={alternarTema}
      aria-label={esModoOscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-yellow-400 hover:shadow-sm transition-colors flex items-center justify-center"
    >
      {esModoOscuro ? (
        <Sun size={18} className="animate-spin-slow" />
      ) : (
        <Moon size={18} className="text-slate-600" />
      )}
    </motion.button>
  );
}
