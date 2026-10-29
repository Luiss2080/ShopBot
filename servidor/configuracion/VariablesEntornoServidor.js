'use strict';

module.exports = {
    puertoServidor: process.env.PORT || 3000,
    hostServidor: process.env.HOST || '127.0.0.1',
    entornoEjecucion: process.env.NODE_ENV || 'development',
    limitesCargaBody: '10mb',
    tiempoEsperaPeticionMs: 15000,
    origenPermitidoCors: process.env.CORS_ORIGIN || '*'
};
