// Servicio gestor de productos - Maneja operaciones con productos
class GestorProductos {
    constructor() {
        // Productos de ejemplo (en producción vendría de una base de datos)
        this.productos = [
            {
                id: '1',
                nombre: 'Laptop Dell XPS 13',
                descripcion: 'Laptop ultradelgada con procesador Intel i7',
                precio: 1299.99,
                precioAnterior: 1499.99,
                categoria: 'electrónica',
                imagen: '/publico/imagenes/laptop.jpg',
                stock: 15
            },
            {
                id: '2',
                nombre: 'Mouse Logitech MX Master 3',
                descripcion: 'Mouse ergonómico inalámbrico de precisión',
                precio: 99.99,
                categoria: 'accesorios',
                imagen: '/publico/imagenes/mouse.jpg',
                stock: 30
            },
            {
                id: '3',
                nombre: 'Teclado Mecánico RGB',
                descripcion: 'Teclado gaming con switches mecánicos',
                precio: 149.99,
                precioAnterior: 199.99,
                categoria: 'accesorios',
                imagen: '/publico/imagenes/teclado.jpg',
                stock: 20
            }
        ];
    }

    /**
     * Obtiene todos los productos
     * @returns {Promise<Array>} Lista de productos
     */
    async obtenerTodos() {
        return [...this.productos];
    }

    /**
     * Obtiene un producto por ID
     * @param {string} id - ID del producto
     * @returns {Promise<object|null>} Producto encontrado o null
     */
    async obtenerPorId(id) {
        return this.productos.find(p => p.id === id) || null;
    }

    /**
     * Busca productos por término
     * @param {string} termino - Término de búsqueda
     * @returns {Promise<Array>} Productos encontrados
     */
    async buscar(termino) {
        const terminoNormalizado = termino.toLowerCase();
        return this.productos.filter(p => 
            p.nombre.toLowerCase().includes(terminoNormalizado) ||
            p.descripcion.toLowerCase().includes(terminoNormalizado)
        );
    }

    /**
     * Obtiene productos por categoría
     * @param {string} categoria - Categoría de productos
     * @returns {Promise<Array>} Productos de la categoría
     */
    async obtenerPorCategoria(categoria) {
        const categoriaNormalizada = categoria.toLowerCase();
        return this.productos.filter(p => 
            p.categoria.toLowerCase() === categoriaNormalizada
        );
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
