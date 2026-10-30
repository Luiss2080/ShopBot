'use strict';

const request = require('supertest');
const { instanciarServidorHttp } = require('../../servidor/InicializadorServidorHttp');

describe('Rutas HTTP de API de Cupones (/api/cupones)', () => {
    let app;
    const sesionIdPrueba = 'test-session-cupones-12345';

    beforeAll(() => {
        app = instanciarServidorHttp();
    });

    test('POST /api/cupones/validar - debe validar exitosamente el cupón SHOPBOT10', async () => {
        const respuesta = await request(app)
            .post('/api/cupones/validar')
            .set('x-session-id', sesionIdPrueba)
            .send({
                codigo: 'SHOPBOT10',
                montoTotal: 100.0
            });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.exito).toBe(true);
        expect(respuesta.body.valido).toBe(true);
        expect(respuesta.body.descuento).toBe(10.0);
        expect(respuesta.body.montoFinal).toBe(90.0);
    });

    test('POST /api/cupones/validar - debe responder 404 si el cupón no existe', async () => {
        const respuesta = await request(app)
            .post('/api/cupones/validar')
            .set('x-session-id', sesionIdPrueba)
            .send({
                codigo: 'CUPON_FANTASMA',
                montoTotal: 100.0
            });

        expect(respuesta.status).toBe(404);
        expect(respuesta.body.error).toContain('no existe');
    });

    test('POST /api/cupones/validar - debe responder 400 si el código es inválido', async () => {
        const respuesta = await request(app)
            .post('/api/cupones/validar')
            .set('x-session-id', sesionIdPrueba)
            .send({
                codigo: 'a',
                montoTotal: 100.0
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.exito).toBe(false);
    });

    test('GET /api/cupones/vigentes - debe devolver lista de cupones vigentes', async () => {
        const respuesta = await request(app)
            .get('/api/cupones/vigentes')
            .set('x-session-id', sesionIdPrueba);

        expect(respuesta.status).toBe(200);
        expect(respuesta.body.exito).toBe(true);
        expect(Array.isArray(respuesta.body.cupones)).toBe(true);
    });
});
