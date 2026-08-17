import { motion } from 'framer-motion';
import { Tag, Sparkles } from 'lucide-react';
import ProductList from '../components/ProductList';

export default function Offers({ loadCart }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pt-8 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]"
    >
      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white mb-12 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <Tag size={300} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-6">
            <Sparkles size={16} className="text-yellow-300" />
            Liquidación de Verano
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Hasta 40% de Descuento
          </h1>
          <p className="text-red-100 text-lg md:text-xl">
            Aprovecha nuestros precios reducidos en tecnología seleccionada. Ofertas válidas hasta agotar stock.
          </p>
        </div>
      </div>
      
      {/* Reutilizamos el ProductList para simplificar en este prototipo */}
      <ProductList onAddToCart={loadCart} />
    </motion.div>
  );
}
