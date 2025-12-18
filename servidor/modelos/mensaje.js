// Modelo de Mensaje
class Mensaje {
    constructor(datos) {
        this.id = datos.id || null;
        this.texto = datos.texto || '';
        this.tipo = datos.tipo || 'usuario'; // 'usuario' o 'bot'
        this.timestamp = datos.timestamp || new Date();
        this.leido = datos.leido || false;
    }

    /**
     * Valida que el mensaje sea válido
     * @returns {boolean}
     */
    esValido() {
        return this.texto && this.texto.trim().length > 0;
    }

    /**
     * Convierte el mensaje a objeto simple
     * @returns {object}
     */
    toJSON() {
        return {
            id: this.id,
            texto: this.texto,
            tipo: this.tipo,
            timestamp: this.timestamp,
            leido: this.leido
        };
    }
}

module.exports = Mensaje;
