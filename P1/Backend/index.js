const express = require('express');
const app = express();
app.use(express.json());

const PORT = 4000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Ruta
app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});
