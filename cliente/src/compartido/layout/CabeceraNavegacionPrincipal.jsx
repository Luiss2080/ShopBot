import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import BarraBusquedaGlobalCatalogo from '../componentes/BarraBusquedaGlobalCatalogo';
import InterruptorTemaVisual from '../componentes/InterruptorTemaVisual';

export default function CabeceraNavegacionPrincipal({ toggleCart, cartCount, openLogin }) {
  const location = useLocation();
  const esRutaActiva = (ruta) => location.pathname === ruta;

  return (
    <header className="sticky top-0 z-40 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl lg:hidden">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Shop<span className="text-brand-500">Bot</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8 ml-10">
              <Link to="/" className={`text-sm font-medium transition-colors ${esRutaActiva('/') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Inicio
              </Link>
              <Link to="/catalogo" className={`text-sm font-medium transition-colors ${esRutaActiva('/catalogo') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Catálogo
              </Link>
              <Link to="/ofertas" className={`text-sm font-medium transition-colors ${esRutaActiva('/ofertas') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Ofertas
              </Link>
              <Link to="/acerca" className={`text-sm font-medium transition-colors ${esRutaActiva('/acerca') ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Acerca de
              </Link>
            </nav>
          </div>

          <BarraBusquedaGlobalCatalogo />

          <div className="flex items-center gap-2 sm:gap-3">
            <InterruptorTemaVisual />

            <div 
              onClick={openLogin}
              className="hidden sm:flex items-center gap-2 p-1.5 px-3 border border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:shadow-sm transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white">
                <User size={14} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Mi Cuenta</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative flex items-center justify-center p-3 sm:px-4 sm:py-2.5 bg-brand-500 text-white rounded-2xl hover:bg-brand-600 shadow-soft transition-colors"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:block ml-2 font-medium text-sm">Carrito</span>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 sm:top-[-6px] sm:right-[-6px] bg-red-500 text-white text-[11px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-surface shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
}
