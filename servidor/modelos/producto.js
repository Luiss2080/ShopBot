// Modelo de Producto
class Producto {
    constructor(datos) {
        this.id = datos.id || null;
        this.nombre = datos.nombre || '';
        this.descripcion = datos.descripcion || '';
        this.precio = datos.precio || 0;
        this.precioAnterior = datos.precioAnterior || null;
        this.categoria = datos.categoria || '';
        this.imagen = datos.imagen || '';
        this.stock = datos.stock || 0;
        this.activo = datos.activo !== undefined ? datos.activo : true;
    }

    /**
     * Verifica si el producto está disponible
     * @returns {boolean}
     */
    estaDisponible() {
        return this.activo && this.stock > 0;
    }

    /**
     * Calcula el descuento si existe precio anterior
     * @returns {number} Porcentaje de descuento
     */
    calcularDescuento() {
        if (!this.precioAnterior || this.precioAnterior <= this.precio) {
            return 0;
        }
        return Math.round(((this.precioAnterior - this.precio) / this.precioAnterior) * 100);
    }

    /**
     * Convierte el producto a objeto simple
     * @returns {object}
     */
    toJSON() {
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            precioAnterior: this.precioAnterior,
            categoria: this.categoria,
            imagen: this.imagen,
            stock: this.stock,
            activo: this.activo,
            descuento: this.calcularDescuento()
        };
    }
}

module.exports = Producto;
