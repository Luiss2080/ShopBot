'use strict';

class ValidadorCreacionOrden {
    static validarDatosCheckout({ sessionId, nombreCliente, telefonoCliente, direccionEnvio }) {
        if (!sessionId || typeof sessionId !== 'string' || sessionId.trim().length === 0) {
            return {
                esValido: false,
                mensajeError: 'Identificador de sesión (x-session-id) no válido o ausente.'
            };
        }

        if (!nombreCliente || typeof nombreCliente !== 'string' || nombreCliente.trim().length < 3) {
            return {
                esValido: false,
                mensajeError: 'El nombre completo es requerido y debe tener al menos 3 caracteres.'
            };
        }

        if (!telefonoCliente || typeof telefonoCliente !== 'string' || telefonoCliente.trim().length < 7) {
            return {
                esValido: false,
                mensajeError: 'El teléfono es requerido y debe tener al menos 7 dígitos.'
            };
        }

        if (!direccionEnvio || typeof direccionEnvio !== 'string' || direccionEnvio.trim().length < 5) {
            return {
                esValido: false,
                mensajeError: 'La dirección de envío es requerida y debe tener al menos 5 caracteres.'
            };
        }

        return {
            esValido: true,
            datosLimpios: {
                sessionId: sessionId.trim(),
                nombreCliente: nombreCliente.trim(),
                telefonoCliente: telefonoCliente.trim(),
                direccionEnvio: direccionEnvio.trim()
            }
        };
    }
}

module.exports = ValidadorCreacionOrden;
