import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ClienteApiProductos from '../servicios/ClienteApiProductos';
import ClienteApiCarrito from '../../carrito/servicios/ClienteApiCarrito';
import TarjetaProductoCatalogo from './TarjetaProductoCatalogo';
import ModalVistaRapidaProducto from './ModalVistaRapidaProducto';

export default function GrillaProductosCatalogo({ onAddToCart }) {
  const [searchParams] = useSearchParams();
  const queryBusqueda = searchParams.get('q') || '';

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todos');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    const peticion = queryBusqueda.trim() !== ''
      ? ClienteApiProductos.buscarProductosPorTermino(queryBusqueda)
      : ClienteApiProductos.obtenerCatalogoCompleto();

    peticion
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
        console.error('Error al consultar productos:', err);
        setLoading(false);
      });
  }, [queryBusqueda]);

  const handleAddToCart = async (id, nombre) => {
    try {
      await ClienteApiCarrito.agregarItem(id, 1);
      toast.success(`${nombre} agregado al carrito!`, { icon: '🛒' });
      if (onAddToCart) onAddToCart();
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      toast.error('Ocurrió un error al agregar el producto.');
    }
  };

  const categorias = ['todos', ...new Set(productos.map(p => p.categoria).filter(Boolean))];
  const filtrados = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div>
      {queryBusqueda && (
        <div className="mb-6 p-4 rounded-2xl bg-brand-50 dark:bg-brand-950/30 border border-brand-100 dark:border-brand-900 text-sm text-brand-800 dark:text-brand-300 flex justify-between items-center">
          <span>Resultados para la búsqueda: <strong>"{queryBusqueda}"</strong></span>
          <span className="text-xs bg-brand-200 dark:bg-brand-900 px-2.5 py-1 rounded-full">{filtrados.length} encontrados</span>
        </div>
      )}

      {/* Barra de Filtros */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
              filtro === cat 
                ? 'bg-brand-500 text-white shadow-md' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
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
          {filtrados.map((producto) => (
            <TarjetaProductoCatalogo 
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
          <p className="text-xl">No encontramos productos en esta búsqueda o categoría.</p>
        </div>
      )}

      {/* Modal de Vista Rápida */}
      <AnimatePresence>
        {selectedProduct && (
          <ModalVistaRapidaProducto 
            producto={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
            onAddToCart={handleAddToCart} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
