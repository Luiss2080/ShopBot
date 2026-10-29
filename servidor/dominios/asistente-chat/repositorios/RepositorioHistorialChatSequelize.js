'use strict';

const ModeloHistorialChatSequelize = require('../modelos/ModeloHistorialChatSequelize');

class RepositorioHistorialChatSequelize {
    constructor(modelo = ModeloHistorialChatSequelize) {
        this.modelo = modelo;
        this.memoriaFallback = [];
    }

    async guardarInteraccion({ sessionId, mensajeUsuario, respuestaBot, intencionDetectada }) {
        try {
            return await this.modelo.create({
                sessionId,
                mensajeUsuario,
                respuestaBot: typeof respuestaBot === 'string' ? respuestaBot : JSON.stringify(respuestaBot),
                intencionDetectada
            });
        } catch (error) {
            // Fallback a almacenamiento en memoria si la tabla aún no se ha migrado
            const entrada = {
                id: `mem_${Date.now()}`,
                sessionId,
                mensajeUsuario,
                respuestaBot,
                intencionDetectada,
                createdAt: new Date()
            };
            this.memoriaFallback.push(entrada);
            if (this.memoriaFallback.length > 100) this.memoriaFallback.shift();
            return entrada;
        }
    }

    async obtenerHistorialSesion(sessionId, limite = 50) {
        try {
            return await this.modelo.findAll({
                where: sessionId ? { sessionId } : {},
                limit: limite,
                order: [['createdAt', 'ASC']]
            });
        } catch (error) {
            return this.memoriaFallback.filter(m => !sessionId || m.sessionId === sessionId);
        }
    }

    async limpiarHistorialSesion(sessionId) {
        try {
            return await this.modelo.destroy({
                where: sessionId ? { sessionId } : {}
            });
        } catch (error) {
            this.memoriaFallback = sessionId 
                ? this.memoriaFallback.filter(m => m.sessionId !== sessionId) 
                : [];
            return true;
        }
    }
}

module.exports = RepositorioHistorialChatSequelize;
