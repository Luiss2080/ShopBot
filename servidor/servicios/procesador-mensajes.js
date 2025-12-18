// Servicio procesador de mensajes - Lógica de procesamiento de mensajes del chatbot
const analizadorIntenciones = require('./analizador-intenciones');
const generadorRespuestas = require('./generador-respuestas');

class ProcesadorMensajes {
    /**
     * Procesa un mensaje y genera una respuesta
     * @param {string} mensaje - Mensaje del usuario
     * @returns {Promise<string>} Respuesta generada
     */
    async procesar(mensaje) {
        try {
            // Analizar la intención del mensaje
            const intencion = await analizadorIntenciones.analizar(mensaje);

            // Generar respuesta basada en la intención
            const respuesta = await generadorRespuestas.generar(intencion, mensaje);

            return respuesta;
        } catch (error) {
            console.error('Error al procesar mensaje:', error);
            return 'Lo siento, no pude procesar tu mensaje. ¿Podrías reformularlo?';
        }
    }

    /**
     * Normaliza el texto del mensaje
     * @param {string} mensaje - Mensaje a normalizar
     * @returns {string} Mensaje normalizado
     */
    normalizar(mensaje) {
        return mensaje
            .toLowerCase()
            .trim()
            .replace(/[^\w\sáéíóúñ]/gi, '');
    }
}

module.exports = new ProcesadorMensajes();
