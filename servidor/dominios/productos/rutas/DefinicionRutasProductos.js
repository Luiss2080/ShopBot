'use strict';

const express = require('express');
const ControladorEndpointsProductos = require('../controladores/ControladorEndpointsProductos');

function crearEnrutadorProductos(controlador = new ControladorEndpointsProductos()) {
    const enrutador = express.Router();

    enrutador.get('/', controlador.obtenerTodos);
    enrutador.get('/buscar', controlador.buscar);
    enrutador.get('/categoria/:categoria', controlador.obtenerPorCategoria);
    enrutador.get('/:id', controlador.obtenerPorId);

    return enrutador;
}

module.exports = crearEnrutadorProductos;
