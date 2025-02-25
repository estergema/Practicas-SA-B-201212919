const { Sequelize } = require('sequelize');
const global = require('../const/global');

// Configuración de la base de datos con Sequelize
const sequelize = new Sequelize(
    global.DB_DATABASE, 
    global.DB_USER, 
    global.DB_PASSWORD, 
    {
        host: global.DB_SERVER,
        dialect: 'mssql',
        logging: false, // Desactiva los logs de Sequelize
        dialectOptions: {
            trustServerCertificate: true // Usar si no existe un certificado SSL
        },
        logging: true, // Para desactivar logs en consola
    }
);
  
module.exports = sequelize;