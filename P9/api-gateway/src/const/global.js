const dotenv = require('dotenv');

// Cargar variables de entorno
dotenv.config();
 
module.exports = {    
    PORT : process.env.PORT || 4000,
    PRODUCT_SERVICE_URL : process.env.PRODUCT_SERVICE_URL || "http://localhost:4001",
    USER_SERVICE_URL : process.env.USER_SERVICE_URL || "http://localhost:4002",
    ORDER_SERVICE_URL : process.env.ORDER_SERVICE_URL || "http://localhost:4003",
    NOTIFICATION_SERVICE_URL : process.env.NOTIFICATION_SERVICE_URL || "http://localhost:4004",
 }

