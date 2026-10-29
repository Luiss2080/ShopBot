'use strict';

const request = require('supertest');
const app = require('../../index');

describe('API de Carrito - Pruebas de Integración', () => {
    const sesionPrueba = 'sesion-test-supertest-456';

    it('debe devolver estructura de carrito vacía o existente para una sesión', async () => {
        const respuesta = await request(app)
            .get('/api/carrito')
            .set('x-session-id', sesionPrueba);

        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toHaveProperty('items');
        expect(respuesta.body).toHaveProperty('total');
        expect(typeof respuesta.body.total).toBe('number');
    });

    it('debe validar y rechazar agregar producto sin datos requeridos con 400', async () => {
        const respuesta = await request(app)
            .post('/api/carrito')
            .set('x-session-id', sesionPrueba)
            .send({});

        expect(respuesta.status).toBe(400);
        expect(respuesta.body).toHaveProperty('error');
    });
});

