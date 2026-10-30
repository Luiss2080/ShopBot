'use strict';

const { DataTypes, Model } = require('sequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');
const ModeloOrdenSequelize = require('./ModeloOrdenSequelize');

class ModeloDetalleOrdenSequelize extends Model {}

ModeloDetalleOrdenSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ordenId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombreProducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    precioUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    sequelize: instanciaSequelize,
    modelName: 'DetalleOrden',
    tableName: 'DetallesOrden',
    timestamps: true
});

ModeloOrdenSequelize.hasMany(ModeloDetalleOrdenSequelize, {
    foreignKey: 'ordenId',
    as: 'detalles'
});

ModeloDetalleOrdenSequelize.belongsTo(ModeloOrdenSequelize, {
    foreignKey: 'ordenId',
    as: 'orden'
});

module.exports = ModeloDetalleOrdenSequelize;
