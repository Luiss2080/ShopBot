import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';

export default function ProductCard({ producto, onAddToCart, onClickView }) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="bg-surface rounded-2xl border border-slate-100 shadow-soft hover:shadow-floating transition-all duration-300 flex flex-col group overflow-hidden"
    >
      {/* Contenedor de Imagen */}
      <div className="relative w-full h-56 bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onClickView(producto)}>
        {producto.imagen ? (
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            Sin imagen
          </div>
        )}
        
        {/* Overlay de Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onClickView(producto); }}
            className="bg-white text-slate-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          >
            <Eye size={18} />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); onAddToCart(producto.id, producto.nombre); }}
            className="bg-brand-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
          >
            <ShoppingCart size={18} />
          </motion.button>
        </div>

        {/* Badge de Categoría */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-700 px-2.5 py-1 rounded-lg uppercase tracking-wider">
          {producto.categoria}
        </div>
      </div>
      
      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 line-clamp-1 cursor-pointer hover:text-brand-500 transition-colors" onClick={() => onClickView(producto)}>
          {producto.nombre}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
          {producto.descripcion}
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Precio</span>
            <span className="text-xl font-black text-slate-900">${producto.precio.toFixed(2)}</span>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(producto.id, producto.nombre)}
            className="bg-slate-900 hover:bg-brand-500 text-white p-2.5 rounded-xl transition-colors shadow-md"
          >
            <ShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
