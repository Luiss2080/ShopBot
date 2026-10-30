'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');

const VariablesEntornoServidor = require('./configuracion/VariablesEntornoServidor');
const especificacionSwagger = require('./configuracion/EspecificacionDocumentacionSwagger');
const InterceptorRegistroSolicitudesHttp = require('./middlewares/InterceptorRegistroSolicitudesHttp');
const InterceptorManejoErroresCentralizado = require('./middlewares/InterceptorManejoErroresCentralizado');
const ValidadorIdentificadorSesionHttp = require('./middlewares/ValidadorIdentificadorSesionHttp');

// Enrutadores de dominios
const crearEnrutadorProductos = require('./dominios/productos/rutas/DefinicionRutasProductos');
const crearEnrutadorCarrito = require('./dominios/carrito/rutas/DefinicionRutasCarrito');
const crearEnrutadorChat = require('./dominios/asistente-chat/rutas/DefinicionRutasChat');
const crearEnrutadorOrdenes = require('./dominios/ordenes/rutas/DefinicionRutasOrdenes');

function instanciarServidorHttp() {
    const aplicacionExpress = express();

    // Middlewares base de procesamiento
    aplicacionExpress.use(bodyParser.json({ limit: VariablesEntornoServidor.limitesCargaBody }));
    aplicacionExpress.use(bodyParser.urlencoded({ extended: true, limit: VariablesEntornoServidor.limitesCargaBody }));
    aplicacionExpress.use(InterceptorRegistroSolicitudesHttp.registrar);
    aplicacionExpress.use('/api', ValidadorIdentificadorSesionHttp.asegurarSesionPresente);

    // Documentación Swagger OpenAPI
    aplicacionExpress.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacionSwagger));

    // Archivos estáticos de frontend (SPA)
    const rutaEstaticosCliente = path.join(__dirname, '..', 'cliente', 'dist');
    aplicacionExpress.use(express.static(rutaEstaticosCliente));

    // Endpoints de API por Dominio
    aplicacionExpress.use('/api/productos', crearEnrutadorProductos());
    aplicacionExpress.use('/api/carrito', crearEnrutadorCarrito());
    aplicacionExpress.use('/api/chat', crearEnrutadorChat());

    // Endpoint de monitoreo y salud
    aplicacionExpress.get('/api/salud', (req, res) => {
        res.json({
            estado: 'operativo',
            marcaTiempo: new Date().toISOString(),
            entorno: VariablesEntornoServidor.entornoEjecucion
        });
    });

    // Fallback de navegación para la SPA de React
    aplicacionExpress.use((req, res, next) => {
        if (req.path.startsWith('/api')) {
            return InterceptorManejoErroresCentralizado.rutaNoEncontrada(req, res);
        }
        return res.sendFile(path.join(rutaEstaticosCliente, 'index.html'));
    });

    // Manejo global de excepciones
    aplicacionExpress.use(InterceptorManejoErroresCentralizado.capturarExcepciones);

    return aplicacionExpress;
}

module.exports = instanciarServidorHttp;
