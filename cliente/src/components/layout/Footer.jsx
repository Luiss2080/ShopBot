import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Col 1: About */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">
              Shop<span className="text-brand-500">Bot</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Tu destino tecnológico impulsado por IA. Ofrecemos la mejor selección de gadgets con una experiencia de compra conversacional única en el mundo.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Inicio</Link></li>
              <li><Link to="/catalogo" className="hover:text-brand-400 transition-colors">Catálogo Completo</Link></li>
              <li><Link to="/ofertas" className="hover:text-brand-400 transition-colors">Ofertas del Mes</Link></li>
              <li><Link to="/acerca" className="hover:text-brand-400 transition-colors">Sobre Nosotros</Link></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contacto</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-500 shrink-0 mt-0.5" />
                <span>123 Tech Avenue, Silicon Valley<br/>CA 94025, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-500 shrink-0" />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-500 shrink-0" />
                <span>soporte@shopbot.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">
              Suscríbete para recibir ofertas exclusivas y novedades del mundo tech.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-xl outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all text-sm"
              />
              <button className="bg-brand-500 hover:bg-brand-600 text-white font-medium px-4 py-3 rounded-xl transition-colors text-sm">
                Suscribirse
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ShopBot Inc. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
