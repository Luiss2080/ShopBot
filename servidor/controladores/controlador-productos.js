// Controlador de productos - Maneja las solicitudes relacionadas con productos
const gestorProductos = require('../servicios/gestor-productos');

class ControladorProductos {
    /**
     * Obtiene todos los productos
     * @param {object} req - Request
     * @param {object} res - Response
     */
    async obtenerTodos(req, res) {
        try {
            const productos = await gestorProductos.obtenerTodos();
            res.json({
                exito: true,
                productos
            });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            res.status(500).json({
                exito: false,
                error: 'Error al obtener productos'
            });
        }
    }

    /**
     * Obtiene un producto por ID
     * @param {object} req - Request
     * @param {object} res - Response
     */
    async obtenerPorId(req, res) {
        try {
            const { id } = req.params;
            const producto = await gestorProductos.obtenerPorId(id);

            if (!producto) {
                return res.status(404).json({
                    exito: false,
                    error: 'Producto no encontrado'
                });
            }

            res.json({
                exito: true,
                producto
            });
        } catch (error) {
            console.error('Error al obtener producto:', error);
            res.status(500).json({
                exito: false,
                error: 'Error al obtener producto'
            });
        }
    }

    /**
     * Busca productos por término
     * @param {object} req - Request
     * @param {object} res - Response
     */
    async buscar(req, res) {
        try {
            const { q } = req.query;
            
            if (!q) {
                return res.status(400).json({
                    exito: false,
                    error: 'El término de búsqueda es requerido'
                });
            }

            const productos = await gestorProductos.buscar(q);
            res.json({
                exito: true,
                productos
            });
        } catch (error) {
            console.error('Error al buscar productos:', error);
            res.status(500).json({
                exito: false,
                error: 'Error al buscar productos'
            });
        }
    }

    /**
     * Obtiene productos por categoría
     * @param {object} req - Request
     * @param {object} res - Response
     */
    async obtenerPorCategoria(req, res) {
        try {
            const { categoria } = req.params;
            const productos = await gestorProductos.obtenerPorCategoria(categoria);
            
            res.json({
                exito: true,
                productos
            });
        } catch (error) {
            console.error('Error al obtener productos por categoría:', error);
            res.status(500).json({
                exito: false,
                error: 'Error al obtener productos'
            });
        }
    }
}

module.exports = new ControladorProductos();
