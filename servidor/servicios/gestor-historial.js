// Servicio gestor de historial - Maneja el almacenamiento del historial de chat
class GestorHistorial {
    constructor() {
        this.historial = [];
        this.limiteHistorial = 100; // Máximo de mensajes a almacenar
    }

    /**
     * Guarda un mensaje en el historial
     * @param {object} mensaje - Objeto con datos del mensaje
     */
    async guardarMensaje(mensaje) {
        this.historial.push({
            id: this.generarId(),
            ...mensaje,
            timestamp: mensaje.timestamp || new Date()
        });

        // Mantener solo los últimos N mensajes
        if (this.historial.length > this.limiteHistorial) {
            this.historial.shift();
        }
    }

    /**
     * Obtiene todo el historial
     * @returns {Promise<Array>} Historial de mensajes
     */
    async obtenerHistorial() {
        return [...this.historial];
    }

    /**
     * Limpia el historial
     */
    async limpiarHistorial() {
        this.historial = [];
    }

    /**
     * Obtiene mensajes recientes
     * @param {number} cantidad - Cantidad de mensajes a obtener
     * @returns {Array} Mensajes recientes
     */
    obtenerRecientes(cantidad = 10) {
        return this.historial.slice(-cantidad);
    }

    /**
     * Genera un ID único para el mensaje
     * @returns {string} ID generado
     */
    generarId() {
        return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

module.exports = new GestorHistorial();
