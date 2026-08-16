// Configuración de base de datos SQLite
const path = require('path');

module.exports = {
    tipo: 'sqlite',
    
    sqlite: {
        ruta: path.join(__dirname, '..', 'shopbot.sqlite')
    }
};
