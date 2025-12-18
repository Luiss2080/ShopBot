// Componente de tarjeta de producto
class TarjetaProducto {
    constructor(datosProducto) {
        this.datos = datosProducto;
    }

    renderizar() {
        const plantilla = `
            <div class="tarjeta-producto" data-id="${this.datos.id}">
                <div class="imagen-producto">
                    <img src="${this.datos.imagen}" alt="${this.datos.nombre}">
                </div>
                <div class="detalles-producto">
                    <h3 class="nombre-producto">${this.datos.nombre}</h3>
                    <p class="descripcion-producto">${this.datos.descripcion}</p>
                    <div class="precio-producto">
                        <span class="precio-actual">${Formateador.formatearPrecio(this.datos.precio)}</span>
                        ${this.datos.precioAnterior ? 
                            `<span class="precio-anterior">${Formateador.formatearPrecio(this.datos.precioAnterior)}</span>` 
                            : ''}
                    </div>
                    <button class="boton-agregar-carrito" data-id="${this.datos.id}">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `;
        
        return plantilla;
    }

    agregarEventos(elemento) {
        const boton = elemento.querySelector('.boton-agregar-carrito');
        boton.addEventListener('click', () => {
            this.agregarAlCarrito();
        });
    }

    agregarAlCarrito() {
        // Emitir evento personalizado
        const evento = new CustomEvent('producto-agregado', {
            detail: this.datos
        });
        window.dispatchEvent(evento);
    }
}

window.TarjetaProducto = TarjetaProducto;
