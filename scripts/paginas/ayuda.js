// Script principal de la página de ayuda
document.addEventListener('DOMContentLoaded', async () => {
    // Cargar componentes comunes
    await CargadorComponentes.cargarMultiplesComponentes([
        { ruta: '/vistas/componentes/encabezado.html', selector: '#contenedor-encabezado' },
        { ruta: '/vistas/componentes/pie-pagina.html', selector: '#contenedor-pie-pagina' }
    ]);

    // Marcar enlace activo
    marcarEnlaceActivo('ayuda');

    // Cargar preguntas frecuentes
    cargarPreguntasFrecuentes();
});

function marcarEnlaceActivo(pagina) {
    const enlaces = document.querySelectorAll('.enlace-navegacion');
    enlaces.forEach(enlace => {
        if (enlace.textContent.toLowerCase().includes(pagina)) {
            enlace.classList.add('activo');
        }
    });
}

function cargarPreguntasFrecuentes() {
    const preguntas = [
        {
            pregunta: '¿Cómo puedo usar el chatbot?',
            respuesta: 'Simplemente ve a la página de Chat y escribe tu pregunta. El asistente responderá automáticamente.'
        },
        {
            pregunta: '¿Qué tipo de preguntas puedo hacer?',
            respuesta: 'Puedes preguntar sobre productos, precios, disponibilidad, envíos y cualquier información relacionada con nuestra tienda.'
        },
        {
            pregunta: '¿El chatbot está disponible 24/7?',
            respuesta: 'Sí, nuestro asistente virtual está disponible las 24 horas del día, los 7 días de la semana.'
        },
        {
            pregunta: '¿Cómo puedo contactar a un humano?',
            respuesta: 'Si el chatbot no puede resolver tu consulta, puede transferirte a un agente humano durante nuestro horario de atención.'
        },
        {
            pregunta: '¿Se guarda mi historial de chat?',
            respuesta: 'Sí, tu historial se guarda localmente en tu navegador para tu conveniencia. Puedes limpiarlo en cualquier momento.'
        }
    ];

    const contenedor = document.getElementById('contenedor-preguntas-frecuentes');
    
    preguntas.forEach((item, index) => {
        const elementoPregunta = document.createElement('div');
        elementoPregunta.className = 'pregunta-frecuente';
        elementoPregunta.innerHTML = `
            <div class="titulo-pregunta">
                ${item.pregunta}
                <span class="icono-expandir">▼</span>
            </div>
            <div class="contenido-respuesta">
                ${item.respuesta}
            </div>
        `;
        
        const titulo = elementoPregunta.querySelector('.titulo-pregunta');
        titulo.addEventListener('click', () => {
            elementoPregunta.classList.toggle('activa');
        });
        
        contenedor.appendChild(elementoPregunta);
    });
}
