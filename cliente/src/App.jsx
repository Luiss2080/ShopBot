import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import Offers from './pages/Offers';
import About from './pages/About';
import CartDrawer from './components/CartDrawer';
import ChatWidget from './components/ChatWidget';
import LoginModal from './components/LoginModal';
import { cartAPI } from './services/api';

function AnimatedRoutes({ loadCart, cart }) {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home loadCart={loadCart} />} />
        <Route path="/catalogo" element={<Catalog loadCart={loadCart} />} />
        <Route path="/ofertas" element={<Offers loadCart={loadCart} />} />
        <Route path="/acerca" element={<About />} />
        <Route path="/checkout" element={<Checkout cart={cart} refreshCart={loadCart} />} />
        <Route path="*" element={<Home loadCart={loadCart} />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 transition-colors duration-300">
        <Header 
          toggleCart={() => setIsCartOpen(true)} 
          cartCount={totalItems} 
          openLogin={() => setIsLoginOpen(true)}
        />
        
        <main className="flex-1 relative">
          <AnimatedRoutes loadCart={loadCart} cart={cart} />
        </main>

        <Footer />

        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          refreshCart={loadCart}
        />

        <LoginModal 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
        />

        <ChatWidget onAddToCart={loadCart} />
        
        <Toaster 
          position="top-center" 
          toastOptions={{
            className: 'text-sm font-bold rounded-2xl shadow-floating border border-slate-100',
            duration: 3000,
          }} 
        />
      </div>
    </Router>
  );
}

export default App;
