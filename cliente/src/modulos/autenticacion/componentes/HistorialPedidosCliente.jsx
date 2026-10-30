import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import ClienteApiOrdenes from '../../checkout/servicios/ClienteApiOrdenes';

export default function HistorialPedidosCliente({ onIrACatalogo }) {
  const [ordenes, setOrdenes] = useState([]);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    let montado = true;
    const cargarHistorial = async () => {
      try {
        const respuesta = await ClienteApiOrdenes.obtenerHistorialOrdenesSesion();
        if (montado && respuesta?.ordenes) {
          setOrdenes(respuesta.ordenes);
        }
      } catch (error) {
        console.error('Error al cargar historial de pedidos:', error);
      } finally {
        if (montado) setEstaCargando(false);
      }
    };
    cargarHistorial();
    return () => { montado = false; };
  }, []);

  if (estaCargando) {
    return (
      <div className="py-12 flex flex-col items-center justify-center text-slate-400">
        <Clock className="animate-spin mb-2" size={28} />
        <p className="text-xs font-semibold">Cargando tus compras...</p>
      </div>
    );
  }

  if (ordenes.length === 0) {
    return (
      <div className="py-8 text-center bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
          <ShoppingBag size={24} />
        </div>
        <h4 className="text-base font-bold text-slate-700 mb-1">Sin pedidos registrados</h4>
        <p className="text-xs text-slate-400 mb-4">Aún no has realizado ninguna compra en esta sesión.</p>
        {onIrACatalogo && (
          <button
            onClick={onIrACatalogo}
            className="text-xs font-bold text-brand-600 hover:text-brand-700 underline"
          >
            Explorar catálogo de productos
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
      {ordenes.map((orden) => (
        <div
          key={orden.id}
          className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-2 hover:border-brand-200 transition-colors"
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Package size={14} className="text-brand-500" />
              {orden.numeroOrden || `ORD-#${orden.id}`}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-700">
              <CheckCircle2 size={10} />
              {orden.estado || 'Completada'}
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            {orden.createdAt ? new Date(orden.createdAt).toLocaleString('es-ES', { dateStyle: 'medium', timeStyle: 'short' }) : 'Reciente'}
          </div>

          {orden.detalles && orden.detalles.length > 0 && (
            <div className="bg-slate-50 rounded-xl p-2 text-xs space-y-1">
              {orden.detalles.map((detalle, idx) => (
                <div key={idx} className="flex justify-between text-slate-600 text-[11px]">
                  <span className="truncate max-w-[200px]">{detalle.cantidad}x {detalle.nombreProducto}</span>
                  <span className="font-medium">${Number(detalle.precioUnitario * detalle.cantidad).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-1 border-t border-slate-50 text-xs">
            <span className="font-medium text-slate-500">Total pagado:</span>
            <span className="font-black text-brand-600 text-sm">${Number(orden.total).toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
