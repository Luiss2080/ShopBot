// Utilidad para validar datos de entrada
class Validador {
    /**
     * Valida que un texto no esté vacío
     * @param {string} texto - Texto a validar
     * @returns {boolean}
     */
    static esTextoValido(texto) {
        return texto && texto.trim().length > 0;
    }

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
     * Valida longitud mínima de texto
     * @param {string} texto - Texto a validar
     * @param {number} longitudMinima - Longitud mínima requerida
     * @returns {boolean}
     */
    static longitudMinima(texto, longitudMinima) {
        return texto && texto.trim().length >= longitudMinima;
    }

    /**
     * Valida longitud máxima de texto
     * @param {string} texto - Texto a validar
     * @param {number} longitudMaxima - Longitud máxima permitida
     * @returns {boolean}
     */
    static longitudMaxima(texto, longitudMaxima) {
        return texto && texto.trim().length <= longitudMaxima;
    }

    /**
     * Valida que sea un número válido
     * @param {any} valor - Valor a validar
     * @returns {boolean}
     */
    static esNumeroValido(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    }
}

window.Validador = Validador;
