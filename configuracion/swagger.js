// Configuración de Swagger/OpenAPI
module.exports = {
    definicion: {
        openapi: '3.0.0',
        info: {
            title: 'ShopBot API',
            version: '1.0.0',
            description: 'API del chatbot asistente virtual para tienda',
            contact: {
                name: 'Soporte ShopBot',
                email: 'soporte@shopbot.com'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo'
            }
        ],
        tags: [
            {
                name: 'Chat',
                description: 'Operaciones del chatbot'
            },
            {
                name: 'Productos',
                description: 'Gestión de productos'
            }
        ]
    },
    apis: ['./servidor/rutas/*.js']
};
