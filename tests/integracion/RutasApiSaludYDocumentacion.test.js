'use strict';

const request = require('supertest');
const app = require('../../index');

describe('API de Salud y Documentación OpenAPI', () => {
    it('debe responder 200 en endpoint de salud /api/salud con estado operativo', async () => {
        const respuesta = await request(app).get('/api/salud');

        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toHaveProperty('estado', 'operativo');
        expect(respuesta.body).toHaveProperty('marcaTiempo');
        expect(respuesta.body).toHaveProperty('entorno');
    });

    it('debe servir o redirigir a la documentación interactiva Swagger en /api-docs', async () => {
        const respuesta = await request(app).get('/api-docs/');

        expect([200, 301, 302]).toContain(respuesta.status);
    });
});
