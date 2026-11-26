import { useNavigate } from 'react-router-dom';

import { useCarritoStore } from '../components/store/useCarritoStore.js';
import { formatearPrecio } from '../components/utils/formato.js';

function Carrito() {
  const navigate = useNavigate();
  const productos = useCarritoStore((state) => state.productos);
  const sumarCantidad = useCarritoStore((state) => state.sumarCantidad);
  const restarCantidad = useCarritoStore((state) => state.restarCantidad);
  const eliminarProducto = useCarritoStore((state) => state.eliminarProducto);
  const total = productos.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0
  );
  const unidades = productos.reduce((acumulado, producto) => acumulado + producto.cantidad, 0);

  if (productos.length === 0) {
    return (
      <div className="estado estado--vacio canasta-vacia">
        <span className="canasta-vacia__icono" aria-hidden="true">♧</span>
        <h2>Tu canasta te está esperando</h2>
        <p>Cuando encuentres algo que te guste, agrégalo aquí.</p>
        <button
          type="button"
          className="btn btn--primario"
          onClick={() => navigate('/catalogo')}
        >
          Ir a la vitrina
        </button>
      </div>
    );
  }

  return (
    <div className="canasta">
      <div className="canasta__productos">
        <div className="canasta__barra">
          <div>
            <h2>Lo que elegiste</h2>
            <p>{unidades} {unidades === 1 ? 'unidad' : 'unidades'} en tu canasta</p>
          </div>
          <button
            type="button"
            className="btn-enlace"
            onClick={() => navigate('/catalogo')}
          >
            + Seguir explorando
          </button>
        </div>

        <ul className="carrito">
          {productos.map((producto) => (
            <li key={producto.id} className="carrito__item">
              <img src={producto.imagen} alt="" className="carrito__imagen" />
              <div className="carrito__info">
                <span className="tarjeta__categoria">{producto.categoria}</span>
                <h3>{producto.titulo}</h3>
                <p>{formatearPrecio(producto.precio)} por unidad</p>
              </div>
              <div className="carrito__acciones">
                <div className="contador" aria-label={`Cantidad de ${producto.titulo}`}>
                  <button
                    type="button"
                    className="contador__btn"
                    onClick={() => restarCantidad(producto.id)}
                    aria-label={`Restar una unidad de ${producto.titulo}`}
                  >
                    −
                  </button>
                  <span className="contador__valor">{producto.cantidad}</span>
                  <button
                    type="button"
                    className="contador__btn"
                    onClick={() => sumarCantidad(producto.id)}
                    aria-label={`Agregar una unidad de ${producto.titulo}`}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="btn-enlace btn-enlace--eliminar"
                  onClick={() => eliminarProducto(producto.id)}
                  aria-label={`Quitar ${producto.titulo} de la canasta`}
                >
                  Quitar
                </button>
              </div>
              <p className="carrito__subtotal">
                {formatearPrecio(producto.precio * producto.cantidad)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <aside className="pedido">
        <span className="pedido__sobrelinea">TU PEDIDO</span>
        <h2>Resumen</h2>
        <div className="pedido__linea">
          <span>Productos ({unidades})</span>
          <span>{formatearPrecio(total)}</span>
        </div>
        <div className="pedido__total">
          <span>Total estimado</span>
          <strong>{formatearPrecio(total)}</strong>
        </div>
        <p className="pedido__nota">api</p>
        <button
          type="button"
          className="btn btn--primario pedido__confirmar"
          onClick={() => navigate('/compras/resumen')}
        >
          Revisar y confirmar <span aria-hidden="true">→</span>
        </button>
      </aside>
    </div>
  );
}

export default Carrito;
