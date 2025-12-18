// Controlador de chat - Maneja las solicitudes relacionadas con el chatbot
const procesadorMensajes = require('../servicios/procesador-mensajes');
const gestorHistorial = require('../servicios/gestor-historial');

class ControladorChat {
    /**
     * Procesa un mensaje del usuario
     * @param {object} req - Request
     * @param {object} res - Response
     */
    async procesarMensaje(req, res) {
        try {
            const { mensaje } = req.body;

            if (!mensaje || mensaje.trim().length === 0) {
                return res.status(400).json({
                    exito: false,
                    error: 'El mensaje no puede estar vacío'
                });
            }

            // Procesar el mensaje
            const respuesta = await procesadorMensajes.procesar(mensaje);

            // Guardar en historial
            await gestorHistorial.guardarMensaje({
                mensaje,
                respuesta,
                timestamp: new Date()
            });

            res.json({
                exito: true,
                respuesta
            });
        } catch (error) {
            console.error('Error al procesar mensaje:', error);
            res.status(500).json({
                exito: false,
                error: 'Error al procesar el mensaje'
            });
        }
    }

    /**
     * Obtiene el historial de mensajes
     * @param {object} req - Request
     * @param {object} res - Response
     */
    async obtenerHistorial(req, res) {
        try {
            const historial = await gestorHistorial.obtenerHistorial();
            res.json({
                exito: true,
                historial
            });
        } catch (error) {
            console.error('Error al obtener historial:', error);
            res.status(500).json({
                exito: false,
                error: 'Error al obtener historial'
            });
        }
    }

    /**
     * Limpia el historial de mensajes
     * @param {object} req - Request
     * @param {object} res - Response
     */
    async limpiarHistorial(req, res) {
        try {
            await gestorHistorial.limpiarHistorial();
            res.json({
                exito: true,
                mensaje: 'Historial limpiado correctamente'
            });
        } catch (error) {
            console.error('Error al limpiar historial:', error);
            res.status(500).json({
                exito: false,
                error: 'Error al limpiar historial'
            });
        }
    }
}

module.exports = new ControladorChat();
