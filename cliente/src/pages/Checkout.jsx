import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Truck, CheckCircle, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { cartAPI } from '../services/api';

export default function Checkout({ cart, refreshCart }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(step + 1);

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simular procesamiento
    setTimeout(async () => {
      try {
        // Vaciar carrito
        for (const item of cart.items) {
          await cartAPI.removeItem(item.itemId);
        }
        await refreshCart();
        setLoading(false);
        setStep(3); // Paso final (Éxito)
        toast.success("¡Pago procesado con éxito!", { icon: '🎉' });
      } catch (error) {
        setLoading(false);
        toast.error("Ocurrió un error al procesar el pago");
      }
    }, 1500);
  };

  if (cart.items?.length === 0 && step !== 3) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-8">
        <Package size={64} className="text-slate-300 mb-6" />
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Tu carrito está vacío</h2>
        <p className="text-slate-500 mb-8 max-w-md">No puedes proceder al checkout sin productos en tu carrito.</p>
        <Link to="/catalogo" className="bg-brand-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-600 transition-colors shadow-md">
          Ir al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[75vh]">
      {/* Indicador de Pasos */}
      <div className="flex items-center justify-center mb-12">
        <div className={`flex items-center gap-2 ${step >= 1 ? 'text-brand-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-brand-100' : 'bg-slate-100'}`}>1</div>
          <span className="font-semibold hidden sm:block">Envío</span>
        </div>
        <div className={`w-16 h-1 mx-4 rounded-full ${step >= 2 ? 'bg-brand-500' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center gap-2 ${step >= 2 ? 'text-brand-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-brand-100' : 'bg-slate-100'}`}>2</div>
          <span className="font-semibold hidden sm:block">Pago</span>
        </div>
        <div className={`w-16 h-1 mx-4 rounded-full ${step >= 3 ? 'bg-brand-500' : 'bg-slate-200'}`}></div>
        <div className={`flex items-center gap-2 ${step >= 3 ? 'text-green-600' : 'text-slate-400'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-green-100' : 'bg-slate-100'}`}>3</div>
          <span className="font-semibold hidden sm:block">Confirmación</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
              <div className="bg-brand-50 p-3 rounded-2xl text-brand-600"><Truck size={24} /></div>
              <h2 className="text-2xl font-bold text-slate-900">Datos de Envío</h2>
            </div>
            
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Nombre Completo</label>
                <input type="text" required placeholder="Juan Pérez" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Teléfono</label>
                <input type="text" required placeholder="+1 234 567 8900" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-semibold text-slate-700">Dirección de Envío</label>
                <input type="text" required placeholder="Av. Principal 123, Ciudad, País" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all" />
              </div>
              
              <div className="sm:col-span-2 flex justify-end mt-4">
                <button type="submit" className="bg-slate-900 hover:bg-brand-500 text-white px-8 py-3.5 rounded-xl font-bold transition-colors flex items-center gap-2">
                  Continuar al Pago
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-3xl shadow-sm h-fit">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
                <div className="bg-brand-50 p-3 rounded-2xl text-brand-600"><CreditCard size={24} /></div>
                <h2 className="text-2xl font-bold text-slate-900">Método de Pago</h2>
              </div>
              
              <form id="payment-form" onSubmit={handlePay} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Número de Tarjeta</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Vencimiento</label>
                    <input type="text" required placeholder="MM/YY" maxLength="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-mono" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">CVC</label>
                    <input type="text" required placeholder="123" maxLength="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Nombre en la tarjeta</label>
                  <input type="text" required placeholder="JUAN PEREZ" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all uppercase" />
                </div>
              </form>
            </div>

            {/* Resumen de Orden */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl h-fit">
              <h3 className="font-bold text-lg text-slate-900 mb-6">Resumen de Orden</h3>
              <div className="space-y-4 mb-6">
                {cart.items?.map(item => (
                  <div key={item.itemId} className="flex justify-between text-sm">
                    <span className="text-slate-600 line-clamp-1 pr-4">{item.cantidad}x {item.nombre}</span>
                    <span className="font-medium text-slate-900">${(item.precio * item.cantidad).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-black text-slate-900">
                  <span>Total</span>
                  <span>${(cart.total || 0).toFixed(2)}</span>
                </div>
              </div>
              <button 
                type="submit" 
                form="payment-form"
                disabled={loading}
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-colors shadow-md disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>Pagar ${(cart.total || 0).toFixed(2)}</>
                )}
              </button>
              <button 
                type="button" 
                onClick={() => setStep(1)} 
                className="w-full mt-3 text-slate-500 font-medium hover:text-slate-700 transition-colors"
              >
                Volver
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-slate-200 p-12 rounded-3xl shadow-sm text-center max-w-lg mx-auto"
          >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">¡Compra Exitosa!</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Tu orden ha sido procesada correctamente. Recibirás un correo electrónico con los detalles del envío pronto.
            </p>
            <Link to="/" className="inline-block bg-slate-900 hover:bg-brand-500 text-white px-8 py-3.5 rounded-xl font-bold transition-colors">
              Volver al Inicio
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
