import { useState } from 'react';
import { Tag, Check, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ClienteApiCupones from '../servicios/ClienteApiCupones';

export default function FormularioAplicacionCupon({ subtotal, cuponAplicado, onAplicarCupon, onRemoverCupon }) {
  const [codigo, setCodigo] = useState('');
  const [validando, setValidando] = useState(false);

  const manejarAplicar = async (e) => {
    e.preventDefault();
    const codigoLimpio = codigo.trim().toUpperCase();
    if (!codigoLimpio) return;

    setValidando(true);
    try {
      const res = await ClienteApiCupones.validarCupon(codigoLimpio, subtotal);
      if (res && res.valido) {
        onAplicarCupon(res);
        setCodigo('');
        toast.success(`Cupón ${res.codigo} aplicado: -$${res.descuento.toFixed(2)}`);
      }
    } catch (err) {
      const msg = err.response?.data?.error || 'No se pudo aplicar el cupón.';
      toast.error(msg);
    } finally {
      setValidando(false);
    }
  };

  if (cuponAplicado) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Tag size={14} className="text-emerald-600 dark:text-emerald-400" />
          <span className="font-bold text-emerald-800 dark:text-emerald-200">
            {cuponAplicado.codigo} (-${Number(cuponAplicado.descuento).toFixed(2)})
          </span>
        </div>
        <button
          type="button"
          onClick={onRemoverCupon}
          className="p-1 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full text-emerald-700 dark:text-emerald-300 transition-colors"
          aria-label="Quitar cupón"
        >
          <X size={14} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={manejarAplicar} className="flex gap-2">
      <div className="relative flex-1">
        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value.toUpperCase())}
          placeholder="Código de cupón (ej: SHOPBOT10)"
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white placeholder:normal-case placeholder:tracking-normal placeholder:font-normal focus:outline-none focus:border-brand-500"
        />
      </div>
      <button
        type="submit"
        disabled={validando || !codigo.trim()}
        className="bg-slate-900 dark:bg-brand-500 hover:bg-brand-600 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors disabled:opacity-50 flex items-center gap-1"
      >
        {validando ? <Loader2 size={12} className="animate-spin" /> : 'Aplicar'}
      </button>
    </form>
  );
}
