import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  // StrictMode: en desarrollo ejecuta los efectos 2 veces para
  // ayudarnos a detectar errores (por eso usamos AbortController).
  <StrictMode>
    {/* BrowserRouter usa la URL del navegador (historial) para saber
        qué componente mostrar. Todo lo que use rutas debe ir dentro. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);