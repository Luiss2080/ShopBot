'use strict';

const OrquestadorProcesamientoMensajes = require('../servicios/OrquestadorProcesamientoMensajes');
const ValidadorMensajeEntradaChat = require('../validadores/ValidadorMensajeEntradaChat');
const CodigosEstadoHttp = require('../../../constantes/CodigosEstadoHttp');

class ControladorEndpointsChat {
    constructor(orquestadorMensajes = new OrquestadorProcesamientoMensajes()) {
        this.orquestadorMensajes = orquestadorMensajes;
        this.procesarMensaje = this.procesarMensaje.bind(this);
        this.obtenerHistorial = this.obtenerHistorial.bind(this);
        this.limpiarHistorial = this.limpiarHistorial.bind(this);
    }

    async procesarMensaje(req, res, next) {
        try {
            const validacion = ValidadorMensajeEntradaChat.validarCuerpoMensaje(req.body);
            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    exito: false,
                    error: validacion.mensajeError
                });
            }

            const sessionId = req.headers['x-session-id'] || null;
            const resultado = await this.orquestadorMensajes.procesarMensajeUsuario(
                validacion.mensajeLimpio,
                sessionId
            );

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                respuesta: resultado.respuesta,
                metadatos: resultado.metadatos
            });
        } catch (error) {
            return next(error);
        }
    }

    async obtenerHistorial(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'] || null;
            const historial = await this.orquestadorMensajes.consultarHistorialSesion(sessionId);

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                historial
            });
        } catch (error) {
            return next(error);
        }
    }

    async limpiarHistorial(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'] || null;
            await this.orquestadorMensajes.vaciarHistorialSesion(sessionId);

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                mensaje: 'Historial conversacional limpiado correctamente.'
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ControladorEndpointsChat;

