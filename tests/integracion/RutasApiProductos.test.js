'use strict';

const request = require('supertest');
const app = require('../../index');

describe('API de Productos - Pruebas de Integración', () => {
    it('debe listar productos con código 200 y formato array', async () => {
        const respuesta = await request(app).get('/api/productos');

        expect(respuesta.status).toBe(200);
        expect(Array.isArray(respuesta.body)).toBe(true);
    });

    it('debe rechazar búsqueda sin parámetro "q" con código 400', async () => {
        const respuesta = await request(app).get('/api/productos/buscar');

        expect(respuesta.status).toBe(400);
        expect(respuesta.body).toHaveProperty('error');
    });

    it('debe responder 404 al consultar un ID de producto inexistente', async () => {
        const respuesta = await request(app).get('/api/productos/999999');

        expect(respuesta.status).toBe(404);
        expect(respuesta.body).toHaveProperty('error');
    });
});

