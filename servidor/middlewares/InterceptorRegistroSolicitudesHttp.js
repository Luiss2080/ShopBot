'use strict';

class InterceptorRegistroSolicitudesHttp {
    static registrar(req, res, next) {
        const marcaTiempoInicio = Date.now();
        const { method, originalUrl } = req;

        res.on('finish', () => {
            const tiempoTranscurridoMs = Date.now() - marcaTiempoInicio;
            if (process.env.NODE_ENV !== 'test') {
                const timestampIso = new Date().toISOString();
                console.log(`[${timestampIso}] ${method} ${originalUrl} - ${res.statusCode} (${tiempoTranscurridoMs}ms)`);
            }
        });

        next();
    }
}

module.exports = InterceptorRegistroSolicitudesHttp;

