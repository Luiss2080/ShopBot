'use strict';

const { DataTypes, Model } = require('sequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');

class ModeloUsuarioSequelize extends Model {
    obtenerPerfilPublico() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            rol: this.rol,
            createdAt: this.createdAt
        };
    }
}

ModeloUsuarioSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'CLIENTE'
    }
}, {
    sequelize: instanciaSequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
    timestamps: true
});

module.exports = ModeloUsuarioSequelize;
