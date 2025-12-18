// Rutas de chat
const express = require('express');
const router = express.Router();
const controladorChat = require('../controladores/controlador-chat');
const validadorSolicitud = require('../middlewares/validador-solicitud');

// POST /api/chat/mensaje - Enviar mensaje al chatbot
router.post(
    '/mensaje',
    validadorSolicitud.validarCampos(['mensaje']),
    controladorChat.procesarMensaje
);

// GET /api/chat/historial - Obtener historial de mensajes
router.get(
    '/historial',
    controladorChat.obtenerHistorial
);

// DELETE /api/chat/historial - Limpiar historial
router.delete(
    '/historial',
    controladorChat.limpiarHistorial
);

module.exports = router;
