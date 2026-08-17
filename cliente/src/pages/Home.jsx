import { motion } from 'framer-motion';
import { ShoppingBag, Zap, Truck, ShieldCheck, HeadphonesIcon } from 'lucide-react';
import ProductList from '../components/ProductList';

export default function Home({ loadCart }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32 mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-slate-900 opacity-90"></div>
        
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

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-surface border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
              <Truck size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Envío Rápido 24h</h3>
            <p className="text-slate-500">Recibe tus productos tecnológicos en la puerta de tu casa al día siguiente.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-surface border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Pago Seguro</h3>
            <p className="text-slate-500">Transacciones encriptadas de extremo a extremo para tu tranquilidad.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 rounded-3xl bg-surface border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mb-6">
              <HeadphonesIcon size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Soporte 24/7</h3>
            <p className="text-slate-500">ShopBot está disponible a cualquier hora para ayudarte en tu compra.</p>
          </div>
        </div>
      </section>

      {/* Listado de Productos */}
      <section id="productos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Destacados</h2>
            <p className="text-slate-500 mt-2 text-lg">Los mejores equipos para potenciar tu creatividad.</p>
          </div>
        </div>
        <ProductList onAddToCart={loadCart} />
      </section>
      
      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-brand-50 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-64 h-64 bg-brand-200/50 rounded-full blur-[80px]"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 mb-4">¿Quieres un 15% de descuento?</h2>
            <p className="text-slate-600 mb-8 text-lg">Suscríbete a nuestro boletín y recibe ofertas exclusivas, novedades y descuentos directamente en tu correo.</p>
            <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Ingresa tu correo..." 
                className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all text-slate-700 shadow-sm"
              />
              <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                Suscribirme
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
