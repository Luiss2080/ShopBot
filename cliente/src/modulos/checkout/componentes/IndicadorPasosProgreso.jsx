export default function IndicadorPasosProgreso({ pasoActual }) {
  const pasos = [
    { numero: 1, etiqueta: 'Envío' },
    { numero: 2, etiqueta: 'Pago' },
    { numero: 3, etiqueta: 'Confirmación' }
  ];

  return (
    <div className="flex items-center justify-center mb-12">
      {pasos.map((paso, index) => {
        const estaActivo = pasoActual >= paso.numero;
        const esUltimo = index === pasos.length - 1;

        return (
          <div key={paso.numero} className="flex items-center">
            <div className={`flex items-center gap-2 ${estaActivo ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                estaActivo ? 'bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400' : 'bg-slate-100 dark:bg-slate-800'
              }`}>
                {paso.numero}
              </div>
              <span className="font-semibold hidden sm:block text-sm">{paso.etiqueta}</span>
            </div>

            {!esUltimo && (
              <div className={`w-16 h-1 mx-4 rounded-full ${
                pasoActual > paso.numero ? 'bg-brand-500' : 'bg-slate-200 dark:bg-slate-800'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
