import { motion } from 'framer-motion';
import { X, ShoppingCart, Star, CheckCircle2 } from 'lucide-react';

export default function QuickViewModal({ producto, onClose, onAddToCart }) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-surface w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Imagen */}
          <div className="w-full md:w-1/2 bg-slate-100 relative min-h-[300px]">
            {producto.imagen ? (
              <img src={producto.imagen} alt={producto.nombre} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-slate-400">Sin imagen</div>
            )}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider text-slate-800">
              {producto.categoria}
            </div>
          </div>

          {/* Detalles */}
          <div className="w-full md:w-1/2 p-8 flex flex-col relative overflow-y-auto">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-1 text-yellow-400 mb-3 mt-4">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-slate-400 text-sm ml-2">(42 reseñas)</span>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">{producto.nombre}</h2>
            
            <p className="text-slate-600 leading-relaxed mb-8 flex-1">
              {producto.descripcion}
            </p>
            
            <div className="flex flex-col gap-6 mt-auto">
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <CheckCircle2 size={18} />
                <span>En stock ({producto.stock} disponibles)</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-slate-900">${producto.precio.toFixed(2)}</span>
                <button 
                  onClick={() => {
                    onAddToCart(producto.id, producto.nombre);
                    onClose();
                  }}
                  className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <ShoppingCart size={22} />
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
