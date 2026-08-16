const { Producto } = require('../models');
const { Op } = require('sequelize');

class ControladorProductos {
    
    async obtenerTodos(req, res, next) {
        try {
            const productos = await Producto.findAll();
            res.json(productos);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req, res, next) {
        try {
            const { id } = req.params;
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.json(producto);
        } catch (error) {
            next(error);
        }
    }

    async buscar(req, res, next) {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ error: 'Debe proporcionar un término de búsqueda' });
            }

            const productos = await Producto.findAll({
                where: {
                    [Op.or]: [
                        { nombre: { [Op.like]: `%${q}%` } },
                        { descripcion: { [Op.like]: `%${q}%` } }
                    ]
                }
            });
            res.json(productos);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorCategoria(req, res, next) {
        try {
            const { categoria } = req.params;
            const productos = await Producto.findAll({
                where: {
                    categoria: {
                        [Op.like]: categoria
                    }
                }
            });
            res.json(productos);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ControladorProductos();
