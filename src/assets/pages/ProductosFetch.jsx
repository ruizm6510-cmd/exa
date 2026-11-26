import { useState, useEffect } from 'react';

import { useCarritoStore } from '../components/store/useCarritoStore.js';
import { formatearPrecio } from '../components/utils/formato.js';

const URL_FAKESTORE = 'https://fakestoreapi.com/products';

function ProductosFetch() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);
  const canasta = useCarritoStore((state) => state.productos);

  useEffect(() => {
    const controlador = new AbortController();

    const cargarProductos = async () => {
      try {
        setCargando(true);
        const respuesta = await fetch(URL_FAKESTORE, {
          signal: controlador.signal,
        });

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`);
        }

        const datos = await respuesta.json();
        const normalizados = datos.map((p) => ({
          id: `fs-${p.id}`,
          titulo: p.title,
          precio: p.price,
          imagen: p.image,
          categoria: p.category,
        }));

        setProductos(normalizados);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('No se pudieron cargar los productos. ' + err.message);
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    };

    cargarProductos();
    return () => controlador.abort();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div className="estado estado--cargando">
        <span className="spinner" aria-hidden="true"></span>
        Preparando tus productos...
      </div>
    );
  }

  if (error) {
    return <div className="estado estado--error">⚠️ {error}</div>;
  }

  return (
    <div>
      <div className="catalogo__barra">
        <div>
          <h2 className="catalogo__titulo">Productos para descubrir</h2>
          <p className="catalogo__detalle">
            {productos.length} productos <span className="etiqueta">Catálogo público</span>
          </p>
        </div>
        <input
          type="search"
          className="buscador"
          placeholder="¿Qué estás buscando?"
          aria-label="Buscar productos"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="estado">No encontramos productos para “{busqueda}”. Prueba otra búsqueda.</p>
      ) : (
        <div className="grilla">
          {productosFiltrados.map((producto) => (
            <article key={producto.id} className="tarjeta">
              <div className="tarjeta__imagen">
                <img src={producto.imagen} alt={producto.titulo} loading="lazy" />
                <span className="tarjeta__origen">Selección</span>
              </div>
              <span className="tarjeta__categoria">{producto.categoria}</span>
              <h3 className="tarjeta__titulo">{producto.titulo}</h3>
              <p className="tarjeta__precio">{formatearPrecio(producto.precio)}</p>
              <button
                type="button"
                className="btn btn--agregar"
                onClick={() => agregarProducto(producto)}
              >
                <span aria-hidden="true">+</span> Agregar a la canasta
              </button>
              {canasta.some((item) => item.id === producto.id) && (
                <p className="tarjeta__agregado">
                  {canasta.find((item) => item.id === producto.id)?.cantidad} en tu canasta
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductosFetch;