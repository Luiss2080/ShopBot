// Constantes de códigos de estado HTTP
module.exports = {
    // Éxito
    OK: 200,
    CREADO: 201,
    ACEPTADO: 202,
    SIN_CONTENIDO: 204,
    
    // Errores del cliente
    SOLICITUD_INCORRECTA: 400,
    NO_AUTORIZADO: 401,
    PROHIBIDO: 403,
    NO_ENCONTRADO: 404,
    METODO_NO_PERMITIDO: 405,
    CONFLICTO: 409,
    
    // Errores del servidor
    ERROR_INTERNO: 500,
    NO_IMPLEMENTADO: 501,
    SERVICIO_NO_DISPONIBLE: 503
};
