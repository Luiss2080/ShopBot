'use strict';

const CodigosEstadoHttp = Object.freeze({
    OK: 200,
    CREADO: 201,
    ACEPTADO: 202,
    SIN_CONTENIDO: 204,
    SOLICITUD_INCORRECTA: 400,
    NO_AUTORIZADO: 401,
    PROHIBIDO: 403,
    NO_ENCONTRADO: 404,
    CONFLICTO: 409,
    ERROR_INTERNO_SERVIDOR: 500,
    SERVICIO_NO_DISPONIBLE: 503
});

module.exports = CodigosEstadoHttp;

