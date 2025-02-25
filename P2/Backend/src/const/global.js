const dotenv = require('dotenv');
const { randomBytes } = require('crypto');

// Cargar variables de entorno
dotenv.config();
 
module.exports = {    
    SECRET_KEY : process.env.SECRET_KEY || randomBytes(36).toString('base64'),
    PORT : process.env.PORT || 3000,
    DB_USER : process.env.DB_USER,
    DB_PASSWORD : process.env.DB_PASSWORD,
    DB_SERVER : process.env.DB_SERVER ,
    DB_DATABASE : process.env.DB_DATABASE,
    OPERADOR : 'Operador',
    CLIENTE : 'Cliente',
    ADMIN : 'Administrador',
    TOKEN_EXPIRATION : process.env.JWT_EXPIRATION || '24h',
    TOKEN_RENEWAL_GRACE_PERIOD : process.env.JWT_RENEWAL_GRACE_PERIOD || '1h',
    AES_SECRET : process.env.AES_SECRET,
 }

