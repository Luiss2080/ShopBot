const { Producto } = require('../models');
const { Op } = require('sequelize');

class ServicioProductos {
    async obtenerTodos() {
        return await Producto.findAll();
    }

    async obtenerPorId(id) {
        return await Producto.findByPk(id);
    }

    async buscar(q) {
        return await Producto.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${q}%` } },
                    { descripcion: { [Op.like]: `%${q}%` } }
                ]
            }
        });
    }

    async obtenerPorCategoria(categoria) {
        return await Producto.findAll({
            where: {
                categoria: {
                    [Op.like]: categoria
                }
            }
        });
    }
}

module.exports = new ServicioProductos();
