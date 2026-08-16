// Archivo principal del servidor - ShopBot
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Importar configuraciones
const configServidor = require('./configuracion/servidor');
const configSwagger = require('./configuracion/swagger');

// Importar middlewares
const registradorSolicitudes = require('./servidor/middlewares/registrador-solicitudes');
const manejadorErrores = require('./servidor/middlewares/manejador-errores');

// Importar rutas
const rutasChat = require('./servidor/rutas/rutas-chat');
const rutasProductos = require('./servidor/rutas/rutas-productos');

// Crear aplicación Express
const app = express();

// ===== CONFIGURACIÓN DE MIDDLEWARES =====

// Body parser
app.use(bodyParser.json({ limit: configServidor.limites.tamañoBody }));
app.use(bodyParser.urlencoded({ extended: true, limit: configServidor.limites.tamañoBody }));

// Registrador de solicitudes
app.use(registradorSolicitudes.registrar);

// Serve React app static files
app.use(express.static(path.join(__dirname, 'cliente', 'dist')));

// API Routes
const rutasCarrito = require('./servidor/rutas/rutas-carrito');
app.use('/api/chat', rutasChat);
app.use('/api/productos', rutasProductos);
app.use('/api/carrito', rutasCarrito);

// Ruta de salud del servidor
app.get('/api/salud', (req, res) => {
    res.json({
        estado: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Fallback to React router for non-API routes
app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Ruta API no encontrada' });
    res.sendFile(path.join(__dirname, 'cliente', 'dist', 'index.html'));
});

// ===== MANEJO DE ERRORES =====

// Ruta no encontrada
app.use(manejadorErrores.rutaNoEncontrada);

// Manejador de errores general
app.use(manejadorErrores.capturarErrores);

// ===== INICIAR SERVIDOR =====

const puerto = configServidor.puerto;
const host = configServidor.host;

app.listen(puerto, host, () => {
    console.log('='.repeat(50));
    console.log(`🤖 ShopBot - Asistente Virtual`);
    console.log('='.repeat(50));
    console.log(`✅ Servidor iniciado en http://${host}:${puerto}`);
    console.log(`📚 Documentación API: http://${host}:${puerto}/api-docs`);
    console.log(`🌍 Entorno: ${configServidor.entorno}`);
    console.log('='.repeat(50));
});

// Manejo de errores no capturados
process.on('unhandledRejection', (error) => {
    console.error('❌ Error no manejado:', error);
    process.exit(1);
});

process.on('SIGTERM', () => {
    console.log('👋 Cerrando servidor...');
    process.exit(0);
});

module.exports = app;
