import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ProveedorPreferenciaTema } from './compartido/contexto/ProveedorPreferenciaTema.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProveedorPreferenciaTema>
      <App />
    </ProveedorPreferenciaTema>
  </StrictMode>
);
