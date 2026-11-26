import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCarritoStore } from '../store/useCarritoStore.js';
import { formatearPrecio } from '../utils/formato.js';

function Resumen() {
  const navigate = useNavigate();
  const productos = useCarritoStore((state) => state.productos);
  const vaciarCarrito = useCarritoStore((state) => state.vaciarCarrito);
  const [confirmado, setConfirmado] = useState(false);

  const unidades = productos.reduce((total, producto) => total + producto.cantidad, 0);
  const total = productos.reduce(
    (acumulado, producto) => acumulado + producto.precio * producto.cantidad,
    0
  );

  const confirmarPedido = () => {
    setConfirmado(true);
    vaciarCarrito();
  };

  if (confirmado) {
    return (
      <div className="confirmacion" role="status">
        <span className="confirmacion__icono" aria-hidden="true">✓</span>
        <span className="seccion__sobrelinea">PEDIDO LISTO</span>
        <h2>¡Gracias por elegir MercaCauca!</h2>
        <p>
          Tu pedido quedó confirmado en esta demostración. No se envió a un comercio porque
          todavía no hay un backend conectado.
        </p>
        <button
          type="button"
          className="btn btn--primario"
          onClick={() => navigate('/catalogo')}
        >
          Volver a la vitrina
        </button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="estado estado--vacio canasta-vacia">
        <h2>Aún no hay un pedido para revisar</h2>
        <p>Agrega productos a tu canasta y aquí podrás revisar el total.</p>
        <button
          type="button"
          className="btn btn--primario"
          onClick={() => navigate('/catalogo')}
        >
          Explorar productos
        </button>
      </div>
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
    </div>
  );
}

export default Resumen;