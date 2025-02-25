
const  global = require('../const/global');
const crypto = require('crypto');

// Middleware para validar JWT
function authenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, global.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorizeRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.rol !== requiredRole) {
            return res.status(403).send('No tiene permisos para acceder a este recurso.');
        }
        next();
    };
}

// Función para encriptar datos sensibles con AES
function encryptData(data) {
    const cipher = crypto.createCipher('aes-256-cbc', global.AES_SECRET);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

//Encriptacion de contraseña
function encryptPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Middleware para verificar y renovar el token
function verifyAndRenewToken(req, res, next) {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).send('No autorizado.');

    jwt.verify(token, global.SECRET_KEY, (err, decoded) => {
        if (err) {
            // Verificar si el error es por expiración reciente
            if (err.name === 'TokenExpiredError') {
                const expiredAt = err.expiredAt.getTime();
                const now = Date.now();
                const gracePeriod = parseInt(global.TOKEN_RENEWAL_GRACE_PERIOD) * 60 * 1000;
                if (now - expiredAt < gracePeriod) {
                    // Renovar token
                    const newToken = jwt.sign({
                        id: decoded.id,
                        correo: decoded.correo,
                        rol: decoded.rol,
                    }, SECRET_KEY, { expiresIn: global.TOKEN_EXPIRATION });
                    res.cookie('authToken', newToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: 'Strict',
                        maxAge: 24 * 60 * 60 * 1000,
                    });
                    return next();
                }
            }
            return res.status(401).send('Token expirado o inválido.');
        }
        req.user = decoded;
        next();
    });
}


module.exports = {
    authenticateToken,
    authorizeRole,
    verifyAndRenewToken,
    encryptData,
    encryptPassword
}