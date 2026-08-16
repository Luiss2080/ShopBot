const sqlite3 = require('sqlite3').verbose();
const config = require('../../configuracion/base-datos');

// Singleton para la conexión a la base de datos
class Database {
    constructor() {
        this.db = new sqlite3.Database(config.sqlite.ruta, (err) => {
            if (err) {
                console.error('❌ Error conectando a la base de datos SQLite:', err.message);
            } else {
                console.log('✅ Conectado a la base de datos SQLite');
                this.inicializarTablas();
            }
        });
    }

    inicializarTablas() {
        this.db.serialize(() => {
            // Tabla de Productos
            this.db.run(`
                CREATE TABLE IF NOT EXISTS productos (
                    id TEXT PRIMARY KEY,
                    nombre TEXT NOT NULL,
                    descripcion TEXT,
                    precio REAL NOT NULL,
                    categoria TEXT,
                    stock INTEGER DEFAULT 0,
                    imagen TEXT
                )
            `);

            // Tabla de Carrito
            this.db.run(`
                CREATE TABLE IF NOT EXISTS carrito (
                    id TEXT PRIMARY KEY,
                    sessionId TEXT NOT NULL,
                    productoId TEXT NOT NULL,
                    cantidad INTEGER DEFAULT 1,
                    fechaAgregado DATETIME DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (productoId) REFERENCES productos(id)
                )
            `);

            // Insertar datos de prueba si la tabla productos está vacía
            this.db.get("SELECT COUNT(*) as count FROM productos", (err, row) => {
                if (!err && row.count === 0) {
                    this.insertarProductosPrueba();
                }
            });
        });
    }

    insertarProductosPrueba() {
        const stmt = this.db.prepare("INSERT INTO productos VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        const productosInit = [
            ['p1', 'Laptop Dell XPS 13', 'Laptop ultraligera ideal para desarrollo y diseño', 1299.99, 'laptops', 15, 'laptop.jpg'],
            ['p2', 'Mouse Logitech MX Master 3', 'Mouse ergonómico inalámbrico con carga rápida', 99.99, 'accesorios', 50, 'mouse.jpg'],
            ['p3', 'Monitor LG UltraWide 34"', 'Monitor curvo para máxima productividad', 450.00, 'monitores', 10, 'monitor.jpg'],
            ['p4', 'Teclado Mecánico Keychron K2', 'Teclado mecánico bluetooth para Mac y Windows', 89.99, 'accesorios', 25, 'teclado.jpg'],
            ['p5', 'Auriculares Sony WH-1000XM4', 'Auriculares con cancelación de ruido activa', 298.00, 'audio', 20, 'auriculares.jpg']
        ];

        productosInit.forEach(p => {
            stmt.run(p);
        });
        
        stmt.finalize();
        console.log('📦 Productos de prueba insertados en SQLite');
    }

    // Métodos helper para usar Promises
    all(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, params, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) reject(err);
                else resolve(this);
            });
        });
    }
}

module.exports = new Database();
