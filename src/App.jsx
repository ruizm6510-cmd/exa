import { Routes, Route } from 'react-router-dom';

// Layout general (estructura estática de la página)
import Layout from './assets/layouts/Layout.jsx';

// Las dos Sections (cada una con su propio <Outlet/>)
import SectionCatalogo from './assets/sections/SectionCatalogo.jsx';
import SectionCompras from './assets/sections/SectionCompras.jsx';

// Páginas (vistas que se cargan dentro de los Outlet)
import Inicio from './assets/pages/inicio.jsx';
import ProductosAxios from './assets/pages/ProductosAxios.jsx';
import Resumen from './assets/pages/Resumen.jsx';
import NoEncontrado from './assets/pages/NoEncontrado.jsx';

function App() {
  return (
    <Routes>
      {/* Ruta padre: el Layout siempre se ve; su Outlet cambia */}
      <Route path="/" element={<Layout />}>
        {/* index = lo que se muestra en "/" exactamente */}
        <Route index element={<Inicio />} />

        {/* ---------- SECTION 1: CATÁLOGO ---------- */}
        <Route path="catalogo" element={<SectionCatalogo />}>
          <Route path="axios" element={<ProductosAxios />} />
        </Route>

        {/* ---------- SECTION 2: COMPRAS ---------- */}
        <Route path="compras" element={<SectionCompras />}>
          <Route path="resumen" element={<Resumen />} />
        </Route>

        {/* Cualquier otra URL que no exista */}
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}

export default App;
