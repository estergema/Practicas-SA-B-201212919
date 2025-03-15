const Producto = require('../models/Productos');
// Estructura de datos para almacenar productos
const Inventario = require('../models/Inventarios');

// Agregar un producto
function agregarProducto (nombre, cantidad, precio) {
    const producto = new Producto(nombre, cantidad, precio);
    Inventario.agregarProducto(producto)
    return { mensaje: "Producto agregado correctamente" };
};

// Eliminar un producto
const eliminarProducto = (nombre) => {
    Inventario = Inventario.eliminarProducto(nombre)
    return { mensaje: "Producto eliminado correctamente" };
};

// Obtener lista de productos
function obtenerProductos () { return Inventario};

// Ordenar productos por precio o cantidad
function ordenarProductos (criterio)  {
    if (criterio === "precio") {
        return Inventario.ordenarProductosPrecio;
    } else if (criterio === "cantidad") {
        return Inventario.ordenarProductosCantidad;
    } else {
        return { error: "Criterio no válido" };
    }
};

// Buscar un producto por nombre
function buscarProducto (nombre) {
    const producto = Inventario.buscarProducto;
    return producto || { error: "Producto no encontrado" };
};

module.exports = {
    obtenerProductos,
    ordenarProductos,
    buscarProducto,
    eliminarProducto,
    agregarProducto
}