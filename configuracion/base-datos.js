// Configuración de base de datos (para futuro uso)
module.exports = {
    tipo: process.env.DB_TYPE || 'mongodb',
    
    // MongoDB
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/shopbot',
        opciones: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    
    // MySQL
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        puerto: process.env.DB_PORT || 3306,
        usuario: process.env.DB_USER || 'root',
        contraseña: process.env.DB_PASSWORD || '',
        baseDatos: process.env.DB_NAME || 'shopbot'
    }
};
