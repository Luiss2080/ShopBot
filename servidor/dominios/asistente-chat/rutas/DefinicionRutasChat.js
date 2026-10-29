'use strict';

const express = require('express');
const ControladorEndpointsChat = require('../controladores/ControladorEndpointsChat');

function crearEnrutadorChat(controlador = new ControladorEndpointsChat()) {
    const enrutador = express.Router();

    enrutador.post('/mensaje', controlador.procesarMensaje);
    enrutador.get('/historial', controlador.obtenerHistorial);
    enrutador.delete('/historial', controlador.limpiarHistorial);

    return enrutador;
}

module.exports = crearEnrutadorChat;
