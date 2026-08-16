const { Carrito, Producto } = require('../models');

class ControladorCarrito {
    
    // Obtener carrito por sessionId
    async obtenerCarrito(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            if (!sessionId) {
                return res.status(400).json({ error: 'Falta x-session-id' });
            }

            // JOIN manual ya que definimos los modelos independientemente o usar belongsTo
            // Como Sequelize no sabe la relación sin associate, lo hacemos con consultas anidadas
            const cartItems = await Carrito.findAll({ where: { sessionId } });
            
            let total = 0;
            const items = await Promise.all(cartItems.map(async (item) => {
                const producto = await Producto.findByPk(item.productoId);
                const info = producto ? producto.toJSON() : {};
                total += (info.precio || 0) * item.cantidad;
                return {
                    itemId: item.id,
                    cantidad: item.cantidad,
                    ...info
                };
            }));
            
            res.json({ items, total });
        } catch (error) {
            next(error);
        }
    }

    // Agregar producto al carrito
    async agregarProducto(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            const { productoId, cantidad = 1 } = req.body;

            if (!sessionId || !productoId) {
                return res.status(400).json({ error: 'Faltan datos requeridos (sessionId, productoId)' });
            }

            // Verificar que producto existe y hay stock
            const producto = await Producto.findByPk(productoId);
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            // Ver si ya está en el carrito
            const existente = await Carrito.findOne({ 
                where: { sessionId, productoId }
            });

            if (existente) {
                existente.cantidad += cantidad;
                await existente.save();
            } else {
                await Carrito.create({
                    sessionId,
                    productoId,
                    cantidad
                });
            }

            res.status(201).json({ mensaje: 'Producto agregado al carrito exitosamente' });
        } catch (error) {
            next(error);
        }
    }

    // Eliminar producto del carrito
    async eliminarProducto(req, res, next) {
        try {
            const { itemId } = req.params;
            const sessionId = req.headers['x-session-id'];

            if (!sessionId) {
                return res.status(400).json({ error: 'Falta x-session-id' });
            }

            await Carrito.destroy({
                where: { id: itemId, sessionId }
            });
            
            res.json({ mensaje: 'Producto eliminado del carrito' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ControladorCarrito();
