import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCarritoStore } from '../components/store/useCarritoStore.js';
import { formatearPrecio } from '../components/utils/formato.js';

function Resumen() {
  const navigate = useNavigate();
  const productos = useCarritoStore((state) => state.productos);
  const historial = useCarritoStore((state) => state.historial);
  const registrarCompra = useCarritoStore((state) => state.registrarCompra);
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito);
  const [confirmado, setConfirmado] = useState(false);

  const unidades = productos.reduce((total, producto) => total + producto.cantidad, 0);
  const total = productos.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0
  );

  const confirmarPedido = () => {
    registrarCompra(productos);
    setConfirmado(true);
    vaciarCarrito();
  };

  if (confirmado) {
    return (
      <>
        <div className="confirmacion" role="status">
          <span className="confirmacion__icono" aria-hidden="true">✓</span>
          <span className="seccion__sobrelinea">PEDIDO LISTO</span>
          <h2>¡Gracias por elegir MercaCauca!</h2>
          <p>
            compra realizada
          </p>
          <button
            type="button"
            className="btn btn--primario"
            onClick={() => navigate('/catalogo')}
          >
            Volver a la vitrina
          </button>
        </div>
        <HistorialCompras compras={historial} />
      </>
    );
  }

  if (productos.length === 0) {
    return (
      <>
        <div className="estado estado--vacio canasta-vacia">
          <h2>
            {historial.length
              ? 'No tienes un pedido pendiente'
              : 'Aún no hay un pedido para revisar'}
          </h2>
          <p>
            {historial.length
              ? 'Aquí puedes consultar tus compras anteriores o empezar una nueva.'
              : 'Agrega productos a tu canasta y aquí podrás revisar el total.'}
          </p>
          <button
            type="button"
            className="btn btn--primario"
            onClick={() => navigate('/catalogo')}
          >
            Explorar productos
          </button>
        </div>
        <HistorialCompras compras={historial} />
      </>
    );
  }

  return (
    <div className="resumen">
      <div className="resumen__encabezado">
        <span className="seccion__sobrelinea">ÚLTIMO PASO</span>
        <h2>Revisa tu pedido</h2>
        <p>Confirma que todo esté correcto antes de terminar.</p>
      </div>

      <div className="resumen__contenido">
        <ul className="resumen__productos">
          {productos.map((producto) => (
            <li key={producto.id} className="resumen__producto">
              <img src={producto.imagen} alt="" />
              <div>
                <h3>{producto.titulo}</h3>
                <p>{producto.cantidad} × {formatearPrecio(producto.precio)}</p>
              </div>
              <strong>{formatearPrecio(producto.precio * producto.cantidad)}</strong>
            </li>
          ))}
        </ul>

        <aside className="pedido resumen__totales">
          <span className="pedido__sobrelinea">RESUMEN DE COMPRA</span>
          <h2>Tu total</h2>
          <div className="pedido__linea">
            <span>Productos distintos</span>
            <span>{productos.length}</span>
          </div>
          <div className="pedido__linea">
            <span>Unidades</span>
            <span>{unidades}</span>
          </div>
          <div className="pedido__total">
            <span>Total estimado</span>
            <strong>{formatearPrecio(total)}</strong>
          </div>
          <p className="pedido__nota">
            Precios de referencia en USD obtenidos de servicios públicos. La confirmación es local
            y no procesa un pago.
          </p>
          <button
            type="button"
            className="btn btn--primario pedido__confirmar"
            onClick={confirmarPedido}
          >
            Confirmar pedido <span aria-hidden="true">→</span>
          </button>
          <button
            type="button"
            className="btn-enlace resumen__volver"
            onClick={() => navigate('/compras')}
          >
            ← Volver a mi canasta
          </button>
        </aside>
      </div>
      <HistorialCompras compras={historial} />
    </div>
  );
}

function HistorialCompras({ compras }) {
  if (compras.length === 0) {
    return null;
  }

  return (
    <section className="historial" aria-labelledby="historial-titulo">
      <div className="historial__encabezado">
        <span className="seccion__sobrelinea">TUS COMPRAS</span>
        <h2 id="historial-titulo">Historial de compras</h2>
      </div>
      <ol className="historial__lista">
        {compras.map((compra) => (
          <li className="historial__compra" key={compra.id}>
            <div className="historial__compra-encabezado">
              <div>
                <h3>
                  Compra
                </h3>
                <p>
                  {compra.productos.length}{' '}
                  {compra.productos.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              <strong>{formatearPrecio(compra.total)}</strong>
            </div>
            <ul className="historial__productos">
              {compra.productos.map((producto) => (
                <li key={producto.id}>
                  <span>{producto.titulo} × {producto.cantidad}</span>
                  <span>{formatearPrecio(producto.precio * producto.cantidad)}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Resumen;