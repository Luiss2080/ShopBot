const express = require('express');
const enrutador = express.Router();
const controladorCarrito = require('../controladores/controlador-carrito');

// Rutas de carrito
enrutador.get('/', controladorCarrito.obtenerCarrito.bind(controladorCarrito));
enrutador.post('/', controladorCarrito.agregarProducto.bind(controladorCarrito));
enrutador.delete('/:itemId', controladorCarrito.eliminarProducto.bind(controladorCarrito));

module.exports = enrutador;
