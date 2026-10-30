'use strict';

const crypto = require('crypto');

class ServicioCriptografiaContrasenas {
    static generarSalAleatoria() {
        return crypto.randomBytes(16).toString('hex');
    }

    static hashearContrasena(contrasenaPlana, sal) {
        const bufferHash = crypto.scryptSync(contrasenaPlana, sal, 64);
        return bufferHash.toString('hex');
    }

    static verificarContrasena(contrasenaIngresada, hashEsperado, sal) {
        const bufferHashIngresado = crypto.scryptSync(contrasenaIngresada, sal, 64);
        const bufferHashEsperado = Buffer.from(hashEsperado, 'hex');

        if (bufferHashIngresado.length !== bufferHashEsperado.length) {
            return false;
        }

        return crypto.timingSafeEqual(bufferHashIngresado, bufferHashEsperado);
    }
}

module.exports = ServicioCriptografiaContrasenas;
