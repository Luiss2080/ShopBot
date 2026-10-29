'use strict';

const { Op } = require('sequelize');
const ModeloProductoSequelize = require('../modelos/ModeloProductoSequelize');

class RepositorioProductosSequelize {
    constructor(modelo = ModeloProductoSequelize) {
        this.modelo = modelo;
    }

    async obtenerTodos() {
        return await this.modelo.findAll({
            order: [['id', 'ASC']]
        });
    }

    async obtenerPorId(idProducto) {
        return await this.modelo.findByPk(idProducto);
    }

    async buscarPorTermino(terminoBusqueda) {
        return await this.modelo.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${terminoBusqueda}%` } },
                    { descripcion: { [Op.like]: `%${terminoBusqueda}%` } }
                ]
            }
        });
    }

    async obtenerPorCategoria(nombreCategoria) {
        return await this.modelo.findAll({
            where: {
                categoria: {
                    [Op.like]: nombreCategoria
                }
            }
        });
    }

    async obtenerDestacados(limite = 5) {
        return await this.modelo.findAll({
            limit: limite,
            order: [['createdAt', 'DESC']]
        });
    }
}

module.exports = RepositorioProductosSequelize;
