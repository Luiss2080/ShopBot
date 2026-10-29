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
            const catalogoDestacado = await this.servicioProductos.obtenerMuestraProductosChat(4);
            return {
                text: 'Aquí tienes algunos de nuestros productos disponibles en tienda:',
                products: catalogoDestacado.map(p => p.toJSON ? p.toJSON() : p),
                options: ['Ver catálogo completo', 'Ver mi carrito']
            };
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

        // Intención desconocida o fallback
        return {
            text: this.seleccionarAleatorio(MensajesSistemaConversacional.FALLBACK_DESCONOCIDO),
            options: MensajesSistemaConversacional.OPCIONES_RAPIDAS_DEFECTO,
            products: null
        };
    }

    seleccionarAleatorio(lista) {
        if (!Array.isArray(lista) || lista.length === 0) return '';
        const indice = Math.floor(Math.random() * lista.length);
        return lista[indice];
    }
}

module.exports = GeneradorRespuestasContextuales;
