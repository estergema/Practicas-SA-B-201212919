// conexion a base de datos
const sequelize = require('../connection');
const { DataTypes } = require('sequelize');

const Usuarios = sequelize.define('Usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre_completo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fecha_modificacion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    idEstado: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    idRol: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
});

// Relaciones
Usuarios.belongsTo(Roles, { foreignKey: 'idRol' });
Usuarios.belongsTo(Estados, { foreignKey: 'idEstado' });

module.exports = {Usuarios}