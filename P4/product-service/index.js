const  global = require('./src/const/global');
const producto = require('./src/controllers/producto.controller')

const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// Ruta
app.get('/check', (req, res) => {
  res.status(200).json({ status: "ok", service: "productos" })
});

app.post("/producto", (req, res) => {
  res.json(producto.agregarProducto(req.body.nombre, req.body.cantidad, req.body.precio));
});

app.delete("/producto/:nombre", (req, res) => {
  res.json(producto.eliminarProducto(req.params.nombre));
});

app.get("/productos", (req, res) => {
  res.json(producto.obtenerProductos());
});

app.get("/productos/ordenar/:criterio", (req, res) => {
  res.json(producto.ordenarProductos(req.params.criterio));
});

app.get("/producto/:nombre", (req, res) => {
  res.json(producto.buscarProducto(req.params.nombre));
});

// Iniciar servidor
app.listen(global.PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${global.PORT}`);
});
