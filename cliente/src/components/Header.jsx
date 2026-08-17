import { ShoppingCart } from 'lucide-react';

export default function Header({ toggleCart, cartCount }) {
  return (
    <header className="flex justify-between items-center mb-10 pb-4 border-b border-slate-200">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Shop<span className="text-brand-500">Bot</span>
      </h1>
      <button 
        onClick={toggleCart}
        className="flex items-center gap-2 bg-surface border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
      >
        <ShoppingCart size={20} className="text-slate-600" />
        <span className="text-slate-700">Mi Carrito</span>
        {cartCount > 0 && (
          <span className="bg-brand-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </header>
  );
}
