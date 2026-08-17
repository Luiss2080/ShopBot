import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
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
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header 
          toggleCart={() => setIsCartOpen(true)} 
          cartCount={totalItems} 
        />
        
        <main>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Nuestros Productos</h2>
            <p className="text-slate-500">Encuentra la mejor tecnología al mejor precio.</p>
          </div>
          <ProductList onAddToCart={loadCart} />
        </main>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        refreshCart={loadCart}
      />

      <ChatWidget onAddToCart={loadCart} />
      
      <Toaster 
        position="top-center" 
        toastOptions={{
          className: 'text-sm font-medium rounded-xl shadow-soft border border-slate-100',
        }} 
      />
    </div>
  );
}

export default App;
