// Servicio de chat para comunicación con el chatbot
class ServicioChat {
    constructor() {
        this.api = window.ServicioAPI;
    }

    /**
     * Envía un mensaje al chatbot
     * @param {string} mensaje - Mensaje del usuario
     * @returns {Promise}
     */
    async enviarMensaje(mensaje) {
        try {
            const respuesta = await this.api.enviar('/chat/mensaje', {
                mensaje,
                timestamp: new Date().toISOString()
            });
            return respuesta;
        } catch (error) {
            console.error('Error al enviar mensaje:', error);
            return {
                exito: false,
                mensaje: 'Lo siento, hubo un error al procesar tu mensaje.'
            };
        }
    }

    /**
     * Obtiene el historial de conversaciones
     * @returns {Promise}
     */
    async obtenerHistorial() {
        try {
            const historial = await this.api.obtener('/chat/historial');
            return historial;
        } catch (error) {
            console.error('Error al obtener historial:', error);
            return [];
        }
    }

    /**
     * Limpia el historial de chat
     * @returns {Promise}
     */
    async limpiarHistorial() {
        try {
            await this.api.eliminar('/chat/historial');
            return { exito: true };
        } catch (error) {
            console.error('Error al limpiar historial:', error);
            return { exito: false };
        }
    }
}

window.ServicioChat = new ServicioChat();
