import { useNavigate } from 'react-router-dom';

function NoEncontrado() {
  const navigate = useNavigate();

  return (
    <div className="estado estado--vacio">
      <h2>404 · Página no encontrada</h2>
      {/* navigate(-1) regresa a la página anterior del historial */}
      <button type="button" className="btn btn--secundario" onClick={() => navigate(-1)}>
        ← Volver
      </button>
    </div>
  );
}

export default NoEncontrado;