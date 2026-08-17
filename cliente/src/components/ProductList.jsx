import { useEffect, useState } from 'react';
import { productAPI, cartAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function ProductList({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

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
      toast.success(`${nombre} agregado al carrito!`);
      onAddToCart(); // Refrescar carrito
    } catch (error) {
      console.error('Error al agregar', error);
      toast.error('Ocurrió un error al agregar.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {productos.map(producto => (
        <div key={producto.id} className="card flex flex-col p-6 group">
          {/* Placeholder de imagen */}
          <div className="w-full h-48 bg-slate-100 rounded-xl mb-4 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-200 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
              {producto.categoria.toUpperCase()}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-slate-800 mb-2">{producto.nombre}</h3>
          <p className="text-slate-500 text-sm mb-6 flex-1">{producto.descripcion}</p>
          
          <div className="flex justify-between items-center mt-auto">
            <span className="text-xl font-bold text-slate-900">${producto.precio.toFixed(2)}</span>
            <button 
              className="btn-primary" 
              onClick={() => handleAddToCart(producto.id, producto.nombre)}
            >
              Agregar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
