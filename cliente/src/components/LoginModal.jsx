import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Github, ArrowRight } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('login'); // 'login' or 'register'
  
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative border border-slate-100 dark:border-slate-800"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-8 text-center border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Bienvenido a ShopBot</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Ingresa a tu cuenta para gestionar tus pedidos y obtener ofertas exclusivas.</p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            <button 
              className={`flex-1 py-4 text-sm font-bold transition-colors ${tab === 'login' ? 'text-brand-500 border-b-2 border-brand-500 bg-brand-50/50 dark:bg-brand-900/10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              onClick={() => setTab('login')}
            >
              Iniciar Sesión
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-bold transition-colors ${tab === 'register' ? 'text-brand-500 border-b-2 border-brand-500 bg-brand-50/50 dark:bg-brand-900/10' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              onClick={() => setTab('register')}
            >
              Registrarse
            </button>
          </div>

          {/* Formulario */}
          <div className="p-8">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {tab === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nombre Completo</label>
                  <input type="text" placeholder="Tu nombre" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm dark:text-white" />
                </div>
              )}
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Correo Electrónico</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" placeholder="correo@ejemplo.com" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-11 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm dark:text-white" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Contraseña</label>
                  {tab === 'login' && <a href="#" className="text-xs text-brand-500 hover:underline">¿Olvidaste tu contraseña?</a>}
                </div>
                <div className="relative">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pl-11 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm dark:text-white" />
                </div>
              </div>

              <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 mt-6">
                {tab === 'login' ? 'Ingresar a mi cuenta' : 'Crear cuenta ahora'}
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">O continuar con</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Github size={20} />
                  GitHub
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
