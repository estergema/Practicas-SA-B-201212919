# Principios SOLID

Los principios SOLID son un conjunto de reglas y mejores prácticas para diseñar software que sea fácil de mantener y escalar. Estos principios fueron formulados por Robert C. Martin y son ampliamente utilizados en la programación orientada a objetos.

## 1. Principio de Responsabilidad Única (SRP - Single Responsibility Principle)

Establece que una clase, componente o microservicio debe ser responsable de una sola cosa (el tan aclamado término “decoupled” en inglés). Si por el contrario, una clase tiene varias responsabilidades, esto implica que el cambio en una responsabilidad provocará la modificación en otra responsabilidad.

```javascript
class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

class Inventario {
    constructor() {
        this.productos = [];
    }
    
    agregarProducto(producto) {
        this.productos.push(producto);
    }
}
```

Aquí `Producto` se encarga solo de almacenar la información del producto, mientras que `Inventario` maneja la gestión de productos y representa el conjunto de productos.

---

## 2. Principio de Abierto/Cerrado (OCP - Open/Closed Principle)

Establece que las entidades software (clases, módulos y funciones) deberían estar abiertos para su extensión, pero cerrados para su modificación.

```javascript
class OrdenadorInventario {
    ordenarPorPrecio(productos) {
        return productos.sort((a, b) => a.precio - b.precio);
    }
    
    ordenarPorCantidad(productos) {
        return productos.sort((a, b) => a.cantidad - b.cantidad);
    }
}
```

Si se necesita otro criterio de ordenación, podemos crear un nuevo método sin modificar el código existente.

---

## 3. Principio de Sustitución de Liskov (LSP - Liskov Substitution Principle)

Las subclases deben poder usarse en lugar de sus clases base sin afectar el funcionamiento del programa.

```javascript
class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
}

class ProductoPerecedero extends Producto {
    constructor(nombre, precio, cantidad, fechaExpiracion) {
        super(nombre, precio, cantidad);
        this.fechaExpiracion = fechaExpiracion;
    }
}
```

Aquí `ProductoPerecedero` extiende `Producto` y puede utilizarse en cualquier función que espere un `Producto`, cumpliendo con LSP.

---

## 4. Principio de Segregación de Interfaces (ISP - Interface Segregation Principle)

Este principio establece que los clientes no deberían verse forzados a depender de interfaces que no usan.

Es decir cuando un cliente depende de una clase que implementa una interfaz cuya funcionalidad este cliente no usa, pero que otros clientes sí usan, este cliente estará siendo afectado por los cambios que fuercen otros clientes en dicha interfaz.


```javascript
class BuscadorPorNombre {
    buscarPorNombre(productos, nombre) {
        return productos.find(producto => producto.nombre === nombre);
    }
}

class BuscadorPorPrecio {
    buscarPorPrecio(productos, precio) {
        return productos.filter(producto => producto.precio === precio);
    }
}
```

Aquí tenemos dos clases diferentes para buscar productos por diferentes criterios, evitando que una sola clase tenga demasiadas responsabilidades.

---

## 5. Principio de Inversión de Dependencias (DIP - Dependency Inversion Principle)

Establece que las dependencias deben estar en las abstracciones, no en las concreciones. Es decir:

Los módulos de alto nivel no deberían depender de módulos de bajo nivel. Ambos deberían depender de abstracciones.
Las abstracciones no deberían depender de detalles. Los detalles deberían depender de abstracciones.
En algún momento nuestro programa o aplicación llegará a estar formado por muchos módulos. Cuando esto pase, es cuando debemos usar inyección de dependencias, lo que nos permitirá controlar las funcionalidades desde un sitio concreto en vez de tenerlas esparcidas por todo el programa. Además, este aislamiento nos permitirá realizar testing mucho más fácilmente.

```javascript
class BaseDatos {
    guardar(producto) {
        throw new Error("Método no implementado");
    }
}

class BaseDatosSQL extends BaseDatos {
    guardar(producto) {
        console.log(`Guardando ${producto.nombre} en la base de datos SQL`);
    }
}

class Inventario {
    constructor(db) {
        this.db = db;
    }
    
    agregarProducto(producto) {
        this.db.guardar(producto);
    }
}
```
