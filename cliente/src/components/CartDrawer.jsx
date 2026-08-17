import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function CartDrawer({ isOpen, onClose, cart, refreshCart }) {
  const handleRemove = async (itemId) => {
    try {
      await cartAPI.removeItem(itemId);
      toast.success('Producto eliminado', { icon: '🗑️' });
      refreshCart();
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al eliminar');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          
          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-brand-50 text-brand-600 p-2 rounded-xl">
                  <ShoppingBag size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Tu Carrito</h2>
              </div>
              <button 
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4 bg-slate-50/50">
              {cart.items?.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
                  <ShoppingBag size={64} className="opacity-20 mb-4" />
                  <p className="text-lg font-medium text-slate-500">Tu carrito está vacío</p>
                  <button onClick={onClose} className="mt-4 text-brand-500 font-medium hover:underline">
                    Seguir comprando
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.items?.map(item => (
                    <motion.div 
                      key={item.itemId}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, x: 20 }}
                      className="flex justify-between items-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm"
                    >
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 mb-1">{item.nombre}</h4>
                        <div className="flex items-center gap-2">
                          <span className="text-brand-600 font-semibold text-sm">
                            ${item.precio.toFixed(2)}
                          </span>
                          <span className="text-slate-400 text-xs">x {item.cantidad}</span>
                        </div>
                      </div>
                      <button 
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-4"
                        onClick={() => handleRemove(item.itemId)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {cart.items?.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium">Total a pagar</span>
                  <span className="text-3xl font-black text-slate-900">${(cart.total || 0).toFixed(2)}</span>
                </div>
                <button className="btn-primary w-full py-4 text-lg font-bold flex items-center justify-center gap-2" onClick={() => toast.success('¡Compra simulada con éxito!')}>
                  Proceder al Pago
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
