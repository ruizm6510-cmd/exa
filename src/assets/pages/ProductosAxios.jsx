import { useState, useEffect } from 'react';
import { apiDummy } from '../components/services/apiDummy.js';
import { useCarritoStore } from '../components/store/useCarritoStore.js';
import { formatearPrecio } from '../components/utils/formato.js';

// Algunas categorías que existen en DummyJSON
const CATEGORIAS = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'groceries', texto: 'Mercado' },
  { valor: 'beauty', texto: 'Belleza' },
  { valor: 'smartphones', texto: 'Celulares' },
  { valor: 'laptops', texto: 'Portátiles' },
  { valor: 'home-decoration', texto: 'Hogar' },
];

function ProductosAxios() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [categoria, setCategoria] = useState('todas');
  const agregarProducto = useCarritoStore((state) => state.agregarProducto);
  const canasta = useCarritoStore((state) => state.productos);

  useEffect(() => {
    const controlador = new AbortController();

    const cargarProductos = async () => {
      try {
        setCargando(true);

        const endpoint =
          categoria === 'todas'
            ? '/products?limit=24'
            : `/products/category/${categoria}`;

        const respuesta = await apiDummy.get(endpoint, {
          signal: controlador.signal,
        });

        const normalizados = respuesta.data.products.map((p) => ({
          id: `dj-${p.id}`, // prefijo para no chocar con FakeStore
          titulo: p.title,
          precio: p.price,
          imagen: p.thumbnail,
          categoria: p.category,
        }));

        setProductos(normalizados);
        setError(null);
      } catch (err) {
        if (!controlador.signal.aborted) {
          setError('No se pudieron cargar los productos. ' + err.message);
        }
      } finally {
        if (!controlador.signal.aborted) setCargando(false);
      }
    };

    cargarProductos();

    return () => controlador.abort();
  }, [categoria]);

  return (
    <div>
      <div className="catalogo__barra">
        <h2 className="catalogo__titulo">
          Explora por categoría
        </h2>

        <select
          className="buscador"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          {CATEGORIAS.map((c) => (
            <option key={c.valor} value={c.valor}>
              {c.texto}
            </option>
          ))}
        </select>
      </div>

      {/* Render condicional con operadores ternarios */}
      {cargando ? (
        <div className="estado estado--cargando">
          <span className="spinner" aria-hidden="true"></span>
          Buscando productos...
        </div>
      ) : error ? (
        <div className="estado estado--error">⚠️ {error}</div>
      ) : productos.length === 0 ? (
        <p className="estado">No encontramos productos en esta categoría.</p>
      ) : (
        <div className="grilla">
          {productos.map((producto) => (
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

export default ProductosAxios;