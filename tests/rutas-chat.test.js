const request = require('supertest');
const app = require('../index');

describe('Chat API', () => {
    it('debería responder al mensaje inicial del usuario', async () => {
        const response = await request(app)
            .post('/api/chat/mensaje')
            .send({ mensaje: 'hola' });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('respuesta');
        expect(response.body.respuesta).toHaveProperty('text');
    });
});
