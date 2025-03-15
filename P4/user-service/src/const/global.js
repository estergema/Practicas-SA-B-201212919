const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();
 
module.exports = {    
    PORT : process.env.PORT || 4001,
 }

