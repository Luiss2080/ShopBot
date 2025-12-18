// Servicio de productos
class ServicioProductos {
    constructor() {
        this.api = window.ServicioAPI;
    }

    /**
     * Obtiene todos los productos
     * @returns {Promise}
     */
    async obtenerTodos() {
        try {
            return await this.api.obtener('/productos');
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    }

    /**
     * Obtiene un producto por ID
     * @param {string} id - ID del producto
     * @returns {Promise}
     */
    async obtenerPorId(id) {
        try {
            return await this.api.obtener(`/productos/${id}`);
        } catch (error) {
            console.error('Error al obtener producto:', error);
            return null;
        }
    }

    /**
     * Busca productos por término
     * @param {string} termino - Término de búsqueda
     * @returns {Promise}
     */
    async buscar(termino) {
        try {
            return await this.api.obtener(`/productos/buscar?q=${encodeURIComponent(termino)}`);
        } catch (error) {
            console.error('Error al buscar productos:', error);
            return [];
        }
    }

    /**
     * Obtiene productos por categoría
     * @param {string} categoria - Categoría de productos
     * @returns {Promise}
     */
    async obtenerPorCategoria(categoria) {
        try {
            return await this.api.obtener(`/productos/categoria/${categoria}`);
        } catch (error) {
            console.error('Error al obtener productos por categoría:', error);
            return [];
        }
    }
}

window.ServicioProductos = new ServicioProductos();
