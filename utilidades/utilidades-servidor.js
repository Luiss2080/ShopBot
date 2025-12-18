// Utilidades generales del servidor
class UtilidadesServidor {
    /**
     * Espera un tiempo determinado (promesa)
     * @param {number} ms - Milisegundos a esperar
     * @returns {Promise}
     */
    static esperar(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Genera un ID único
     * @returns {string} ID generado
     */
    static generarId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Limpia un objeto eliminando propiedades undefined o null
     * @param {object} obj - Objeto a limpiar
     * @returns {object} Objeto limpio
     */
    static limpiarObjeto(obj) {
        const objetoLimpio = {};
        
        for (const [clave, valor] of Object.entries(obj)) {
            if (valor !== undefined && valor !== null) {
                objetoLimpio[clave] = valor;
            }
        }
        
        return objetoLimpio;
    }

    /**
     * Verifica si un valor es un objeto válido
     * @param {any} valor - Valor a verificar
     * @returns {boolean}
     */
    static esObjetoValido(valor) {
        return valor && typeof valor === 'object' && !Array.isArray(valor);
    }

    /**
     * Convierte un texto a slug (URL amigable)
     * @param {string} texto - Texto a convertir
     * @returns {string} Slug generado
     */
    static convertirASlug(texto) {
        return texto
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}

module.exports = UtilidadesServidor;
