// ============================================================
// useCarritoStore.js — ESTADO GLOBAL DEL CARRITO CON ZUSTAND
//
// ¿Por qué Zustand?
//  El carrito se necesita en muchos componentes (Header, Section,
//  Carrito, Resumen, catálogos). Sin un estado global tendríamos
//  que pasar el carrito por props de padre a hijo ("prop drilling").
//  Con Zustand cualquier componente lo lee o modifica directamente.
//
// Forma de uso en un componente:
//    const productos = useCarritoStore((state) => state.productos);
//    const agregar   = useCarritoStore((state) => state.agregarProducto);
//
// Cada producto del carrito tiene esta forma:
//    { id, titulo, precio, imagen, categoria, cantidad }
// ============================================================
import { create } from 'zustand';

// create() recibe una función que devuelve el ESTADO y las ACCIONES.
// "set" sirve para actualizar el estado (siempre de forma inmutable:
// creamos arreglos/objetos nuevos, nunca modificamos los existentes).
export const useCarritoStore = create((set) => ({
  // ---------------- ESTADO ----------------
  productos: [],

  // ---------------- ACCIONES ----------------

  // AGREGAR: si el producto ya está, sube su cantidad; si no, lo
  // añade con cantidad 1.
  agregarProducto: (producto) =>
    set((state) => {
      const existe = state.productos.find((p) => p.id === producto.id);

      if (existe) {
        return {
          productos: state.productos.map((p) =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
          ),
        };
      }

      return {
        productos: [...state.productos, { ...producto, cantidad: 1 }],
      };
    }),

  // SUMAR: +1 a la cantidad de un producto que ya está en el carrito
  sumarCantidad: (id) =>
    set((state) => ({
      productos: state.productos.map((p) =>
        p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p
      ),
    })),

  // RESTAR: -1 a la cantidad. Si llega a 0, el producto sale del carrito.
  restarCantidad: (id) =>
    set((state) => ({
      productos: state.productos
        .map((p) => (p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0),
    })),

  // ELIMINAR: quita el producto completo, sin importar la cantidad
  eliminarProducto: (id) =>
    set((state) => ({
      productos: state.productos.filter((p) => p.id !== id),
    })),

  // VACIAR: deja el carrito en cero
  vaciarCarrito: () => set({ productos: [] }),
}));
