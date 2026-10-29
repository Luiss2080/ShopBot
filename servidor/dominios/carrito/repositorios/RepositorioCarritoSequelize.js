'use strict';

const ModeloCarritoSequelize = require('../modelos/ModeloCarritoSequelize');
const ModeloProductoSequelize = require('../../productos/modelos/ModeloProductoSequelize');

class RepositorioCarritoSequelize {
    constructor(modeloCarrito = ModeloCarritoSequelize) {
        this.modeloCarrito = modeloCarrito;
    }

    async obtenerPorSesionConProductos(sessionId) {
        return await this.modeloCarrito.findAll({
            where: { sessionId },
            include: [{
                model: ModeloProductoSequelize,
                as: 'producto'
            }]
        });
    }

    async buscarItemPorSesionYProducto(sessionId, productoId) {
        return await this.modeloCarrito.findOne({
            where: { sessionId, productoId }
        });
    }

    async crearItem(datosItem) {
        return await this.modeloCarrito.create(datosItem);
    }

    async actualizarCantidad(idItem, nuevaCantidad) {
        return await this.modeloCarrito.update(
            { cantidad: nuevaCantidad },
            { where: { id: idItem } }
        );
    }

    async eliminarPorIdYSesion(idItem, sessionId) {
        return await this.modeloCarrito.destroy({
            where: { id: idItem, sessionId }
        });
    }

    async vaciarCarritoSesion(sessionId) {
        return await this.modeloCarrito.destroy({
            where: { sessionId }
        });
    }
}

module.exports = RepositorioCarritoSequelize;

