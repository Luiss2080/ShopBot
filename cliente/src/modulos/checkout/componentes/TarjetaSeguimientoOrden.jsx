import { CheckCircle2, Package, Truck, Home, Clock } from 'lucide-react';

export default function TarjetaSeguimientoOrden({ orden }) {
  if (!orden) return null;

  const pasos = [
    { id: 1, etiqueta: 'Confirmada', desc: 'Pago procesado', icono: CheckCircle2 },
    { id: 2, etiqueta: 'En Almacén', desc: 'Empaquetado', icono: Package },
    { id: 3, etiqueta: 'En Camino', desc: 'En reparto', icono: Truck },
    { id: 4, etiqueta: 'Entregada', desc: 'Recibido', icono: Home },
  ];

  const estadoNormalizado = (orden.estado || '').toUpperCase();
  let pasoActual = 2; // Por defecto asumimos en preparación
  if (estadoNormalizado === 'COMPLETADO' || estadoNormalizado === 'ENTREGADA') {
    pasoActual = 4;
  } else if (estadoNormalizado === 'EN_CAMINO' || estadoNormalizado === 'EN_TRANSITO') {
    pasoActual = 3;
  } else if (estadoNormalizado === 'PENDIENTE') {
    pasoActual = 1;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 mt-2">
      <div className="flex items-center justify-between mb-3 text-xs">
        <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
          <Clock size={14} className="text-brand-500" /> Seguimiento en tiempo real
        </span>
        <span className="text-[10px] font-bold text-slate-400">
          Destino: {orden.direccionEnvio || 'Domicilio registrado'}
        </span>
      </div>

      <div className="relative flex items-center justify-between px-2 pt-2 pb-1">
        {/* Barra de progreso de fondo */}
        <div className="absolute left-6 right-6 top-6 h-0.5 bg-slate-200 dark:bg-slate-700 -z-0" />
        <div 
          className="absolute left-6 top-6 h-0.5 bg-emerald-500 transition-all duration-500 -z-0" 
          style={{ width: `${Math.min(100, Math.max(0, ((pasoActual - 1) / (pasos.length - 1)) * 100))}%` }}
        />

        {pasos.map((paso) => {
          const Icono = paso.icono;
          const esCompletado = paso.id <= pasoActual;
          const esActivo = paso.id === pasoActual;

          return (
            <div key={paso.id} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  esCompletado 
                    ? 'bg-emerald-500 text-white shadow-sm' 
                    : 'bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-400'
                } ${esActivo ? 'ring-4 ring-emerald-500/20 scale-105' : ''}`}
              >
                <Icono size={14} />
              </div>
              <span className={`text-[10px] font-bold mt-1.5 ${esCompletado ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400'}`}>
                {paso.etiqueta}
              </span>
              <span className="text-[9px] text-slate-400 hidden sm:block">
                {paso.desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

