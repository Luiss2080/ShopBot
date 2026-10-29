'use strict';

const RepositorioProductosSequelize = require('../repositorios/RepositorioProductosSequelize');

class ServicioGestionProductos {
    constructor(repositorioProductos = new RepositorioProductosSequelize()) {
        this.repositorioProductos = repositorioProductos;
    }

    async listarCatalogoCompleto() {
        return await this.repositorioProductos.obtenerTodos();
    }

    async obtenerDetalleProducto(idProducto) {
        const productoEncontrado = await this.repositorioProductos.obtenerPorId(idProducto);
        if (!productoEncontrado) {
            const error = new Error(`El producto con ID ${idProducto} no fue encontrado.`);
            error.codigoHttp = 404;
            throw error;
        }
        return productoEncontrado;
    }

    async buscarProductosPorCoincidencia(termino) {
        return await this.repositorioProductos.buscarPorTermino(termino);
    }

    async filtrarPorCategoria(nombreCategoria) {
        return await this.repositorioProductos.obtenerPorCategoria(nombreCategoria);
    }

    async obtenerMuestraProductosChat(limite = 5) {
        return await this.repositorioProductos.obtenerDestacados(limite);
    }
}

module.exports = ServicioGestionProductos;

