import { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, ArrowRight, Package, ShoppingBag, BarChart3, MapPin } from 'lucide-react';

export default function FormularioCredencialesCliente({ onCerrarModal }) {
  const [pestanaActiva, setPestanaActiva] = useState('login');

  return (
    <div className="max-w-[420px] mx-auto w-full">
      <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <User size={18} className="text-[#8B1A1A]" />
          <h3 className="font-black text-xl text-slate-800">Acceso a tu Cuenta</h3>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          INGRESA PARA OBTENER BENEFICIOS
        </p>
      </div>

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
          Únete a cientos de clientes que ya compran de manera inteligente con descuentos exclusivos.
        </p>

        <div className="bg-[#FFF9E6] border border-[#FDE68A] rounded-xl p-3 flex items-center gap-3 mb-6">
          <ShieldCheck size={20} className="text-[#D97706] shrink-0" />
          <span className="text-xs font-semibold text-[#92400E]">100% seguro. Sin compromisos ocultos.</span>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setPestanaActiva('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              pestanaActiva === 'login' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setPestanaActiva('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              pestanaActiva === 'register' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'
            }`}
          >
            Registrarme
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {pestanaActiva === 'register' && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Nombre completo" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none text-sm font-medium" />
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" placeholder="Correo electrónico" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none text-sm font-medium" />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" placeholder="Contraseña" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none text-sm font-medium" />
          </div>
        </div>

        <button className="w-full bg-[#C6A25D] hover:bg-[#B38D45] text-slate-900 font-black tracking-widest py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 mb-3">
          {pestanaActiva === 'login' ? 'ACCEDER AHORA' : 'CREAR CUENTA AHORA'}
          <ArrowRight size={18} />
        </button>

        <button onClick={onCerrarModal} className="w-full bg-[#8B1A1A] hover:bg-[#731515] text-white font-bold tracking-widest py-3.5 rounded-xl transition-colors shadow-md">
          QUIZÁS MÁS TARDE
        </button>
      </div>

      <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm border border-slate-100">
        <MapPin size={16} className="text-[#8B1A1A] shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 font-medium leading-relaxed">
          Consejo: Al acceder con tu cuenta, podrás ver todas las ofertas y sincronizar tu carrito.
        </p>
      </div>
    </div>
  );
}
