'use strict';

const { DataTypes, Model } = require('sequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');
const ModeloProductoSequelize = require('../../productos/modelos/ModeloProductoSequelize');

class ModeloCarritoSequelize extends Model {}

ModeloCarritoSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    sequelize: instanciaSequelize,
    modelName: 'Carrito',
    tableName: 'Carritos',
    timestamps: true
});

ModeloCarritoSequelize.belongsTo(ModeloProductoSequelize, {
    foreignKey: 'productoId',
    as: 'producto'
});

module.exports = ModeloCarritoSequelize;
