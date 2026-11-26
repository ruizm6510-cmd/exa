import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import { useCarritoStore } from '../store/useCarritoStore.js';

function Header() {
  const navigate = useNavigate();

  const totalUnidades = useCarritoStore((state) =>
    state.productos.reduce((acumulado, p) => acumulado + p.cantidad, 0)
  );

  useEffect(() => {
    document.title =
      totalUnidades > 0 ? `(${totalUnidades}) MercaCauca` : 'MercaCauca';
  }, [totalUnidades]);

  return (
    <header className="header">
      <div className="header__marca">
        <img src={logo} alt="" className="header__logo" />
        <div>
          <h1 className="header__titulo">MercaCauca</h1>
          <p className="header__lema">Lo bueno del Cauca, cerca de ti</p>
        </div>
      </div>

      <button
        type="button"
        className="header__canasta"
        onClick={() => navigate('/compras')}
        aria-label={`Ver mi canasta, ${totalUnidades} productos`}
      >
        <svg
          className="header__icono"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 10h16l-1.6 10H5.6L4 10Z" />
          <path d="m8 10 4-6 4 6M8 13v4m4-4v4m4-4v4" />
        </svg>
        <span>Mi canasta</span>
        <span className="header__burbuja">{totalUnidades}</span>
      </button>
    </header>
  );
}

export default Header;