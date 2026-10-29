'use strict';

const crypto = require('crypto');

class ValidadorIdentificadorSesionHttp {
    static asegurarSesionPresente(req, res, next) {
        let identificadorSesion = req.headers['x-session-id'];
        if (!identificadorSesion || typeof identificadorSesion !== 'string' || identificadorSesion.trim() === '') {
            identificadorSesion = crypto.randomUUID();
            req.headers['x-session-id'] = identificadorSesion;
        }
        res.setHeader('x-session-id', identificadorSesion);
        next();
    }
}

module.exports = ValidadorIdentificadorSesionHttp;
