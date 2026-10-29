'use strict';

const CodigosEstadoHttp = require('../constantes/CodigosEstadoHttp');

class InterceptorManejoErroresCentralizado {
    static rutaNoEncontrada(req, res) {
        return res.status(CodigosEstadoHttp.NO_ENCONTRADO).json({
            exito: false,
            error: `La ruta solicitada '${req.method} ${req.originalUrl}' no existe en el servidor.`
        });
    }

    static capturarExcepciones(err, req, res, next) {
        const codigoHttp = err.codigoHttp || CodigosEstadoHttp.ERROR_INTERNO_SERVIDOR;
        const mensajeRespuesta = err.message || 'Ocurrió un error inesperado en el servidor.';

        if (process.env.NODE_ENV !== 'test') {
            console.error(`[ERROR CRÍTICO] [${req.method} ${req.url}]:`, err);
        }

        return res.status(codigoHttp).json({
            exito: false,
            error: mensajeRespuesta,
            ...(process.env.NODE_ENV === 'development' && { trazaError: err.stack })
        });
    }
}

module.exports = InterceptorManejoErroresCentralizado;

