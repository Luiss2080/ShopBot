// Servicio gestor de productos - Maneja operaciones con productos conectando a SQLite
const db = require('../modelos/db');

class GestorProductos {
    /**
     * Obtiene todos los productos
     * @returns {Promise<Array>} Lista de productos
     */
    async obtenerTodos() {
        return await db.all("SELECT * FROM productos");
    }

    /**
     * Obtiene un producto por ID
     * @param {string} id - ID del producto
     * @returns {Promise<object|null>} Producto encontrado o null
     */
    async obtenerPorId(id) {
        const producto = await db.get("SELECT * FROM productos WHERE id = ?", [id]);
        return producto || null;
    }

    /**
     * Busca productos por término
     * @param {string} termino - Término de búsqueda
     * @returns {Promise<Array>} Productos encontrados
     */
    async buscar(termino) {
        const query = `%${termino}%`;
        return await db.all("SELECT * FROM productos WHERE nombre LIKE ? OR descripcion LIKE ?", [query, query]);
    }

    /**
     * Obtiene productos por categoría
     * @param {string} categoria - Categoría de productos
     * @returns {Promise<Array>} Productos de la categoría
     */
    async obtenerPorCategoria(categoria) {
        return await db.all("SELECT * FROM productos WHERE LOWER(categoria) = LOWER(?)", [categoria]);
    }

    /**
     * Verifica disponibilidad de un producto
     * @param {string} id - ID del producto
     * @returns {Promise<boolean>} True si hay stock
     */
    async verificarDisponibilidad(id) {
        const producto = await this.obtenerPorId(id);
        return producto ? producto.stock > 0 : false;
    }
}

module.exports = new GestorProductos();
