
const dummy = require("../data/productos");
class Inventario {
    constructor() {
        this.productos = [dummy];
    }
    
    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(nombre){
        this.productos.filter(prod => prod.nombre !== nombre);
    }

    ordenarProductosPrecio(){
        [...this.productos].sort((a, b) => a.precio - b.precio);
    }

    ordenarProductosCantidad(){
        [...this.productos].sort((a, b) => a.cantidad - b.cantidad);
    }

    buscarProducto(nombre){
        this.productos.find(prod => prod.nombre === nombre);
    }
}

module.exports = Inventario;
