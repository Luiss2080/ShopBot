// Servicio del carrito para frontend
class ServicioCarrito {
    constructor() {
        this.api = window.ServicioAPI;
        this.items = [];
        this.total = 0;
    }

    async cargarCarrito() {
        try {
            const data = await this.api.obtener('/carrito');
            this.items = data.items;
            this.total = data.total;
            this.actualizarUI();
            return data;
        } catch (error) {
            console.error('Error al cargar carrito:', error);
            return { items: [], total: 0 };
        }
    }

    async agregarProducto(productoId, cantidad = 1) {
        try {
            const res = await this.api.enviar('/carrito', { productoId, cantidad });
            await this.cargarCarrito();
            return res;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw error;
        }
    }

    async eliminarProducto(itemId) {
        try {
            const res = await this.api.eliminar(`/carrito/${itemId}`);
            await this.cargarCarrito();
            return res;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }

    actualizarUI() {
        const contenedorCarrito = document.getElementById('widget-carrito');
        if (!contenedorCarrito) return;
        
        if (this.items.length === 0) {
            contenedorCarrito.innerHTML = '<div class="carrito-vacio">El carrito está vacío</div>';
            return;
        }

        let html = '<div class="carrito-items">';
        this.items.forEach(item => {
            html += `
                <div class="carrito-item">
                    <span>${item.nombre} (x${item.cantidad})</span>
                    <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
                </div>
            `;
        });
        html += `</div><div class="carrito-total"><strong>Total:</strong> $${this.total.toFixed(2)}</div>`;
        html += '<button class="boton boton-pagar">Proceder al pago</button>';
        
        contenedorCarrito.innerHTML = html;
    }
}

window.ServicioCarrito = new ServicioCarrito();
