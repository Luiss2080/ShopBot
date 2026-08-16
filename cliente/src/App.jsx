import { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import ChatWidget from './components/ChatWidget';
import { cartAPI } from './services/api';

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadCart = async () => {
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const totalItems = cart.items?.reduce((acc, item) => acc + item.cantidad, 0) || 0;

  return (
    <div className="app-container">
      <Header 
        toggleCart={() => setIsCartOpen(true)} 
        cartCount={totalItems} 
      />
      
      <main>
        <ProductList onAddToCart={loadCart} />
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        refreshCart={loadCart}
      />

      <ChatWidget onAddToCart={loadCart} />
    </div>
  );
}

export default App;
