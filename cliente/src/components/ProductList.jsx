import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productAPI, cartAPI } from '../services/api';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';

export default function ProductList({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    productAPI.getAll()
      .then(data => {
        if (Array.isArray(data)) {
          setProductos(data);
        } else {
          console.error('La respuesta no es un arreglo:', data);
          setProductos([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = async (id, nombre) => {
    try {
      await cartAPI.addItem(id, 1);
      toast.success(`${nombre} agregado al carrito!`, { icon: '🛒' });
      onAddToCart();
    } catch (error) {
      console.error('Error al agregar', error);
      toast.error('Ocurrió un error al agregar.');
    }
  };

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria))];
  const filtrados = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);

  if (loading) return (
    <div className="flex justify-center items-center py-32">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
    </div>
  );

  return (
    <div>
      {/* Barra de Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
              filtro === cat 
                ? 'bg-brand-500 text-white shadow-md' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Productos */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence>
          {filtrados.map((producto, i) => (
            <ProductCard 
              key={producto.id} 
              producto={producto} 
              onAddToCart={handleAddToCart}
              onClickView={setSelectedProduct}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtrados.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">No encontramos productos en esta categoría.</p>
        </div>
      )}

      {/* Modal de Vista Rápida */}
      <AnimatePresence>
        {selectedProduct && (
          <QuickViewModal 
            producto={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={handleAddToCart} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
