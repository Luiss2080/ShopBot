// Middleware de manejo de errores
class ManejadorErrores {
    /**
     * Middleware para capturar errores no manejados
     */
    static capturarErrores(err, req, res, next) {
        console.error('Error no manejado:', err);

        const statusCode = err.statusCode || 500;
        const mensaje = err.message || 'Error interno del servidor';

        res.status(statusCode).json({
            exito: false,
            error: mensaje,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    }

    /**
     * Middleware para rutas no encontradas
     */
    static rutaNoEncontrada(req, res) {
        res.status(404).json({
            exito: false,
            error: 'Ruta no encontrada',
            ruta: req.originalUrl
        });
    }
}

module.exports = ManejadorErrores;
