import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import CabeceraNavegacionPrincipal from './compartido/layout/CabeceraNavegacionPrincipal';
import PiePaginaInformativo from './compartido/layout/PiePaginaInformativo';
import PanelLateralCarrito from './modulos/carrito/componentes/PanelLateralCarrito';
import WidgetChatbotConversacional from './modulos/asistente-conversacional/componentes/WidgetChatbotConversacional';
import ModalAutenticacionCliente from './modulos/autenticacion/componentes/ModalAutenticacionCliente';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Checkout from './pages/Checkout';
import Offers from './pages/Offers';
import About from './pages/About';
import DetalleProducto from './pages/DetalleProducto';
import ClienteApiCarrito from './modulos/carrito/servicios/ClienteApiCarrito';

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
        <Route path="/producto/:id" element={<DetalleProducto loadCart={loadCart} />} />
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
      const data = await ClienteApiCarrito.obtenerCarritoActual();
      setCart(data);
    } catch (error) {
      console.error('Error al cargar carrito:', error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const totalItems = cart.items?.reduce((acc, item) => acc + item.cantidad, 0) || 0;

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900 transition-colors duration-300">
        <CabeceraNavegacionPrincipal 
          toggleCart={() => setIsCartOpen(true)} 
          cartCount={totalItems} 
          openLogin={() => setIsLoginOpen(true)}
        />
        
        <main className="flex-1 relative">
          <AnimatedRoutes loadCart={loadCart} cart={cart} />
        </main>

        <PiePaginaInformativo />

        <PanelLateralCarrito 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          refreshCart={loadCart}
        />

        <ModalAutenticacionCliente 
          isOpen={isLoginOpen} 
          onClose={() => setIsLoginOpen(false)} 
        />

        <WidgetChatbotConversacional onAddToCart={loadCart} />
        
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
