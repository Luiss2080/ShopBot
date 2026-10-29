export default function CarruselProductosChat({ productos, onComprarProducto }) {
  if (!productos || productos.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 mt-2 w-[250px]">
      {productos.map((producto) => (
        <div
          key={producto.id}
          className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-3 flex gap-3 items-center shadow-sm"
        >
          {producto.imagenUrl ? (
            <img
              src={producto.imagenUrl}
              alt={producto.nombre}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center text-xl">
              🛍️
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold dark:text-white truncate">{producto.nombre}</h4>
            <p className="text-xs text-brand-600 font-medium">${producto.precio}</p>
          </div>
          <button
            onClick={() => onComprarProducto(producto.nombre)}
            className="bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/30 dark:hover:bg-brand-900/50 text-brand-600 dark:text-brand-400 p-1.5 rounded-lg transition-colors text-xs font-semibold"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
}

