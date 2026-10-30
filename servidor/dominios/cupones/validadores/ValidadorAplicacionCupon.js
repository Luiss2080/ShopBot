'use strict';

class ValidadorAplicacionCupon {
    static validarSolicitudCupon({ codigo, montoTotal }) {
        if (!codigo || typeof codigo !== 'string' || codigo.trim().length < 3) {
            return {
                esValido: false,
                mensajeError: 'El código de cupón proporcionado no es válido o está vacío.'
            };
        }

        const montoNumerico = Number(montoTotal);
        if (isNaN(montoNumerico) || montoNumerico < 0) {
            return {
                esValido: false,
                mensajeError: 'El monto total para validar el cupón debe ser un número mayor o igual a cero.'
            };
        }

        return {
            esValido: true,
            datosLimpios: {
                codigo: codigo.trim().toUpperCase(),
                montoTotal: montoNumerico
            }
        };
    }
}

module.exports = ValidadorAplicacionCupon;
