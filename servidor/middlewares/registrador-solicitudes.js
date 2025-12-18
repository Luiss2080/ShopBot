// Middleware de registro de solicitudes (logger)
class RegistradorSolicitudes {
    /**
     * Registra información de cada solicitud
     */
    static registrar(req, res, next) {
        const inicio = Date.now();

        // Registrar cuando la respuesta termine
        res.on('finish', () => {
            const duracion = Date.now() - inicio;
            const fecha = new Date().toISOString();
            
            console.log(`[${fecha}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duracion}ms)`);
        });

        next();
    }

    /**
     * Registra el body de las solicitudes POST/PUT
     */
    static registrarBody(req, res, next) {
        if (req.method === 'POST' || req.method === 'PUT') {
            console.log('Body:', JSON.stringify(req.body, null, 2));
        }
        next();
    }
}

module.exports = RegistradorSolicitudes;
