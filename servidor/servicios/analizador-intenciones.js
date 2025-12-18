// Servicio analizador de intenciones - Determina la intención del usuario
class AnalizadorIntenciones {
    constructor() {
        this.palabrasClave = {
            saludo: ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'qué tal'],
            despedida: ['adiós', 'chao', 'hasta luego', 'nos vemos', 'bye'],
            consulta_precio: ['precio', 'costo', 'valor', 'cuánto cuesta', 'cuánto vale'],
            consulta_producto: ['producto', 'artículo', 'item', 'tienen', 'hay'],
            consulta_disponibilidad: ['disponible', 'stock', 'existencia', 'quedan'],
            ayuda: ['ayuda', 'ayúdame', 'necesito ayuda', 'soporte'],
            agradecimiento: ['gracias', 'muchas gracias', 'te agradezco']
        };
    }

    /**
     * Analiza un mensaje y determina la intención
     * @param {string} mensaje - Mensaje a analizar
     * @returns {Promise<string>} Intención detectada
     */
    async analizar(mensaje) {
        const mensajeNormalizado = mensaje.toLowerCase().trim();

        // Buscar coincidencias con palabras clave
        for (const [intencion, palabras] of Object.entries(this.palabrasClave)) {
            for (const palabra of palabras) {
                if (mensajeNormalizado.includes(palabra)) {
                    return intencion;
                }
            }
        }

        // Si no se encuentra una intención específica
        return 'desconocida';
    }

    /**
     * Extrae entidades del mensaje (productos, números, etc.)
     * @param {string} mensaje - Mensaje a analizar
     * @returns {object} Entidades extraídas
     */
    extraerEntidades(mensaje) {
        const entidades = {
            numeros: [],
            productos: []
        };

        // Extraer números
        const regexNumeros = /\d+/g;
        const numerosEncontrados = mensaje.match(regexNumeros);
        if (numerosEncontrados) {
            entidades.numeros = numerosEncontrados.map(n => parseInt(n));
        }

        return entidades;
    }
}

module.exports = new AnalizadorIntenciones();
