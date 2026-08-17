import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ShoppingBag, Zap } from 'lucide-react';
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
    <div className="min-h-screen bg-background text-slate-900 font-sans selection:bg-brand-500 selection:text-white pb-20">
      <Header 
        toggleCart={() => setIsCartOpen(true)} 
        cartCount={totalItems} 
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32 mb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-slate-900 opacity-90"></div>
          
          {/* Elementos decorativos */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-brand-500 rounded-full blur-[128px] opacity-50"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-purple-500 rounded-full blur-[128px] opacity-30"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <Zap size={16} className="text-yellow-400" />
              <span className="text-sm font-medium tracking-wide">Nueva Colección 2026</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight"
            >
              La tecnología del futuro, <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-teal-300">
                hoy en tus manos.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light mb-10"
            >
              Descubre nuestra selección premium de laptops, monitores y accesorios diseñados para creadores exigentes.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2 mx-auto"
              onClick={() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' })}
            >
              <ShoppingBag size={20} />
              Explorar Catálogo
            </motion.button>
          </div>
        </section>

        {/* Listado de Productos */}
        <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Destacados</h2>
              <p className="text-slate-500 mt-2">Los mejores equipos para potenciar tu creatividad.</p>
            </div>
          </div>
          <ProductList onAddToCart={loadCart} />
        </section>
      </main>

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
          className: 'text-sm font-bold rounded-2xl shadow-floating border border-slate-100',
          duration: 3000,
        }} 
      />
    </div>
  );
}

export default App;
