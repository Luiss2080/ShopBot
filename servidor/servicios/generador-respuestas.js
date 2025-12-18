// Servicio generador de respuestas - Genera respuestas basadas en intenciones
class GeneradorRespuestas {
    constructor() {
        this.respuestas = {
            saludo: [
                '¡Hola! ¿En qué puedo ayudarte hoy?',
                '¡Buenos días! Estoy aquí para asistirte.',
                '¡Hola! ¿Qué necesitas?'
            ],
            despedida: [
                '¡Hasta luego! Que tengas un excelente día.',
                '¡Adiós! No dudes en volver si necesitas ayuda.',
                '¡Nos vemos! Cuídate.'
            ],
            consulta_precio: [
                'Puedo ayudarte con información sobre precios. ¿Qué producto te interesa?',
                'Con gusto te informo sobre precios. ¿Cuál es el producto que buscas?'
            ],
            consulta_producto: [
                'Tenemos una amplia variedad de productos. ¿Buscas algo específico?',
                '¿Qué tipo de producto estás buscando? Te puedo ayudar a encontrarlo.'
            ],
            consulta_disponibilidad: [
                'Déjame verificar la disponibilidad. ¿Qué producto te interesa?',
                'Puedo consultar el stock para ti. ¿Cuál es el producto?'
            ],
            ayuda: [
                'Estoy aquí para ayudarte. Puedes preguntarme sobre productos, precios o disponibilidad.',
                'Con gusto te ayudo. ¿Qué información necesitas?'
            ],
            agradecimiento: [
                '¡De nada! Estoy aquí para ayudarte.',
                '¡Un placer! Si necesitas algo más, aquí estaré.'
            ],
            desconocida: [
                'No estoy seguro de entender. ¿Podrías ser más específico?',
                'Disculpa, no comprendí bien. ¿Puedes reformular tu pregunta?',
                'Entiendo que necesitas ayuda. ¿Puedes darme más detalles?'
            ]
        };
    }

    /**
     * Genera una respuesta basada en la intención
     * @param {string} intencion - Intención detectada
     * @param {string} mensaje - Mensaje original
     * @returns {Promise<string>} Respuesta generada
     */
    async generar(intencion, mensaje) {
        const respuestasPosibles = this.respuestas[intencion] || this.respuestas.desconocida;
        
        // Seleccionar una respuesta aleatoria
        const indiceAleatorio = Math.floor(Math.random() * respuestasPosibles.length);
        return respuestasPosibles[indiceAleatorio];
    }

    /**
     * Personaliza una respuesta con datos del contexto
     * @param {string} plantilla - Plantilla de respuesta
     * @param {object} datos - Datos para personalizar
     * @returns {string} Respuesta personalizada
     */
    personalizar(plantilla, datos) {
        let respuesta = plantilla;
        
        for (const [clave, valor] of Object.entries(datos)) {
            respuesta = respuesta.replace(`{{${clave}}}`, valor);
        }
        
        return respuesta;
    }
}

module.exports = new GeneradorRespuestas();
