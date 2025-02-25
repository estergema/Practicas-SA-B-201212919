// conexion a base de datos
const sequelize = require('..connection');
const { DataTypes } = require('sequelize');

const Roles = sequelize.define('Roles', {
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
module.exports={Roles}