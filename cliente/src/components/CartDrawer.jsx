import { X, Trash2, ShoppingBag } from 'lucide-react';
import { cartAPI } from '../services/api';
import toast from 'react-hot-toast';

export default function CartDrawer({ isOpen, onClose, cart, refreshCart }) {
  const handleRemove = async (itemId) => {
    try {
      await cartAPI.removeItem(itemId);
      toast.success('Producto eliminado');
      refreshCart();
    } catch (error) {
      console.error(error);
      toast.error('Ocurrió un error al eliminar');
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-surface shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-brand-500" size={24} />
            <h2 className="text-xl font-bold text-slate-800">Tu Carrito</h2>
          </div>
          <button 
            className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {cart.items?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            cart.items?.map(item => (
              <div key={item.itemId} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-1">{item.nombre}</h4>
                  <p className="text-slate-500 text-sm">
                    {item.cantidad} x ${item.precio.toFixed(2)}
                  </p>
                </div>
                <button 
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors ml-4"
                  onClick={() => handleRemove(item.itemId)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.items?.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium">Total a pagar</span>
              <span className="text-2xl font-bold text-slate-900">${(cart.total || 0).toFixed(2)}</span>
            </div>
            <button className="btn-primary w-full py-3 text-lg" onClick={() => toast('Funcionalidad de pago pendiente', { icon: '💳' })}>
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </>
  );
}
