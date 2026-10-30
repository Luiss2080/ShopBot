'use strict';

const express = require('express');
const ControladorEndpointsCupones = require('../controladores/ControladorEndpointsCupones');

function crearEnrutadorCupones(controladorCupones = new ControladorEndpointsCupones()) {
    const enrutador = express.Router();

    enrutador.post('/validar', controladorCupones.validar);
    enrutador.get('/vigentes', controladorCupones.obtenerVigentes);

    return enrutador;
}

module.exports = crearEnrutadorCupones;

