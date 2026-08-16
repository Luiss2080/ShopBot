const { manager, modelPath } = require('./entrenamiento-nlp');
const fs = require('fs');

class AnalizadorIntenciones {
    constructor() {
        this.listo = false;
        this.cargarModelo();
    }

    async cargarModelo() {
        if (fs.existsSync(modelPath)) {
            manager.load(modelPath);
            this.listo = true;
        } else {
            console.log('⚠️ Modelo NLP no encontrado, entrenando...');
            const { entrenar } = require('./entrenamiento-nlp');
            await entrenar();
            this.listo = true;
        }
    }

    /**
     * Analiza un mensaje y determina la intención usando node-nlp
     * @param {string} mensaje - Mensaje a analizar
     * @returns {Promise<string>} Intención detectada
     */
    async analizar(mensaje) {
        if (!this.listo) await this.cargarModelo();
        
        const response = await manager.process('es', mensaje);
        
        // Si la precisión es mayor al 50%, devolvemos la intención
        if (response.intent !== 'None' && response.score > 0.5) {
            return response.intent;
        }

        return 'desconocida';
    }

    /**
     * Extrae entidades del mensaje
     * @param {string} mensaje - Mensaje a analizar
     * @returns {Promise<object>} Entidades extraídas
     */
    async extraerEntidades(mensaje) {
        if (!this.listo) await this.cargarModelo();

        const response = await manager.process('es', mensaje);
        const entidades = {
            numeros: [],
            productos: []
        };

        // Extraer números usando regex simple
        const regexNumeros = /\d+/g;
        const numerosEncontrados = mensaje.match(regexNumeros);
        if (numerosEncontrados) {
            entidades.numeros = numerosEncontrados.map(n => parseInt(n));
        }

        // Podríamos extraer entidades propias de node-nlp si las definimos
        if (response.entities && response.entities.length > 0) {
            response.entities.forEach(ent => {
                // Mapear entidades (esto se expandirá con el entrenamiento NER)
            });
        }

        return entidades;
    }
}

module.exports = new AnalizadorIntenciones();
