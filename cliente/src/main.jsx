import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ProveedorPreferenciaTema } from './compartido/contexto/ProveedorPreferenciaTema.jsx';
import { ProveedorEstadoSesion } from './modulos/autenticacion/contexto/ProveedorEstadoSesion.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorPreferenciaTema>
      <ProveedorEstadoSesion>
        <App />
      </ProveedorEstadoSesion>
    </ProveedorPreferenciaTema>
  </StrictMode>
);
