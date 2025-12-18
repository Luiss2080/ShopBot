// Configuración de la API
module.exports = {
    version: 'v1',
    prefijoBase: '/api',
    
    // Endpoints
    endpoints: {
        chat: '/chat',
        productos: '/productos',
        usuarios: '/usuarios'
    },
    
    // Configuración de respuestas
    respuestas: {
        formatoFecha: 'es-ES',
        incluirMetadata: true
    },
    
    // Límites de paginación
    paginacion: {
        limitePorDefecto: 20,
        limiteMaximo: 100
    }
};
