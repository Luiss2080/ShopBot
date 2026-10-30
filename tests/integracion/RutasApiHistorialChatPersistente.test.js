'use strict';

const request = require('supertest');
const app = require('../../index');

describe('API de Historial de Chat Persistente en Base de Datos', () => {
    const sesionPersistente = 'sesion-test-historial-789';

    it('debe guardar la interacción y retornarla desde el endpoint de historial', async () => {
        // 1. Enviar mensaje para generar registro
        const respuestaMensaje = await request(app)
            .post('/api/chat/mensaje')
            .set('x-session-id', sesionPersistente)
            .send({ mensaje: 'hola' });

        expect(respuestaMensaje.status).toBe(200);

        // 2. Consultar historial para la misma sesión
        const respuestaHistorial = await request(app)
            .get('/api/chat/historial')
            .set('x-session-id', sesionPersistente);

        expect(respuestaHistorial.status).toBe(200);
        expect(respuestaHistorial.body).toHaveProperty('exito', true);
        expect(Array.isArray(respuestaHistorial.body.historial)).toBe(true);
        expect(respuestaHistorial.body.historial.length).toBeGreaterThanOrEqual(1);

        // 3. Limpiar historial de la sesión
        const respuestaLimpieza = await request(app)
            .delete('/api/chat/historial')
            .set('x-session-id', sesionPersistente);

        expect(respuestaLimpieza.status).toBe(200);
    });
});

