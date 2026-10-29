'use strict';

const MensajesSistemaConversacional = Object.freeze({
    SALUDOS: [
        '¡Hola! Soy ShopBot. ¿En qué puedo ayudarte hoy?',
        '¡Buenos días! Estoy listo para asistirte con nuestro catálogo.',
        '¡Hola! ¿Buscas algún producto en especial?'
    ],
    DESPEDIDAS: [
        '¡Hasta luego! Que tengas un excelente día de compras.',
        '¡Adiós! Estaré por aquí si necesitas algo más.',
        '¡Nos vemos pronto!'
    ],
    FALLBACK_DESCONOCIDO: [
        'No logré comprender del todo tu consulta. ¿Podrías indicarme qué producto buscas?',
        'Disculpa, no entendí bien. ¿Te gustaría explorar nuestras categorías?',
        'No tengo esa respuesta aún, pero puedo ayudarte con las siguientes opciones:'
    ],
    OPCIONES_RAPIDAS_DEFECTO: [
        'Ver catálogo',
        'Consultar ofertas',
        'Ver mi carrito',
        'Contactar soporte'
    ],
    ERROR_PROCESAMIENTO: 'Lo siento, ocurrió una dificultad técnica al procesar tu mensaje. Por favor intenta de nuevo.'
});

module.exports = MensajesSistemaConversacional;

