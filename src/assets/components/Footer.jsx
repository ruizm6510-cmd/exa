function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        © {anio} MercaCauca · Productos de prueba para una experiencia de compra local.
      </p>
      <p className="footer__apis">
        Catálogo de demostración:{' '}
        <a href="https://fakestoreapi.com" target="_blank" rel="noreferrer">
          FakeStoreAPI
        </a>{' '}
        y{' '}
        <a href="https://dummyjson.com" target="_blank" rel="noreferrer">
          DummyJSON
        </a>
      </p>
    </footer>
  );
}

export default Footer;