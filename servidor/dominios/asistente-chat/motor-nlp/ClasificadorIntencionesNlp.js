'use strict';

const fs = require('fs');
const { NlpManager } = require('node-nlp');
const { EntrenadorCorpusConversacional, rutaArchivoModelo } = require('./EntrenadorCorpusConversacional');

class ClasificadorIntencionesNlp {
    constructor() {
        this.gestorNlp = new NlpManager({ languages: ['es'], forceNER: true });
        this.modeloCargado = false;
        this.inicializar();
    }

    async inicializar() {
        try {
            if (fs.existsSync(rutaArchivoModelo)) {
                this.gestorNlp.load(rutaArchivoModelo);
                this.modeloCargado = true;
            } else {
                await EntrenadorCorpusConversacional.entrenarYGuardarModelo(this.gestorNlp);
                this.modeloCargado = true;
            }
        } catch (error) {
            console.error('Error al inicializar modelo NLP:', error.message);
        }
    }

    async clasificarMensaje(mensaje) {
        if (!mensaje || typeof mensaje !== 'string' || mensaje.trim().length === 0) {
            return {
                intencion: 'desconocida',
                puntuacion: 0,
                entidades: []
            };
        }

        if (!this.modeloCargado) {
            await this.inicializar();
        }

        try {
            const resultado = await this.gestorNlp.process('es', mensaje);
            if (resultado && resultado.intent && resultado.intent !== 'None' && resultado.score > 0.45) {
                return {
                    intencion: resultado.intent,
                    puntuacion: resultado.score,
                    entidades: resultado.entities || []
                };
            }
        } catch (error) {
            console.error('Fallo en inferencia NLP:', error.message);
        }

        return {
            intencion: 'desconocida',
            puntuacion: 0,
            entidades: []
        };
    }
}

module.exports = ClasificadorIntencionesNlp;

