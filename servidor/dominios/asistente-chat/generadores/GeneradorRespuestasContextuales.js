'use strict';

const MensajesSistemaConversacional = require('../../../constantes/MensajesSistemaConversacional');
const ServicioGestionProductos = require('../../productos/servicios/ServicioGestionProductos');

class GeneradorRespuestasContextuales {
    constructor(servicioProductos = new ServicioGestionProductos()) {
        this.servicioProductos = servicioProductos;
    }

    async generarRespuesta(clasificacion, mensajeOriginal = '') {
        const { intencion } = clasificacion;

        if (intencion === 'consulta_producto') {
            return await this._generarRespuestaCatalogoOProductos(mensajeOriginal);
        }

        if (intencion === 'consulta_precio') {
            return await this._generarRespuestaConsultaPrecio(mensajeOriginal);
        }

        if (intencion === 'agregar_carrito') {
            return await this._generarRespuestaAgregarCarrito(mensajeOriginal);
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

    async _generarRespuestaAgregarCarrito(mensajeOriginal) {
        const termino = this._extraerTerminoBusqueda(mensajeOriginal);
        let productosSugeridos = [];
        if (termino && termino.length >= 2) {
            productosSugeridos = await this.servicioProductos.buscarProductosPorTermino(termino);
        }

        if (productosSugeridos && productosSugeridos.length > 0) {
            return {
                text: 'Haz clic en "+ Añadir" en la tarjeta del producto que desees agregar a tu carrito:',
                products: productosSugeridos.map(p => (p.toJSON ? p.toJSON() : p)),
                options: ['Ver mi carrito', 'Ir a pagar']
            };
        }

        const muestra = await this.servicioProductos.obtenerMuestraProductosChat(3);
        return {
            text: 'Puedes agregar productos directamente pulsando "+ Añadir" en cualquiera de las siguientes opciones:',
            products: muestra.map(p => (p.toJSON ? p.toJSON() : p)),
            options: ['Ver catálogo completo', 'Ver mi carrito']
        };
    }

    _extraerTerminoBusqueda(mensajeTexto) {
        if (!mensajeTexto || typeof mensajeTexto !== 'string') return '';
        const stopWords = [
            'cuanto', 'cuesta', 'precio', 'valor', 'el', 'la', 'los', 'las', 'de',
            'un', 'una', 'unos', 'unas', 'quiero', 'comprar', 'tienen', 'tiene',
            'hay', 'alguna', 'algun', 'algunos', 'algunas', 'disponible', 'disponibles',
            'estoy', 'buscando', 'agregar', 'añadir', 'al', 'carro', 'carrito',
            'por', 'favor', 'ver', 'mostrar'
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
