'use strict';

class ValidadorConsultaProductos {
    static validarTerminoBusqueda(termino) {
        if (!termino || typeof termino !== 'string' || termino.trim().length === 0) {
            return {
                esValido: false,
                mensajeError: 'Debe proporcionar un término de búsqueda válido.'
            };
        }
        if (termino.trim().length > 100) {
            return {
                esValido: false,
                mensajeError: 'El término de búsqueda no puede exceder los 100 caracteres.'
            };
        }
        return { esValido: true, valorSanitizado: termino.trim() };
    }

    static validarIdentificadorProducto(id) {
        const idNumerico = Number(id);
        if (!id || Number.isNaN(idNumerico) || idNumerico <= 0) {
            return {
                esValido: false,
                mensajeError: 'El identificador del producto debe ser un entero positivo.'
            };
        }
        return { esValido: true, idNumerico };
    }
}

module.exports = ValidadorConsultaProductos;
