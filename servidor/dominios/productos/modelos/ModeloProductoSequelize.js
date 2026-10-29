'use strict';

const { DataTypes, Model } = require('sequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');

class ModeloProductoSequelize extends Model {
    estaEnStock() {
        return (this.stock || 0) > 0;
    }
}

ModeloProductoSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: instanciaSequelize,
    modelName: 'Producto',
    tableName: 'Productos',
    timestamps: true
});

module.exports = ModeloProductoSequelize;
