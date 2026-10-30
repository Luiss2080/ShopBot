'use strict';

const { DataTypes, Model } = require('sequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');

class ModeloCuponSequelize extends Model {}

ModeloCuponSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    porcentajeDescuento: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    descuentoFijo: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    montoMinimo: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    fechaExpiracion: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: instanciaSequelize,
    modelName: 'Cupon',
    tableName: 'Cupones',
    timestamps: true
});

module.exports = ModeloCuponSequelize;

