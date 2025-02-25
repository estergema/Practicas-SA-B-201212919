// Importar dependencias
const  global = require('./src/const/global');
const login = require('./src/controllers/login.controller')
const sequelize = require('./src/database/connection');
const cookieParser = require('cookie-parser'); // Necesario para leer cookies
const express = require('express');
const cors = require('cors');


const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Para datos de formularios
app.use(cookieParser()); // Para manejar cookies


//conexion a base de datos
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa con la base de datos.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}
testConnection();

// Rutas
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.post('/login', (req, res) => {
  res.json(login.login(req,res));
});


// Iniciar servidor
app.listen(global.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${global.PORT}`);
});
