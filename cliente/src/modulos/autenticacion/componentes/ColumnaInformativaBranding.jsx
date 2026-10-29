import { Gift, Package, ShoppingBag, Mail } from 'lucide-react';

export default function ColumnaInformativaBranding() {
  return (
    <div className="w-full md:w-[45%] bg-gradient-to-b from-[#8B1A1A] to-[#601010] p-8 md:p-12 text-white flex flex-col items-center text-center relative overflow-hidden">
      {/* Círculos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 -right-20 w-80 h-80 bg-black opacity-20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-white/20 bg-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-xl">
            <Gift size={48} className="text-white" strokeWidth={1.5} />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Bienvenido a</h2>
          <h1 className="text-4xl md:text-5xl font-black text-[#D4AF37] tracking-tighter mb-6 uppercase" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
            ShopBot
          </h1>

          <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 max-w-[280px]">
            Vive la experiencia inmersiva de compras. Resuelve tus dudas con nuestro asistente de IA antes de decidirte.
          </p>

          <div className="bg-[#111] px-5 py-2.5 rounded-full border border-white/10 shadow-lg mb-10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-bold tracking-wider text-white/90">SOPORTE SHOPBOT 24/7</span>
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-left backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider flex items-center gap-1.5 mb-1">
                <Package size={12} /> PRODUCTOS
              </span>
              <p className="font-bold text-sm">Catálogo & IA</p>
            </div>
            <div className="bg-black/30 border border-white/10 rounded-2xl p-4 text-left backdrop-blur-sm">
              <span className="text-[10px] uppercase font-bold text-white/50 tracking-wider flex items-center gap-1.5 mb-1">
                <ShoppingBag size={12} /> COMPRAS
              </span>
              <p className="font-bold text-sm">A medida y Web</p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/60 mb-3">Conecta con ShopBot</span>
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                <Mail size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
