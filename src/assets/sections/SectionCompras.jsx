import { NavLink, Outlet } from 'react-router-dom';

import { useCarritoStore } from '../store/useCarritoStore.js';

function SectionCompras() {
  const unidades = useCarritoStore((state) =>
    state.productos.reduce((total, producto) => total + producto.cantidad, 0)
  );

  return (
    <section className="seccion seccion--compras">
      <header className="seccion__encabezado">
        <span className="seccion__sobrelinea">TU PEDIDO</span>
        <h1>Mi canasta</h1>
        <p>Revisa tus productos y confirma cuando todo esté listo.</p>
      </header>
      <div className="pestanas">
        <NavLink to="/compras" end className="pestanas__item">
          Canasta <span className="pestanas__contador">{unidades}</span>
        </NavLink>
        <NavLink to="/compras/resumen" className="pestanas__item">
          Revisar y confirmar
        </NavLink>
      </div>

      <div className="seccion__contenido">
        <Outlet />
      </div>
    </section>
  );
}

export default SectionCompras;