import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Bell, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ toggleCart, cartCount }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  // Dark Mode Logic
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark');
  });

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl lg:hidden">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Shop<span className="text-brand-500">Bot</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 ml-10">
              <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Inicio
              </Link>
              <Link to="/catalogo" className={`text-sm font-medium transition-colors ${isActive('/catalogo') ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Catálogo
              </Link>
              <Link to="/ofertas" className={`text-sm font-medium transition-colors ${isActive('/ofertas') ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Ofertas
              </Link>
              <Link to="/acerca" className={`text-sm font-medium transition-colors ${isActive('/acerca') ? 'text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}`}>
                Acerca de
              </Link>
            </nav>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-sm mx-8 relative">
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="w-full bg-slate-100/50 dark:bg-slate-800 border border-transparent hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 dark:focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl px-4 py-2 pl-11 transition-all outline-none text-sm dark:text-white"
            />
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            <button 
              onClick={toggleDarkMode}
              className="p-2 text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="hidden sm:flex p-2 text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Bell size={20} />
            </button>

            <div className="hidden sm:flex items-center gap-2 p-1.5 px-3 border border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:shadow-sm transition-all">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white">
                <User size={14} />
              </div>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Mi Cuenta</span>
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
