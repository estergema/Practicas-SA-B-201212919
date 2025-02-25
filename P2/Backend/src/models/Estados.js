// conexion a base de datos
const sequelize = require('.connection');
const { DataTypes } = require('sequelize');

// Modelos
const Estados = sequelize.define('Estados', {
    idEstado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
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
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    timestamps: false,
});
module.exports={Estados}


