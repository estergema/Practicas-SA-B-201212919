/* ==============================================================
/*	Modulo de gestion de usuario a través JSON Web Token	
/*=============================================================*/


//conexion a base de datos
const sequelize = require('../database/connection');
const auth = require('../middlewares/auth')
const  global = require('../const/global');

const { Sequelize } = require('sequelize');

// Autenticación con JWT usando cookie segura
async function login(req, res) {
    console.log(req.body)
    const { correo, password } = req.body;
    if (!correo || !password) {
        return res.status(400).send('Faltan parámetros.');
    }
    try {
        const result = await sequelize.query(
            'EXEC AuthenticarUsuario @correo=:correo, @password=:password',
            {
                replacements: {
                    correo: correo,
                    password: password,
                },
                type: Sequelize.QueryTypes.SELECT,
            }
        );

        const user = result[0];
        if (!user) return res.sendStatus(404);


        // Generar el token JWT
        const token = jwt.sign(
            {
                id: user.idUsuario,
                correo: user.correo,
                rol: user.idRol,
            },
            global.SECRET_KEY,
            { expiresIn: global.TOKEN_EXPIRATION }
        );

        // Guardar el token en una cookie segura
        res.cookie('authToken', token, {
            httpOnly: true, // No accesible desde JS en el navegador
            secure: true, // Solo en HTTPS
            sameSite: 'Strict', // Proteger contra CSRF
            maxAge: 24 * 60 * 60 * 1000, // Tiempo de vida en milisegundos
        });

        res.json({ message: 'Autenticación exitosa.' });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).send('Error interno del servidor.');
    }
}

module.exports = {login}