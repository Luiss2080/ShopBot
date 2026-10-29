'use strict';

const express = require('express');
const ControladorEndpointsCarrito = require('../controladores/ControladorEndpointsCarrito');

function crearEnrutadorCarrito(controlador = new ControladorEndpointsCarrito()) {
    const enrutador = express.Router();

    enrutador.get('/', controlador.obtenerCarrito);
    enrutador.post('/', controlador.agregarProducto);
    enrutador.delete('/:itemId', controlador.eliminarProducto);

    return enrutador;
}

module.exports = crearEnrutadorCarrito;

