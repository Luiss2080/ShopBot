'use strict';

const RepositorioCarritoSequelize = require('../repositorios/RepositorioCarritoSequelize');
const RepositorioProductosSequelize = require('../../productos/repositorios/RepositorioProductosSequelize');

class ServicioGestionCarrito {
    constructor(
        repositorioCarrito = new RepositorioCarritoSequelize(),
        repositorioProductos = new RepositorioProductosSequelize()
    ) {
        this.repositorioCarrito = repositorioCarrito;
        this.repositorioProductos = repositorioProductos;
    }

    async obtenerResumenCarrito(sessionId) {
        const registros = await this.repositorioCarrito.obtenerPorSesionConProductos(sessionId);
        
        let totalGeneral = 0;
        const itemsFormateados = registros.map(registro => {
            const infoProducto = registro.producto ? registro.producto.toJSON() : {};
            const subtotal = (infoProducto.precio || 0) * registro.cantidad;
            totalGeneral += subtotal;

            return {
                itemId: registro.id,
                cantidad: registro.cantidad,
                subtotal: Number(subtotal.toFixed(2)),
                ...infoProducto
            };
        });

        return {
            items: itemsFormateados,
            total: Number(totalGeneral.toFixed(2)),
            cantidadTotalArticulos: itemsFormateados.reduce((acc, curr) => acc + curr.cantidad, 0)
        };
    }

    async agregarOActualizarProducto(sessionId, productoId, cantidad) {
        const productoExiste = await this.repositorioProductos.obtenerPorId(productoId);
        if (!productoExiste) {
            const error = new Error('El producto no existe.');
            error.codigoHttp = 404;
            throw error;
        }

        const itemExistente = await this.repositorioCarrito.buscarItemPorSesionYProducto(sessionId, productoId);

        if (itemExistente) {
            const nuevaCantidad = itemExistente.cantidad + cantidad;
            await this.repositorioCarrito.actualizarCantidad(itemExistente.id, nuevaCantidad);
            return { itemId: itemExistente.id, cantidad: nuevaCantidad, actualizado: true };
        }

        const nuevoItem = await this.repositorioCarrito.crearItem({
            sessionId,
            productoId,
            cantidad
        });

        return { itemId: nuevoItem.id, cantidad, creado: true };
    }

    async eliminarProducto(itemId, sessionId) {
        return await this.repositorioCarrito.eliminarPorIdYSesion(itemId, sessionId);
    }
}

module.exports = ServicioGestionCarrito;

