// Configuración del servidor
module.exports = {
    puerto: process.env.PORT || 3000,
    entorno: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    
    // Configuración de CORS
    cors: {
        origen: process.env.CORS_ORIGIN || '*',
        metodos: ['GET', 'POST', 'PUT', 'DELETE'],
        credenciales: true
    },
    
    // Límites de solicitud
    limites: {
        tamañoBody: '10mb',
        tiempoExpiracion: 30000 // 30 segundos
    }
};
