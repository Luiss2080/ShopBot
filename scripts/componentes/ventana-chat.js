// Componente de la ventana de chat
class VentanaChat {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.areaMensajes = null;
        this.campoEntrada = null;
        this.botonEnviar = null;
        this.mensajes = [];
        
        this.inicializar();
    }

    async inicializar() {
        await this.cargarHTML();
        this.configurarEventos();
        this.cargarHistorial();
    }

    async cargarHTML() {
        await CargadorComponentes.cargarComponente(
            '/vistas/componentes/ventana-chat.html',
            `#${this.contenedor.id}`
        );
        
        this.areaMensajes = document.getElementById('area-mensajes');
        this.campoEntrada = document.getElementById('entrada-mensaje');
        this.botonEnviar = document.getElementById('boton-enviar');
    }

    configurarEventos() {
        this.botonEnviar.addEventListener('click', () => this.enviarMensaje());
        
        this.campoEntrada.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.enviarMensaje();
            }
        });
    }

    enviarMensaje() {
        const texto = this.campoEntrada.value.trim();
        
        if (!Validador.esTextoValido(texto)) {
            return;
        }

        this.agregarMensaje(texto, 'usuario');
        this.campoEntrada.value = '';
        
        // Simular respuesta del bot
        setTimeout(() => {
            this.procesarRespuestaBot(texto);
        }, 500);
    }

    agregarMensaje(texto, tipo) {
        const mensaje = {
            texto,
            tipo,
            hora: new Date()
        };

        this.mensajes.push(mensaje);
        this.renderizarMensaje(mensaje);
        this.desplazarAbajo();
        this.guardarHistorial();
    }

    renderizarMensaje(mensaje) {
        const elementoMensaje = document.createElement('div');
        elementoMensaje.className = `mensaje ${mensaje.tipo}`;
        
        const horaFormateada = Formateador.formatearHora(mensaje.hora);
        
        elementoMensaje.innerHTML = `
            <div class="icono-mensaje">
                <img src="/publico/iconos/${mensaje.tipo}.svg" alt="${mensaje.tipo}">
            </div>
            <div class="contenido-mensaje">
                <p class="texto-mensaje">${mensaje.texto}</p>
                <span class="hora-mensaje">${horaFormateada}</span>
            </div>
        `;
        
        this.areaMensajes.appendChild(elementoMensaje);
    }

    procesarRespuestaBot(mensajeUsuario) {
        // Lógica simple de respuesta
        const respuesta = this.generarRespuesta(mensajeUsuario);
        this.agregarMensaje(respuesta, 'bot');
    }

    generarRespuesta(mensaje) {
        const mensajeLower = mensaje.toLowerCase();
        
        if (mensajeLower.includes('hola') || mensajeLower.includes('buenos')) {
            return '¡Hola! ¿En qué puedo ayudarte hoy?';
        } else if (mensajeLower.includes('precio') || mensajeLower.includes('costo')) {
            return 'Puedo ayudarte con información sobre precios. ¿Qué producto te interesa?';
        } else if (mensajeLower.includes('producto')) {
            return 'Tenemos una amplia variedad de productos. ¿Buscas algo específico?';
        } else {
            return 'Entiendo. ¿Puedes darme más detalles para ayudarte mejor?';
        }
    }

    desplazarAbajo() {
        this.areaMensajes.scrollTop = this.areaMensajes.scrollHeight;
    }

    guardarHistorial() {
        AlmacenamientoLocal.guardar('historial-chat', this.mensajes);
    }

    cargarHistorial() {
        const historial = AlmacenamientoLocal.obtener('historial-chat');
        if (historial && Array.isArray(historial)) {
            this.mensajes = historial.map(m => ({
                ...m,
                hora: new Date(m.hora)
            }));
            this.mensajes.forEach(m => this.renderizarMensaje(m));
        }
    }

    limpiarChat() {
        this.mensajes = [];
        this.areaMensajes.innerHTML = '';
        this.guardarHistorial();
    }
}

window.VentanaChat = VentanaChat;
