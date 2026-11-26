import { NavLink, Outlet } from 'react-router-dom';

import { useCarritoStore } from '../components/store/useCarritoStore.js';

function SectionCompras() {
  const unidades = useCarritoStore((state) =>
    state.productos.reduce((total, producto) => total + producto.cantidad, 0)
  );

  return (
    <section className="seccion seccion--compras">
      <header className="seccion__encabezado">
        <span className="seccion__sobrelinea">TU PEDIDO</span>
        <h1>Mi canasta</h1>
        <p>Revisa tu canasta y consulta el historial de tus compras.</p>
      </header>
      <div className="pestanas">
        <NavLink to="/compras" end className="pestanas__item">
          Mi canasta <span className="pestanas__contador">{unidades}</span>
        </NavLink>
        <NavLink to="/compras/resumen" end className="pestanas__item">
          Mi pedido
        </NavLink>
      </div>

      <div className="seccion__contenido">
        <Outlet />
      </div>
    </section>
  );
}

export default SectionCompras;