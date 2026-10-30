'use strict';

const request = require('supertest');
const app = require('../../index');

describe('API de Autenticación - Pruebas de Integración', () => {
    const emailUnico = `test_${Date.now()}@shopbot.test`;
    const passwordSeguro = 'MiClaveSecreta2026';

    it('debe rechazar registro con datos inválidos o contraseña corta (código 400)', async () => {
        const respuesta = await request(app)
            .post('/api/autenticacion/registro')
            .send({
                nombre: 'A',
                email: 'correo-no-valido',
                password: '123'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body).toHaveProperty('error');
    });

    it('debe registrar un usuario exitosamente sin exponer hash ni salt (código 201)', async () => {
        const respuesta = await request(app)
            .post('/api/autenticacion/registro')
            .send({
                nombre: 'Carlos Cliente',
                email: emailUnico,
                password: passwordSeguro
            });

        expect(respuesta.status).toBe(201);
        expect(respuesta.body).toHaveProperty('exito', true);
        expect(respuesta.body.usuario).toHaveProperty('id');
        expect(respuesta.body.usuario.email).toBe(emailUnico.toLowerCase());
        expect(respuesta.body.usuario).not.toHaveProperty('passwordHash');
        expect(respuesta.body.usuario).not.toHaveProperty('salt');
    });

    it('debe iniciar sesión con credenciales correctas (código 200)', async () => {
        const respuesta = await request(app)
            .post('/api/autenticacion/iniciar-sesion')
            .send({
                email: emailUnico,
                password: passwordSeguro
            });

        expect(respuesta.status).toBe(200);
        expect(respuesta.body).toHaveProperty('exito', true);
        expect(respuesta.body.usuario.email).toBe(emailUnico.toLowerCase());
    });

    it('debe rechazar inicio de sesión con contraseña equivocada (código 401)', async () => {
        const respuesta = await request(app)
            .post('/api/autenticacion/iniciar-sesion')
            .send({
                email: emailUnico,
                password: 'ContrasenaErronea'
            });

        expect(respuesta.status).toBe(401);
        expect(respuesta.body).toHaveProperty('error');
    });
});
