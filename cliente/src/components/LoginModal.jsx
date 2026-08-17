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
                    {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                      <button key={i} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-colors">
                        <Icon size={16} />
                      </button>
                    ))}
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
