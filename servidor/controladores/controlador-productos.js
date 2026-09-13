const servicioProductos = require('../servicios/servicio-productos');

class ControladorProductos {
    
    async obtenerTodos(req, res, next) {
        try {
            const productos = await servicioProductos.obtenerTodos();
            res.json(productos);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorId(req, res, next) {
        try {
            const { id } = req.params;
            const producto = await servicioProductos.obtenerPorId(id);
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

            const productos = await servicioProductos.buscar(q);
            res.json(productos);
        } catch (error) {
            next(error);
        }
    }

    async obtenerPorCategoria(req, res, next) {
        try {
            const { categoria } = req.params;
            const productos = await servicioProductos.obtenerPorCategoria(categoria);
            res.json(productos);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ControladorProductos();
