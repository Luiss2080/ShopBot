'use strict';

const { DataTypes, Model } = require('sequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');

class ModeloOrdenSequelize extends Model {}

ModeloOrdenSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numeroOrden: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    sessionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombreCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefonoCliente: {
        type: DataTypes.STRING,
        allowNull: false
    },
    direccionEnvio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'COMPLETADO'
      }
}, {
    sequelize: instanciaSequelize,
    modelName: 'Orden',
    tableName: 'Ordenes',
    timestamps: true
});

module.exports = ModeloOrdenSequelize;
