import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function BarraBusquedaGlobalCatalogo() {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    const terminoLimpio = terminoBusqueda.trim();
    if (terminoLimpio.length > 0) {
      navigate(`/catalogo?q=${encodeURIComponent(terminoLimpio)}`);
    } else {
      navigate('/catalogo');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="hidden md:flex flex-1 max-w-sm mx-8 relative">
      <input
        type="text"
        value={terminoBusqueda}
        onChange={(e) => setTerminoBusqueda(e.target.value)}
        placeholder="Buscar productos en la tienda..."
        aria-label="Buscar productos en el catálogo"
        className="w-full bg-slate-100/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 rounded-xl px-4 py-2 pl-11 transition-all outline-none text-sm text-slate-900 dark:text-white"
      />
      <button
        type="submit"
        aria-label="Ejecutar búsqueda"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-500"
      >
        <Search size={16} />
      </button>
    </form>
  );
}
