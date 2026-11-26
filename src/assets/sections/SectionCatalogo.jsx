import { NavLink, Outlet } from 'react-router-dom';

function SectionCatalogo() {
  return (
    <section className="seccion seccion--catalogo">
      <header className="seccion__encabezado">
        <span className="seccion__sobrelinea">SELECCIÓN MERCACAUCA</span>
        <h1>La vitrina</h1>
        <p>Descubre productos y agrega tus favoritos a la canasta.</p>
      </header>
      <div className="pestanas">
        <NavLink to="/catalogo" className="pestanas__item">
          Productos con Fetch
        </NavLink>
        <NavLink to="/catalogo/axios" end className="pestanas__item">
          Productos con Axios
        </NavLink>
      </div>
      <div className="seccion__contenido">
        <Outlet />
      </div>
    </section>
  );
}

export default SectionCatalogo;
