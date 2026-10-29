export default function SugerenciasRespuestasRapidas({ opciones, onSeleccionarOpcion }) {
  if (!opciones || opciones.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {opciones.map((opcion) => (
        <button
          key={opcion}
          onClick={() => onSeleccionarOpcion(opcion)}
          className="text-xs bg-brand-50 hover:bg-brand-100 dark:bg-brand-900/20 dark:hover:bg-brand-900/40 text-brand-700 dark:text-brand-300 px-3 py-1.5 rounded-full border border-brand-200 dark:border-brand-800 transition-colors"
        >
          {opcion}
        </button>
      ))}
    </div>
  );
}

