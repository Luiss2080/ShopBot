// Rutas de productos
const express = require('express');
const router = express.Router();
const controladorProductos = require('../controladores/controlador-productos');
const validadorSolicitud = require('../middlewares/validador-solicitud');

// GET /api/productos - Obtener todos los productos
router.get(
    '/',
    controladorProductos.obtenerTodos
);

// GET /api/productos/buscar?q=termino - Buscar productos
router.get(
    '/buscar',
    controladorProductos.buscar
);

// GET /api/productos/categoria/:categoria - Obtener por categoría
router.get(
    '/categoria/:categoria',
    controladorProductos.obtenerPorCategoria
);

// GET /api/productos/:id - Obtener producto por ID
router.get(
    '/:id',
    validadorSolicitud.validarId(),
    controladorProductos.obtenerPorId
);

module.exports = router;
