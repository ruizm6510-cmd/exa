import { useNavigate } from 'react-router-dom';

import bannerCatalogo from '../assets/banner-catalogo.svg';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="inicio">
      <section className="inicio__hero">
        <div className="inicio__hero-contenido">
          <span className="inicio__sobrelinea">MERCADO LOCAL, COMPRA FÁCIL</span>
          <h2 className="inicio__titulo">Llena tu canasta con lo que más te gusta.</h2>
          <p className="inicio__texto">
            Explora nuestra vitrina, elige tus productos y revisa el total antes de confirmar.
          </p>
          <button
            type="button"
            className="btn btn--primario"
            onClick={() => navigate('/catalogo')}
          >
            Explorar la vitrina <span aria-hidden="true">→</span>
          </button>
          <p className="inicio__nota">Precios de referencia en USD · Catálogo cargado desde APIs públicas</p>
        </div>
        <div className="inicio__hero-imagen">
          <img src={bannerCatalogo} alt="Ilustración de productos para el mercado" />
          <span className="inicio__sello">Fresco<br />y local</span>
        </div>
      </section>

      <section className="inicio__pasos" aria-label="Cómo comprar">
        <article className="paso">
          <span className="paso__numero">01</span>
          <h3>Explora</h3>
          <p>Encuentra productos en nuestra vitrina digital.</p>
        </article>
        <article className="paso">
          <span className="paso__numero">02</span>
          <h3>Arma tu canasta</h3>
          <p>Ajusta cantidades o retira lo que ya no necesitas.</p>
        </article>
        <article className="paso">
          <span className="paso__numero">03</span>
          <h3>Confirma</h3>
          <p>Revisa el total de tu pedido antes de confirmarlo.</p>
        </article>
      </section>

      <section className="inicio__cta">
        <div>
          <h3>¿Ya sabes qué necesitas?</h3>
          <p>Tu próxima compra empieza aquí.</p>
        </div>
        <button
          type="button"
          className="btn btn--secundario"
          onClick={() => navigate('/catalogo/axios')}
        >
          Ver todos los productos
        </button>
      </section>
    </div>
  );
}

export default Inicio;