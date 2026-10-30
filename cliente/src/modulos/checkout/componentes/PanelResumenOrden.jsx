import FormularioAplicacionCupon from './FormularioAplicacionCupon';

export default function PanelResumenOrden({
  items,
  total,
  estaCargando,
  onVolverAtras,
  cuponAplicado,
  onAplicarCupon,
  onRemoverCupon
}) {
  const montoDescuento = cuponAplicado ? Number(cuponAplicado.descuento || 0) : 0;
  const montoTotalFinal = Math.max(0, Number(total || 0) - montoDescuento);

  return (
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl h-fit">
      <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Resumen de Orden</h3>
      
      <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-1">
        {items?.map(item => (
          <div key={item.itemId} className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400 line-clamp-1 pr-4">{item.cantidad}x {item.nombre}</span>
            <span className="font-medium text-slate-900 dark:text-white">${(item.precio * item.cantidad).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="mb-6 pt-4 border-t border-slate-200 dark:border-slate-700">
        <FormularioAplicacionCupon
          subtotal={Number(total || 0)}
          cuponAplicado={cuponAplicado}
          onAplicarCupon={onAplicarCupon}
          onRemoverCupon={onRemoverCupon}
        />
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mb-6 space-y-2">
        <div className="flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
          <span>Subtotal</span>
          <span>${Number(total || 0).toFixed(2)}</span>
        </div>

        {cuponAplicado && (
          <div className="flex justify-between items-center text-sm font-bold text-emerald-600 dark:text-emerald-400">
            <span>Descuento ({cuponAplicado.codigo})</span>
            <span>-${montoDescuento.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-lg font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
          <span>Total</span>
          <span>${montoTotalFinal.toFixed(2)}</span>
        </div>
      </div>

      <button 
        type="submit" 
        form="formulario-metodo-pago"
        disabled={estaCargando}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-colors shadow-md disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {estaCargando ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        ) : (
          <>Pagar ${montoTotalFinal.toFixed(2)}</>
        )}
      </button>

      <button 
        type="button" 
        onClick={onVolverAtras} 
        disabled={estaCargando}
        className="w-full mt-3 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors text-sm"
      >
        Volver a datos de envío
      </button>
    </div>
  );
}
