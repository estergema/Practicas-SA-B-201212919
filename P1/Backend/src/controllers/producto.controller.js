const Producto = require('../models/Productos');

// Estructura de datos para almacenar productos
let inventario = [];

// Agregar un producto
function agregarProducto (nombre, cantidad, precio) {
    const producto = new Producto(nombre, cantidad, precio);
    inventario.push(producto);
    return { mensaje: "Producto agregado correctamente" };
};

// Eliminar un producto
const eliminarProducto = (nombre) => {
    inventario = inventario.filter(prod => prod.nombre !== nombre);
    return { mensaje: "Producto eliminado correctamente" };
};

// Obtener lista de productos
function obtenerProductos () { return inventario};

// Ordenar productos por precio o cantidad
function ordenarProductos (criterio)  {
    if (criterio === "precio") {
        return [...inventario].sort((a, b) => a.precio - b.precio);
    } else if (criterio === "cantidad") {
        return [...inventario].sort((a, b) => a.cantidad - b.cantidad);
    } else {
        return { error: "Criterio no válido" };
    }
};

// Buscar un producto por nombre
function buscarProducto (nombre) {
    const producto = inventario.find(prod => prod.nombre === nombre);
    return producto || { error: "Producto no encontrado" };
};

module.exports = {
    obtenerProductos,
    ordenarProductos,
    buscarProducto,
    eliminarProducto,
    agregarProducto
}