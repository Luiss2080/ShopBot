import { Link } from 'react-router-dom';

export default function PiePaginaInformativo() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Shop<span className="text-brand-500">Bot</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              El futuro del comercio electrónico impulsado por Inteligencia Artificial conversacional.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4">Navegación</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/" className="hover:text-brand-500 transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-brand-500 transition-colors">Catálogo</Link></li>
              <li><Link to="/ofertas" className="hover:text-brand-500 transition-colors">Ofertas</Link></li>
              <li><Link to="/acerca" className="hover:text-brand-500 transition-colors">Acerca de</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><span className="text-slate-400">Asistente Virtual 24/7</span></li>
              <li><span className="text-slate-400">Preguntas Frecuentes</span></li>
              <li><span className="text-slate-400">Política de Privacidad</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider mb-4">Tecnología</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Arquitectura Modular por Dominios, React 19, Vite, Tailwind CSS y Node-NLP.
            </p>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          <p>© 2026 ShopBot Inc. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
