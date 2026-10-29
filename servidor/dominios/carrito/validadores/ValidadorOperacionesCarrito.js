'use strict';

class ValidadorOperacionesCarrito {
    static validarAgregarItem({ sessionId, productoId, cantidad }) {
        if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
            return {
                esValido: false,
                mensajeError: 'Se requiere una cabecera x-session-id válida.'
            };
        }

        const idNumerico = Number(productoId);
        if (!productoId || Number.isNaN(idNumerico) || idNumerico <= 0) {
            return {
                esValido: false,
                mensajeError: 'El identificador del producto es requerido y debe ser positivo.'
            };
        }

        const cantidadNumerica = Number(cantidad !== undefined ? cantidad : 1);
        if (Number.isNaN(cantidadNumerica) || cantidadNumerica <= 0) {
            return {
                esValido: false,
                mensajeError: 'La cantidad debe ser un número entero mayor a 0.'
            };
        }

        return {
            esValido: true,
            datosLimpios: {
                sessionId: sessionId.trim(),
                productoId: idNumerico,
                cantidad: Math.floor(cantidadNumerica)
            }
        };
    }

    static validarEliminarItem(idItem, sessionId) {
        if (!sessionId || typeof sessionId !== 'string') {
            return { esValido: false, mensajeError: 'Falta cabecera x-session-id.' };
        }
        const idNumerico = Number(idItem);
        if (!idItem || Number.isNaN(idNumerico) || idNumerico <= 0) {
            return { esValido: false, mensajeError: 'Identificador de ítem inválido.' };
        }
        return { esValido: true, idItemNumerico: idNumerico, sessionId: sessionId.trim() };
    }
}

module.exports = ValidadorOperacionesCarrito;
