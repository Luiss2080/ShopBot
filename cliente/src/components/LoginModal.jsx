import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Package, ShoppingBag, BarChart3, ShieldCheck, ArrowRight, MapPin, Mail, Lock, Facebook, Instagram, Twitter } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row relative bg-[#FFF9F5]"
        >
          {/* Columna Izquierda: Branding ShopBot */}
          <div className="w-full md:w-[45%] bg-gradient-to-b from-[#8B1A1A] to-[#601010] p-8 md:p-12 text-white flex flex-col items-center text-center relative overflow-hidden">
            {/* Círculos decorativos de fondo */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
               <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
               <div className="absolute bottom-10 -right-20 w-80 h-80 bg-black opacity-20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
              
              <div className="flex flex-col items-center">
                {/* Icono Gigante */}
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-xl">
                  <Gift size={48} className="text-white" strokeWidth={1.5} />
                </div>

                {/* Títulos */}
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Bienvenido a</h2>
                <h1 className="text-4xl md:text-5xl font-black text-[#D4AF37] tracking-tighter mb-6 uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                  ShopBot
                </h1>

                {/* Descripción */}
                <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 max-w-[280px]">
                  Vive la experiencia inmersiva de compras. Entiende conceptos complejos con nuestro asistente de IA antes de decidirte.
                </p>

                {/* Pill de Soporte */}
                <div className="bg-[#111] px-5 py-2.5 rounded-full border border-white/10 shadow-lg mb-10 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                  <span className="text-xs font-bold tracking-wider text-white/90">SOPORTE SHOPBOT 24/7</span>
                </div>
              </div>

              <div className="w-full">
                {/* Mini Tarjetas Oscuras */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-left backdrop-blur-sm">
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider flex items-center gap-1.5 mb-1"><Package size={12}/> PRODUCTOS</span>
                    <p className="font-bold text-sm">Catálogo & IA</p>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-left backdrop-blur-sm">
                    <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider flex items-center gap-1.5 mb-1"><ShoppingBag size={12}/> COMPRAS</span>
                    <p className="font-bold text-sm">A medida y Web</p>
                  </div>
                </div>

                {/* Redes Sociales */}
                <div className="flex flex-col items-center">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-3">Conecta con ShopBot</span>
                  <div className="flex gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Columna Derecha: Formulario de Interacción */}
          <div className="w-full md:w-[55%] p-6 md:p-10 relative flex flex-col justify-center">
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-200/50 hover:bg-slate-200 text-slate-500 hover:text-slate-800 rounded-full flex items-center justify-center transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="max-w-[420px] mx-auto w-full">
              
              {/* Tarjeta Superior Blanca */}
              <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-slate-100 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <User size={18} className="text-[#8B1A1A]" />
                  <h3 className="font-black text-xl text-slate-800">Acceso a tu Cuenta</h3>
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  INGRESA PARA OBTENER BENEFICIOS
                </p>
              </div>

              {/* 3 Mini-Tarjetas Blancas */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-sm border border-slate-100">
                  <Package size={16} className="text-red-500 mb-1" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Módulo</span>
                  <span className="text-xs font-black text-slate-800">Catálogo</span>
                </div>
                <div className="bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-sm border border-slate-100">
                  <ShoppingBag size={16} className="text-red-500 mb-1" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Módulo</span>
                  <span className="text-xs font-black text-slate-800">Pedidos</span>
                </div>
                <div className="bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-sm border border-slate-100">
                  <BarChart3 size={16} className="text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">Estado</span>
                  <span className="text-xs font-black text-slate-800">Invitado</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Únete a cientos de clientes que ya están comprando de una manera inteligente. Todo el catálogo a tu disposición con <span className="font-bold text-[#8B1A1A]">descuentos exclusivos</span>.
                </p>

                {/* Caja Amarilla */}
                <div className="bg-[#FFF9E6] border border-[#FDE68A] rounded-xl p-3 flex items-center gap-3 mb-6">
                  <ShieldCheck size={20} className="text-[#D97706] shrink-0" />
                  <span className="text-xs font-semibold text-[#92400E]">100% seguro. Sin tarjetas ni compromisos ocultos.</span>
                </div>

                {/* Formulario */}
                <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
                  <button onClick={() => setTab('login')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'login' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>Iniciar Sesión</button>
                  <button onClick={() => setTab('register')} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'register' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'}`}>Registrarme</button>
                </div>

                <div className="space-y-3 mb-6">
                  {tab === 'register' && (
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" placeholder="Nombre completo" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none focus:border-[#C6A25D] text-sm font-medium" />
                    </div>
                  )}
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="email" placeholder="Correo electrónico" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none focus:border-[#C6A25D] text-sm font-medium" />
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input type="password" placeholder="Contraseña" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none focus:border-[#C6A25D] text-sm font-medium" />
                  </div>
                </div>

                {/* Botones Grandes */}
                <button className="w-full bg-[#C6A25D] hover:bg-[#B38D45] text-slate-900 font-black tracking-widest py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 mb-3">
                  {tab === 'login' ? 'ACCEDER AHORA' : 'CREAR CUENTA AHORA'}
                  <ArrowRight size={18} />
                </button>
                
                <button onClick={onClose} className="w-full bg-[#8B1A1A] hover:bg-[#731515] text-white font-bold tracking-widest py-3.5 rounded-xl transition-colors shadow-md">
                  QUIZÁS MÁS TARDE
                </button>
              </div>

              {/* Consejo Inferior */}
              <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm border border-slate-100">
                <MapPin size={16} className="text-[#8B1A1A] shrink-0 mt-0.5" />
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Consejo: Al acceder con tu cuenta, podrás ver todas las ofertas de temporada y guardar tu carrito inmediatamente.
                </p>
              </div>

            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
