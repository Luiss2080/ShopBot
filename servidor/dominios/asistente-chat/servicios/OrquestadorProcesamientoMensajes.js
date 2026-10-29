'use strict';

const ClasificadorIntencionesNlp = require('../motor-nlp/ClasificadorIntencionesNlp');
const GeneradorRespuestasContextuales = require('../generadores/GeneradorRespuestasContextuales');
const RepositorioHistorialChatSequelize = require('../repositorios/RepositorioHistorialChatSequelize');

class OrquestadorProcesamientoMensajes {
    constructor(
        clasificadorNlp = new ClasificadorIntencionesNlp(),
        generadorRespuestas = new GeneradorRespuestasContextuales(),
        repositorioHistorial = new RepositorioHistorialChatSequelize()
    ) {
        this.clasificadorNlp = clasificadorNlp;
        this.generadorRespuestas = generadorRespuestas;
        this.repositorioHistorial = repositorioHistorial;
    }

    async procesarMensajeUsuario(mensajeTexto, sessionId = null) {
        const clasificacion = await this.clasificadorNlp.clasificarMensaje(mensajeTexto);
        const respuestaConstruida = await this.generadorRespuestas.generarRespuesta(clasificacion, mensajeTexto);

        await this.repositorioHistorial.guardarInteraccion({
            sessionId,
            mensajeUsuario: mensajeTexto,
            respuestaBot: respuestaConstruida,
            intencionDetectada: clasificacion.intencion
        });

        return {
            respuesta: respuestaConstruida,
            metadatos: {
                intencion: clasificacion.intencion,
                confianza: clasificacion.puntuacion
            }
        };
    }

    async consultarHistorialSesion(sessionId) {
        return await this.repositorioHistorial.obtenerHistorialSesion(sessionId);
    }

    async vaciarHistorialSesion(sessionId) {
        return await this.repositorioHistorial.limpiarHistorialSesion(sessionId);
    }
}

module.exports = OrquestadorProcesamientoMensajes;

