'use strict';

const MensajesSistemaConversacional = require('../../../constantes/MensajesSistemaConversacional');
const ServicioGestionProductos = require('../../productos/servicios/ServicioGestionProductos');
const ServicioGestionCarrito = require('../../carrito/servicios/ServicioGestionCarrito');
const ServicioGestionOrdenes = require('../../ordenes/servicios/ServicioGestionOrdenes');

class GeneradorRespuestasContextuales {
    constructor(
        servicioProductos = new ServicioGestionProductos(),
        servicioCarrito = new ServicioGestionCarrito(),
        servicioOrdenes = new ServicioGestionOrdenes()
    ) {
        this.servicioProductos = servicioProductos;
        this.servicioCarrito = servicioCarrito;
        this.servicioOrdenes = servicioOrdenes;
    }

    async generarRespuesta(clasificacion, mensajeOriginal = '', sessionId = null) {
        const { intencion } = clasificacion;

        if (intencion === 'consulta_producto') {
            return await this._generarRespuestaCatalogoOProductos(mensajeOriginal);
        }

        if (intencion === 'consulta_precio') {
            return await this._generarRespuestaConsultaPrecio(mensajeOriginal);
        }

        if (intencion === 'agregar_carrito') {
            return await this._generarRespuestaAgregarCarrito(mensajeOriginal, sessionId);
        }

        if (intencion === 'seguimiento_orden') {
            return await this._generarRespuestaSeguimientoOrden(mensajeOriginal, sessionId);
        }

        if (intencion === 'saludo') {
            return {
                text: this.seleccionarAleatorio(MensajesSistemaConversacional.SALUDOS),
                options: ['Ver catálogo', 'Consultar ofertas'],
                products: null
            };
        }

        if (intencion === 'despedida') {
            return {
                text: this.seleccionarAleatorio(MensajesSistemaConversacional.DESPEDIDAS),
                options: null,
                products: null
            };
        }

        if (intencion === 'ver_carrito') {
            return {
                text: 'Puedes revisar el detalle de tus artículos en el icono del carrito arriba a la derecha.',
                options: ['Ir a pagar', 'Continuar comprando'],
                products: null
            };
        }

        return {
            text: this.seleccionarAleatorio(MensajesSistemaConversacional.FALLBACK_DESCONOCIDO),
            options: MensajesSistemaConversacional.OPCIONES_RAPIDAS_DEFECTO,
            products: null
        };
    }

    async _generarRespuestaCatalogoOProductos(mensajeOriginal) {
        const termino = this._extraerTerminoBusqueda(mensajeOriginal);
        let productos = [];
        if (termino && termino.length >= 2) {
            productos = await this.servicioProductos.buscarProductosPorTermino(termino);
        }
        if (!productos || productos.length === 0) {
            productos = await this.servicioProductos.obtenerMuestraProductosChat(4);
        }
        return {
            text: 'Aquí tienes algunos de nuestros productos disponibles en tienda:',
            products: productos.map(p => (p.toJSON ? p.toJSON() : p)),
            options: ['Ver catálogo completo', 'Ver mi carrito']
        };
    }

    async _generarRespuestaConsultaPrecio(mensajeOriginal) {
        const termino = this._extraerTerminoBusqueda(mensajeOriginal);
        let productosEncontrados = [];
        if (termino && termino.length >= 2) {
            productosEncontrados = await this.servicioProductos.buscarProductosPorTermino(termino);
        }

        if (productosEncontrados && productosEncontrados.length > 0) {
            return {
                text: `Encontré ${productosEncontrados.length} producto(s) relacionado(s) con tu consulta de precios:`,
                products: productosEncontrados.map(p => (p.toJSON ? p.toJSON() : p)),
                options: ['Ver catálogo completo', 'Ver mi carrito']
            };
        }

        const muestraGeneral = await this.servicioProductos.obtenerMuestraProductosChat(3);
        return {
            text: 'Aquí tienes los precios de algunos de nuestros productos más destacados:',
            products: muestraGeneral.map(p => (p.toJSON ? p.toJSON() : p)),
            options: ['Ver catálogo completo', 'Ver mi carrito']
        };
    }

    async _generarRespuestaAgregarCarrito(mensajeOriginal, sessionId = null) {
        const termino = this._extraerTerminoBusqueda(mensajeOriginal);
        let productosSugeridos = [];
        if (termino && termino.length >= 2) {
            productosSugeridos = await this.servicioProductos.buscarProductosPorTermino(termino);
        }

        if (productosSugeridos && productosSugeridos.length > 0) {
            const productoSeleccionado = productosSugeridos[0];
            const productoFormateado = productoSeleccionado.toJSON ? productoSeleccionado.toJSON() : productoSeleccionado;

            if (sessionId && this.servicioCarrito) {
                try {
                    await this.servicioCarrito.agregarOActualizarProducto(sessionId, productoSeleccionado.id, 1);
                    return {
                        text: `¡Listo! He añadido "${productoSeleccionado.nombre}" ($${Number(productoSeleccionado.precio).toFixed(2)}) a tu carrito.`,
                        products: [productoFormateado],
                        options: ['Ver mi carrito', 'Ir a pagar', 'Continuar comprando'],
                        carritoModificado: true
                    };
                } catch {
                    // Fallback a selección asistida
                }
            }

            return {
                text: 'Haz clic en "+ Añadir" en la tarjeta del producto que desees agregar a tu carrito:',
                products: productosSugeridos.map(p => (p.toJSON ? p.toJSON() : p)),
                options: ['Ver mi carrito', 'Ir a pagar'],
                carritoModificado: false
            };
        }

        const muestra = await this.servicioProductos.obtenerMuestraProductosChat(3);
        return {
            text: 'Puedes agregar productos directamente pulsando "+ Añadir" en cualquiera de las siguientes opciones:',
            products: muestra.map(p => (p.toJSON ? p.toJSON() : p)),
            options: ['Ver catálogo completo', 'Ver mi carrito'],
            carritoModificado: false
        };
    }

    async _generarRespuestaSeguimientoOrden(mensajeOriginal, sessionId = null) {
        const coincidenciaNumero = (mensajeOriginal || '').match(/(ORD-[A-Z0-9-]+)/i);

        if (coincidenciaNumero && this.servicioOrdenes) {
            try {
                const orden = await this.servicioOrdenes.consultarOrdenPorNumero(coincidenciaNumero[1].toUpperCase());
                if (orden) {
                    return {
                        text: `Tu pedido ${orden.numeroOrden} se encuentra en estado "${orden.estado}". Total: $${Number(orden.total).toFixed(2)}. Destino: ${orden.direccionEnvio}.`,
                        options: ['Ver catálogo', 'Ver mi carrito'],
                        products: null
                    };
                }
            } catch {
                // Si no se encuentra con ese número exacto, continuar a búsqueda por sesión
            }
        }

        if (sessionId && this.servicioOrdenes) {
            try {
                const historial = await this.servicioOrdenes.consultarHistorialOrdenesSesion(sessionId);
                if (historial && historial.length > 0) {
                    const ultimaOrden = historial[0];
                    return {
                        text: `Tu pedido más reciente (${ultimaOrden.numeroOrden}) está en estado "${ultimaOrden.estado}". Total: $${Number(ultimaOrden.total).toFixed(2)}.`,
                        options: ['Ver catálogo', 'Ver mi carrito'],
                        products: null
                    };
                }
            } catch {
                // Fallback defensivo
            }
        }

        return {
            text: 'No encontré pedidos asociados para rastrear en este momento. Si tienes un código de orden (ORD-...), por favor facilítamelo.',
            options: ['Ver catálogo', 'Consultar ofertas'],
            products: null
        };
    }

    _extraerTerminoBusqueda(mensajeTexto) {
        if (!mensajeTexto || typeof mensajeTexto !== 'string') return '';
        const stopWords = [
            'cuanto', 'cuesta', 'precio', 'valor', 'el', 'la', 'los', 'las', 'de',
            'un', 'una', 'unos', 'unas', 'quiero', 'comprar', 'tienen', 'tiene',
            'hay', 'alguna', 'algun', 'algunos', 'algunas', 'disponible', 'disponibles',
            'estoy', 'buscando', 'agregar', 'añadir', 'al', 'carro', 'carrito',
            'por', 'favor', 'ver', 'mostrar', 'donde', 'esta', 'estado', 'pedido', 'orden'
        ];
        const palabras = mensajeTexto
            .toLowerCase()
            .replace(/[¿?¡!.,;:()]/g, '')
            .split(/\s+/)
            .filter(p => p.length > 1 && !stopWords.includes(p));
        return palabras.join(' ');
    }

    seleccionarAleatorio(lista) {
        if (!Array.isArray(lista) || lista.length === 0) return '';
        const indice = Math.floor(Math.random() * lista.length);
        return lista[indice];
    }
}

module.exports = GeneradorRespuestasContextuales;
