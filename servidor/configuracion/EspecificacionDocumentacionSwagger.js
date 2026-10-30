'use strict';

const swaggerJsdoc = require('swagger-jsdoc');

const opcionesSwagger = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ShopBot API - Plataforma E-Commerce & IA',
            version: '2.0.0',
            description: 'API modular por dominios de negocio (Productos, Carrito y Asistente Conversacional NLP)',
            contact: {
                name: 'Equipo de Arquitectura ShopBot',
                email: 'soporte@shopbot.local'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor Local de Desarrollo'
            }
        ],
        tags: [
            { name: 'Productos', description: 'Catálogo y consulta de inventario' },
            { name: 'Carrito', description: 'Gestión de cesta de compra por sesión' },
            { name: 'Chat', description: 'Interacción inteligente con el asistente virtual' }
        ]
    },
    apis: [
        './servidor/dominios/**/rutas/*.js'
    ]
};

const especificacionSwaggerCompilada = swaggerJsdoc(opcionesSwagger);

module.exports = especificacionSwaggerCompilada;

