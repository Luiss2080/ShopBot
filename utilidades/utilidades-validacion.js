// Utilidades de validación
class UtilidadesValidacion {
    /**
     * Valida formato de email
     * @param {string} email - Email a validar
     * @returns {boolean}
     */
    static esEmailValido(email) {
        const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return patron.test(email);
    }

    /**
     * Valida que una cadena no esté vacía
     * @param {string} texto - Texto a validar
     * @returns {boolean}
     */
    static esTextoNoVacio(texto) {
        return typeof texto === 'string' && texto.trim().length > 0;
    }

    /**
     * Valida que un número esté en un rango
     * @param {number} numero - Número a validar
     * @param {number} min - Valor mínimo
     * @param {number} max - Valor máximo
     * @returns {boolean}
     */
    static estaEnRango(numero, min, max) {
        return numero >= min && numero <= max;
    }

    /**
     * Valida formato de URL
     * @param {string} url - URL a validar
     * @returns {boolean}
     */
    static esUrlValida(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Valida que un objeto tenga propiedades requeridas
     * @param {object} obj - Objeto a validar
     * @param {Array} propiedades - Propiedades requeridas
     * @returns {boolean}
     */
    static tienePropiedades(obj, propiedades) {
        return propiedades.every(prop => obj.hasOwnProperty(prop));
    }
}

module.exports = UtilidadesValidacion;
