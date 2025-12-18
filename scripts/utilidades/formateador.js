// Utilidad para formatear datos
class Formateador {
    /**
     * Formatea una fecha a formato legible en español
     * @param {Date} fecha - Fecha a formatear
     * @returns {string}
     */
    static formatearFecha(fecha) {
        const opciones = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return fecha.toLocaleDateString('es-ES', opciones);
    }

    /**
     * Formatea una hora en formato corto
     * @param {Date} fecha - Fecha con la hora
     * @returns {string}
     */
    static formatearHora(fecha) {
        return fecha.toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    /**
     * Formatea un precio con símbolo de moneda
     * @param {number} precio - Precio a formatear
     * @param {string} moneda - Código de moneda (default: 'USD')
     * @returns {string}
     */
    static formatearPrecio(precio, moneda = 'USD') {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: moneda
        }).format(precio);
    }

    /**
     * Capitaliza la primera letra de un texto
     * @param {string} texto - Texto a capitalizar
     * @returns {string}
     */
    static capitalizarPrimeraLetra(texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    }

    /**
     * Trunca un texto a una longitud específica
     * @param {string} texto - Texto a truncar
     * @param {number} longitud - Longitud máxima
     * @returns {string}
     */
    static truncarTexto(texto, longitud) {
        if (texto.length <= longitud) return texto;
        return texto.substring(0, longitud) + '...';
    }
}

window.Formateador = Formateador;
