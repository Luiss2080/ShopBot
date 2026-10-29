'use strict';

class ValidadorMensajeEntradaChat {
    static validarCuerpoMensaje(body) {
        if (!body || typeof body.mensaje !== 'string' || body.mensaje.trim().length === 0) {
            return {
                esValido: false,
                mensajeError: 'El mensaje no puede estar vacío.'
            };
        }

        const mensajeLimpio = body.mensaje.trim();
        if (mensajeLimpio.length > 500) {
            return {
                esValido: false,
                mensajeError: 'El mensaje excede el límite permitido de 500 caracteres.'
            };
        }

        return {
            esValido: true,
            mensajeLimpio
        };
    }
}

module.exports = ValidadorMensajeEntradaChat;

