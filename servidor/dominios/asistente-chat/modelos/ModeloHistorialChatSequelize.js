'use strict';

const { DataTypes, Model } = require('sequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');

class ModeloHistorialChatSequelize extends Model {}

ModeloHistorialChatSequelize.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sessionId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    mensajeUsuario: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    respuestaBot: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    intencionDetectada: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: instanciaSequelize,
    modelName: 'HistorialChat',
    tableName: 'HistorialChats',
    timestamps: true
});

module.exports = ModeloHistorialChatSequelize;
