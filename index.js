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

// Archivos estáticos
app.use(express.static('publico'));
app.use('/estilos', express.static('estilos'));
app.use('/scripts', express.static('scripts'));
app.use('/vistas', express.static('vistas'));

// ===== CONFIGURACIÓN DE SWAGGER =====
const especificacionSwagger = swaggerJsdoc(configSwagger);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(especificacionSwagger));

// ===== RUTAS =====

// Ruta principal - Servir página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'paginas', 'inicio.html'));
});

// Ruta de chat
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'paginas', 'chat.html'));
});

// Ruta de ayuda
app.get('/ayuda', (req, res) => {
    res.sendFile(path.join(__dirname, 'vistas', 'paginas', 'ayuda.html'));
});

// API Routes
app.use('/api/chat', rutasChat);
app.use('/api/productos', rutasProductos);

// Ruta de salud del servidor
app.get('/api/salud', (req, res) => {
    res.json({
        estado: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
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
