import { useState } from 'react';
import { User, Mail, Lock, ArrowRight, Package, LogOut } from 'lucide-react';
import { useEstadoSesion } from '../contexto/ProveedorEstadoSesion';
import HistorialPedidosCliente from './HistorialPedidosCliente';

export default function FormularioCredencialesCliente({ onCerrarModal }) {
  const [pestanaActiva, setPestanaActiva] = useState('login');
  const [subVistaAutenticado, setSubVistaAutenticado] = useState('perfil');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { usuarioActual, estaAutenticado, estaCargando, iniciarSesion, registrarUsuario, cerrarSesion } = useEstadoSesion();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    let exito = false;
    if (pestanaActiva === 'login') {
      exito = await iniciarSesion(email, password);
    } else {
      exito = await registrarUsuario(nombre, email, password);
    }
    if (exito && onCerrarModal) {
      onCerrarModal();
    }
  };

  if (estaAutenticado && usuarioActual) {
    return (
      <div className="max-w-[420px] mx-auto w-full bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div className="flex bg-slate-100 p-1 rounded-xl mb-5">
          <button
            type="button"
            onClick={() => setSubVistaAutenticado('perfil')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              subVistaAutenticado === 'perfil' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'
            }`}
          >
            <User size={14} /> Mi Perfil
          </button>
          <button
            type="button"
            onClick={() => setSubVistaAutenticado('pedidos')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              subVistaAutenticado === 'pedidos' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'
            }`}
          >
            <Package size={14} /> Mis Pedidos
          </button>
        </div>

        {subVistaAutenticado === 'perfil' ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-inner">
              {usuarioActual.nombre ? usuarioActual.nombre.charAt(0).toUpperCase() : 'U'}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{usuarioActual.nombre}</h3>
            <p className="text-sm text-slate-500 mb-6">{usuarioActual.email}</p>
            <button
              onClick={() => { cerrarSesion(); onCerrarModal(); }}
              className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <LogOut size={16} /> Cerrar Sesión
            </button>
          </div>
        ) : (
          <HistorialPedidosCliente onIrACatalogo={onCerrarModal} />
        )}
      </div>
    );
  }

  return (
    <div className="max-w-[420px] mx-auto w-full">
      <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-slate-100 mb-4">
        <div className="flex items-center gap-2 mb-1">
          <User size={18} className="text-[#8B1A1A]" />
          <h3 className="font-black text-xl text-slate-800">Acceso a tu Cuenta</h3>
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">INGRESA PARA OBTENER BENEFICIOS</p>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mb-6">
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setPestanaActiva('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              pestanaActiva === 'login' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setPestanaActiva('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              pestanaActiva === 'register' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500'
            }`}
          >
            Registrarme
          </button>
        </div>

        <form onSubmit={manejarEnvio} className="space-y-3 mb-6">
          {pestanaActiva === 'register' && (
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre completo" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none text-sm font-medium" 
              />
            </div>
          )}
          <div className="relative">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none text-sm font-medium" 
            />
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña (mínimo 6 caracteres)" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pl-11 outline-none text-sm font-medium" 
            />
          </div>

          <button 
            type="submit"
            disabled={estaCargando}
            className="w-full bg-[#C6A25D] hover:bg-[#B38D45] disabled:bg-slate-300 text-slate-900 font-black tracking-widest py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
          >
            {estaCargando ? 'PROCESANDO...' : (pestanaActiva === 'login' ? 'ACCEDER AHORA' : 'CREAR CUENTA AHORA')}
            <ArrowRight size={18} />
          </button>
        </form>

        <button 
          type="button" 
          onClick={onCerrarModal} 
          className="w-full bg-[#8B1A1A] hover:bg-[#731515] text-white font-bold tracking-widest py-3.5 rounded-xl transition-colors shadow-md text-sm"
        >
          QUIZÁS MÁS TARDE
        </button>
      </div>
    </div>
  );
}
