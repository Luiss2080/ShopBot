import { createContext, useContext, useEffect, useState } from 'react';

const ContextoPreferenciaTema = createContext();

const CLAVE_ALMACENAMIENTO_TEMA = 'shopbot_tema_visual';

export function ProveedorPreferenciaTema({ children }) {
  const [temaActual, setTemaActual] = useState(() => {
    const temaGuardado = localStorage.getItem(CLAVE_ALMACENAMIENTO_TEMA);
    if (temaGuardado === 'dark' || temaGuardado === 'light') {
      return temaGuardado;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const elementoRaiz = document.documentElement;
    if (temaActual === 'dark') {
      elementoRaiz.classList.add('dark');
    } else {
      elementoRaiz.classList.remove('dark');
    }
    localStorage.setItem(CLAVE_ALMACENAMIENTO_TEMA, temaActual);
  }, [temaActual]);

  const alternarTema = () => {
    setTemaActual(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ContextoPreferenciaTema.Provider
      value={{
        temaActual,
        esModoOscuro: temaActual === 'dark',
        alternarTema
      }}
    >
      {children}
    </ContextoPreferenciaTema.Provider>
  );
}

export function usePreferenciaTema() {
  const contexto = useContext(ContextoPreferenciaTema);
  if (!contexto) {
    throw new Error('usePreferenciaTema debe ser utilizado dentro de ProveedorPreferenciaTema');
  }
  return contexto;
}
