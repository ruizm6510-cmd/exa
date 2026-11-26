import { NavLink } from 'react-router-dom';

const ENLACES = [
  { texto: 'Inicio', ruta: '/', exacta: true },
  { texto: 'Vitrina', ruta: '/catalogo', exacta: false },
  { texto: 'Mi canasta', ruta: '/compras', exacta: true },
  { texto: 'Mi pedido', ruta: '/compras/resumen', exacta: true },
];

function Navbar() {
  return (
    <nav className="navbar" aria-label="Navegación principal">
      {ENLACES.map((enlace) => (
        <NavLink
          key={enlace.ruta}
          to={enlace.ruta}
          end={enlace.exacta}
          className={({ isActive }) =>
            `navbar__enlace${isActive ? ' navbar__enlace--activo' : ''}`
          }
        >
          {enlace.texto}
        </NavLink>
      ))}
    </nav>
  );
}

export default Navbar;