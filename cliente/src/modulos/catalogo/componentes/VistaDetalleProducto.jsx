import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, CheckCircle2, ArrowLeft, Plus, Minus, Package, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ClienteApiProductos from '../servicios/ClienteApiProductos';
import ClienteApiCarrito from '../../carrito/servicios/ClienteApiCarrito';

export default function VistaDetalleProducto({ idProducto, onAddToCart }) {
  const [producto, setProducto] = useState(null);
  const [relacionados, setRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [agregando, setAgregando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let montado = true;
    const cargarDetalle = async () => {
      setCargando(true);
      try {
        const data = await ClienteApiProductos.obtenerPorIdentificador(idProducto);
        if (montado && data) {
          setProducto(data);
          if (data.categoria) {
            const rel = await ClienteApiProductos.obtenerPorCategoria(data.categoria);
            if (montado) {
              setRelacionados((rel || []).filter(p => p.id !== data.id).slice(0, 3));
            }
          }
        }
      } catch (err) {
        console.error('Error al cargar detalle del producto:', err);
      } finally {
        if (montado) setCargando(false);
      }
    };
    cargarDetalle();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => { montado = false; };
  }, [idProducto]);

  const handleAgregarAlCarrito = async () => {
    if (!producto) return;
    setAgregando(true);
    try {
      await ClienteApiCarrito.agregarItem(producto.id, cantidad);
      if (onAddToCart) onAddToCart();
      toast.success(`${cantidad}x ${producto.nombre} añadido al carrito`);
    } catch {
      toast.error('No se pudo añadir al carrito');
    } finally {
      setAgregando(false);
    }
  };

  if (cargando) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-[50vh] text-slate-400">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold">Cargando especificaciones del producto...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black text-slate-800 mb-2">Producto no encontrado</h2>
        <p className="text-slate-500 mb-6">El artículo solicitado no existe o ha sido retirado del catálogo.</p>
        <Link to="/catalogo" className="inline-flex items-center gap-2 bg-brand-500 text-white px-6 py-3 rounded-2xl font-bold">
          <ArrowLeft size={18} /> Volver al Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Migas de pan */}
      <nav className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-8">
        <Link to="/" className="hover:text-brand-600 transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo" className="hover:text-brand-600 transition-colors">Catálogo</Link>
        <span>/</span>
        <span className="text-slate-700 truncate max-w-[200px]">{producto.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-sm mb-16">
        {/* Imagen principal */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center min-h-[380px]">
          {producto.imagen ? (
            <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-contain max-h-[460px] p-4" />
          ) : (
            <Package size={64} className="text-slate-300" />
          )}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider text-slate-800 shadow-sm">
            {producto.categoria}
          </span>
        </div>

        {/* Información y Compra */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-400 mb-3 text-xs font-bold">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <span className="text-slate-400 ml-2 font-normal">(48 valoraciones verificadas)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">{producto.nombre}</h1>
            <p className="text-slate-600 leading-relaxed text-base mb-6">{producto.descripcion}</p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 mb-8">
              <CheckCircle2 size={14} />
              En stock ({producto.stock} unidades para entrega inmediata)
            </div>
          </div>

          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-slate-900">${Number(producto.precio).toFixed(2)}</span>
              <span className="text-sm font-semibold text-slate-400 line-through">${(Number(producto.precio) * 1.15).toFixed(2)}</span>
              <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">-15%</span>
            </div>

            {/* Selector de cantidad y Botón */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <div className="flex items-center justify-between border border-slate-200 rounded-2xl p-2 w-full sm:w-36 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setCantidad(c => Math.max(1, c - 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-slate-200 text-slate-700 transition-colors shadow-sm"
                >
                  <Minus size={16} />
                </button>
                <span className="font-black text-slate-800 text-base">{cantidad}</span>
                <button
                  type="button"
                  onClick={() => setCantidad(c => Math.min(producto.stock || 99, c + 1))}
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-white hover:bg-slate-200 text-slate-700 transition-colors shadow-sm"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAgregarAlCarrito}
                disabled={agregando}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                {agregando ? 'Añadiendo...' : `Añadir al Carrito • $${(Number(producto.precio) * cantidad).toFixed(2)}`}
              </button>
            </div>

            {/* Garantías */}
            <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-brand-500" /> Envío rápido asegurado
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-brand-500" /> Garantía oficial ShopBot
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Productos Relacionados */}
      {relacionados.length > 0 && (
        <section>
          <h3 className="text-2xl font-black text-slate-800 mb-6">Productos Relacionados</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relacionados.map(rel => (
              <div
                key={rel.id}
                onClick={() => navigate(`/producto/${rel.id}`)}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="h-44 bg-slate-50 rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                  {rel.imagen ? (
                    <img src={rel.imagen} alt={rel.nombre} className="w-full h-full object-cover" />
                  ) : (
                    <Package size={36} className="text-slate-300" />
                  )}
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">{rel.nombre}</h4>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-black text-brand-600">${Number(rel.precio).toFixed(2)}</span>
                  <span className="text-xs font-semibold text-brand-600 hover:underline">Ver detalle →</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
