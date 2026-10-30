'use strict';

const express = require('express');
const ControladorEndpointsOrdenes = require('../controladores/ControladorEndpointsOrdenes');

function crearEnrutadorOrdenes(controlador = new ControladorEndpointsOrdenes()) {
    const enrutador = express.Router();

    enrutador.post('/', controlador.crearOrden);
    enrutador.get('/historial', controlador.obtenerHistorialSesion);
    enrutador.get('/:numeroOrden', controlador.obtenerPorNumero);

    return enrutador;
}

module.exports = crearEnrutadorOrdenes;
