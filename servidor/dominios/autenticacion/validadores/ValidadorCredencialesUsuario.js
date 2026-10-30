'use strict';

class ValidadorCredencialesUsuario {
    static esFormatoEmailValido(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return typeof email === 'string' && regexEmail.test(email.trim());
    }

    static validarRegistro({ nombre, email, password }) {
        if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
            return {
                esValido: false,
                mensajeError: 'El nombre es obligatorio y debe tener al menos 2 caracteres.'
            };
        }

        if (!this.esFormatoEmailValido(email)) {
            return {
                esValido: false,
                mensajeError: 'Debe proporcionar una dirección de correo electrónico válida.'
            };
        }

        if (!password || typeof password !== 'string' || password.length < 6) {
            return {
                esValido: false,
                mensajeError: 'La contraseña debe tener una longitud mínima de 6 caracteres.'
            };
        }

        return {
            esValido: true,
            datosLimpios: {
                nombre: nombre.trim(),
                email: email.trim().toLowerCase(),
                password
            }
        };
    }

    static validarInicioSesion({ email, password }) {
        if (!this.esFormatoEmailValido(email)) {
            return {
                esValido: false,
                mensajeError: 'El correo electrónico proporcionado no es válido.'
            };
        }

        if (!password || typeof password !== 'string' || password.length === 0) {
            return {
                esValido: false,
                mensajeError: 'Debe ingresar la contraseña.'
            };
        }

        return {
            esValido: true,
            datosLimpios: {
                email: email.trim().toLowerCase(),
                password
            }
        };
    }
}

module.exports = ValidadorCredencialesUsuario;
