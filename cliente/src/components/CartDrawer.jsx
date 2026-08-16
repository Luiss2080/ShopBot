import { X, Trash2 } from 'lucide-react';
import { cartAPI } from '../services/api';

export default function CartDrawer({ isOpen, onClose, cart, refreshCart }) {
  if (!isOpen) return null;

  const handleRemove = async (itemId) => {
    try {
      await cartAPI.removeItem(itemId);
      refreshCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={e => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="cart-items">
          {cart.items?.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            cart.items?.map(item => (
              <div key={item.itemId} className="cart-item">
                <div className="cart-item-info">
                  <h4>{item.nombre} (x{item.cantidad})</h4>
                  <p>${item.precio.toFixed(2)} c/u</p>
                </div>
                <button className="close-btn" onClick={() => handleRemove(item.itemId)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${(cart.total || 0).toFixed(2)}</span>
          </div>
          <button className="btn-primary btn-block">Proceder al Pago</button>
        </div>
      </div>
    </div>
  );
}
