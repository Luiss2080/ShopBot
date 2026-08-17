import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header({ toggleCart, cartCount }) {
  return (
    <header className="sticky top-0 z-30 bg-surface/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <button className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl md:hidden">
              <Menu size={24} />
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 cursor-pointer">
              Shop<span className="text-brand-500">Bot</span>
            </h1>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="Buscar productos, marcas y más..." 
              className="w-full bg-slate-100/50 border border-transparent hover:bg-slate-100 focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl px-4 py-2.5 pl-11 transition-all outline-none text-sm"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden sm:flex items-center gap-2 p-2 px-3 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="hidden lg:block">Hola, Invitado</span>
            </button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              className="relative flex items-center justify-center p-3 sm:px-4 sm:py-2.5 bg-brand-50 text-brand-600 rounded-xl hover:bg-brand-100 transition-colors"
            >
              <ShoppingCart size={22} />
              <span className="hidden sm:block ml-2 font-medium">Carrito</span>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 sm:top-2 sm:right-2 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-surface shadow-sm"
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
