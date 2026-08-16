const db = require('../modelos/db');
const { v4: uuidv4 } = require('uuid');

class ControladorCarrito {
    
    // Obtener carrito por sessionId
    async obtenerCarrito(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            if (!sessionId) {
                return res.status(400).json({ error: 'Falta x-session-id' });
            }

            // JOIN con productos para traer la información
            const query = `
                SELECT c.id as itemId, c.cantidad, p.* 
                FROM carrito c 
                JOIN productos p ON c.productoId = p.id 
                WHERE c.sessionId = ?
            `;
            const items = await db.all(query, [sessionId]);
            
            res.json({
                items,
                total: items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
            });
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
            const producto = await db.get("SELECT * FROM productos WHERE id = ?", [productoId]);
            if (!producto) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            // Ver si ya está en el carrito
            const existente = await db.get(
                "SELECT * FROM carrito WHERE sessionId = ? AND productoId = ?", 
                [sessionId, productoId]
            );

            if (existente) {
                await db.run(
                    "UPDATE carrito SET cantidad = cantidad + ? WHERE id = ?",
                    [cantidad, existente.id]
                );
            } else {
                const itemId = uuidv4();
                await db.run(
                    "INSERT INTO carrito (id, sessionId, productoId, cantidad) VALUES (?, ?, ?, ?)",
                    [itemId, sessionId, productoId, cantidad]
                );
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

            await db.run("DELETE FROM carrito WHERE id = ? AND sessionId = ?", [itemId, sessionId]);
            
            res.json({ mensaje: 'Producto eliminado del carrito' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ControladorCarrito();
