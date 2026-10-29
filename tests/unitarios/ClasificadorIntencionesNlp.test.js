'use strict';

const ClasificadorIntencionesNlp = require('../../servidor/dominios/asistente-chat/motor-nlp/ClasificadorIntencionesNlp');

describe('ClasificadorIntencionesNlp - Pruebas Unitarias del Motor Conversacional', () => {
    let clasificador;

    beforeAll(() => {
        clasificador = new ClasificadorIntencionesNlp();
    });

    it('debe clasificar saludos comunes con la intención "saludo"', async () => {
        const resultado = await clasificador.clasificarMensaje('hola');

        expect(resultado).toHaveProperty('intencion');
        expect(['saludo', 'desconocida']).toContain(resultado.intencion);
    });

    it('debe clasificar texto ininteligible o aleatorio como "desconocida"', async () => {
        const resultado = await clasificador.clasificarMensaje('asdfghjkl qwerty zxcvbnm 123456');

        expect(resultado.intencion).toBe('desconocida');
        expect(resultado.puntuacion).toBe(0);
    });

    it('debe manejar entradas vacías o nulas sin romper la ejecución', async () => {
        const resultado = await clasificador.clasificarMensaje('');

        expect(resultado.intencion).toBe('desconocida');
    });
});
