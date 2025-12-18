// Script principal de la página de chat
let ventanaChat;

document.addEventListener('DOMContentLoaded', async () => {
    // Cargar componentes comunes
    await CargadorComponentes.cargarMultiplesComponentes([
        { ruta: '/vistas/componentes/encabezado.html', selector: '#contenedor-encabezado' }
    ]);

    // Marcar enlace activo
    marcarEnlaceActivo('chat');

    // Inicializar ventana de chat
    ventanaChat = new VentanaChat('contenedor-chat');
});

function marcarEnlaceActivo(pagina) {
    const enlaces = document.querySelectorAll('.enlace-navegacion');
    enlaces.forEach(enlace => {
        if (enlace.textContent.toLowerCase().includes(pagina)) {
            enlace.classList.add('activo');
        }
    });
}
