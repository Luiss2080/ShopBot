import { ShoppingCart } from 'lucide-react';

export default function Header({ toggleCart, cartCount }) {
  return (
    <header>
      <h1>ShopBot</h1>
      <button className="cart-toggle" onClick={toggleCart}>
        <ShoppingCart size={20} />
        <span>Mi Carrito {cartCount > 0 && `(${cartCount})`}</span>
      </button>
    </header>
  );
}
