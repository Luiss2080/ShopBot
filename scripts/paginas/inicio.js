// Script principal de la página de inicio
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar componentes comunes
    await CargadorComponentes.cargarMultiplesComponentes([
        { ruta: '/vistas/componentes/encabezado.html', selector: '#contenedor-encabezado' },
        { ruta: '/vistas/componentes/pie-pagina.html', selector: '#contenedor-pie-pagina' }
    ]);

    // Marcar enlace activo
    marcarEnlaceActivo('inicio');

    // Cargar productos destacados
    await cargarProductosDestacados();
});

function marcarEnlaceActivo(pagina) {
    const enlaces = document.querySelectorAll('.enlace-navegacion');
    enlaces.forEach(enlace => {
        if (enlace.textContent.toLowerCase().includes(pagina)) {
            enlace.classList.add('activo');
        }
    });
}

async function cargarProductosDestacados() {
    try {
        const productos = await ServicioProductos.obtenerTodos();
        // Mostrar los primeros 6 productos
        const productosDestacados = productos.slice(0, 6);
        mostrarProductos(productosDestacados);
    } catch (error) {
        console.error('Error al cargar productos destacados:', error);
    }
}

function mostrarProductos(productos) {
    const contenedor = document.querySelector('.seccion-bienvenida');
    
    const contenedorProductos = document.createElement('div');
    contenedorProductos.className = 'grid-productos';
    contenedorProductos.style.display = 'grid';
    contenedorProductos.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
    contenedorProductos.style.gap = '1rem';
    contenedorProductos.style.marginTop = '2rem';
    
    productos.forEach(producto => {
        const tarjeta = new TarjetaProducto(producto);
        const div = document.createElement('div');
        div.innerHTML = tarjeta.renderizar();
        tarjeta.agregarEventos(div.firstElementChild);
        contenedorProductos.appendChild(div.firstElementChild);
    });
    
    contenedor.appendChild(contenedorProductos);
}
