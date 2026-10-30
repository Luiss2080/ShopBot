'use strict';

const request = require('supertest');
const app = require('../../index');

describe('API de Órdenes - Pruebas de Integración', () => {
    const sesionCheckout = 'sesion-test-checkout-int-999';

    it('debe responder 400 si faltan datos requeridos en el checkout', async () => {
        const respuesta = await request(app)
            .post('/api/ordenes')
            .set('x-session-id', sesionCheckout)
            .send({});

        expect(respuesta.status).toBe(400);
        expect(respuesta.body).toHaveProperty('error');
    });

    it('debe responder 400 si se intenta procesar una orden con carrito vacío', async () => {
        const respuesta = await request(app)
            .post('/api/ordenes')
            .set('x-session-id', sesionCheckout)
            .send({
                nombreCliente: 'María González',
                telefonoCliente: '5551234567',
                direccionEnvio: 'Calle de las Flores 456'
            });

        expect(respuesta.status).toBe(400);
        expect(respuesta.body.error).toContain('carrito está vacío');
    });

    it('debe crear orden exitosamente al haber items en el carrito y vaciarlo', async () => {
        // 1. Agregar un producto al carrito
        await request(app)
            .post('/api/carrito')
            .set('x-session-id', sesionCheckout)
            .send({ productoId: 1, cantidad: 2 });

        // 2. Ejecutar creación de orden
        const respuestaOrden = await request(app)
            .post('/api/ordenes')
            .set('x-session-id', sesionCheckout)
            .send({
                nombreCliente: 'María González',
                telefonoCliente: '5551234567',
                direccionEnvio: 'Calle de las Flores 456'
            });

        expect(respuestaOrden.status).toBe(201);
        expect(respuestaOrden.body).toHaveProperty('exito', true);
        expect(respuestaOrden.body.orden).toHaveProperty('numeroOrden');
        expect(respuestaOrden.body.orden.total).toBeGreaterThan(0);
        expect(respuestaOrden.body.detalles.length).toBeGreaterThanOrEqual(1);

        // 3. Verificar que el carrito quedó vacío
        const respuestaCarrito = await request(app)
            .get('/api/carrito')
            .set('x-session-id', sesionCheckout);

        expect(respuestaCarrito.body.items).toHaveLength(0);
        expect(respuestaCarrito.body.total).toBe(0);
    });
});

