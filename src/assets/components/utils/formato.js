const formateador = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'USD',
});

export const formatearPrecio = (valor) => formateador.format(valor);