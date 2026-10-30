'use strict';

const ServicioGestionOrdenes = require('../../servidor/dominios/ordenes/servicios/ServicioGestionOrdenes');

describe('ServicioGestionOrdenes - Pruebas Unitarias Aisladas', () => {
    it('debe lanzar error 400 si el carrito de la sesión se encuentra vacío', async () => {
        const mockRepoOrdenes = {};
        const mockRepoCarrito = {
            obtenerPorSesionConProductos: jest.fn().mockResolvedValue([])
        };
        const mockConexionBd = {};

        const servicio = new ServicioGestionOrdenes(mockRepoOrdenes, mockRepoCarrito, mockConexionBd);

        await expect(servicio.procesarCreacionOrden({
            sessionId: 'sesion-vacia',
            nombreCliente: 'Juan Pérez',
            telefonoCliente: '12345678',
            direccionEnvio: 'Calle Falsa 123'
        })).rejects.toThrow('No es posible generar una orden porque el carrito está vacío.');
    });

    it('debe procesar la orden transaccionalmente y vaciar el carrito al completarse', async () => {
        const registrosCarritoMock = [
            {
                productoId: 1,
                cantidad: 2,
                producto: { toJSON: () => ({ id: 1, nombre: 'Laptop Gamer', precio: 1000 }) }
            },
            {
                productoId: 2,
                cantidad: 1,
                producto: { toJSON: () => ({ id: 2, nombre: 'Mouse Óptico', precio: 50 }) }
            }
        ];

        const mockRepoCarrito = {
            obtenerPorSesionConProductos: jest.fn().mockResolvedValue(registrosCarritoMock),
            vaciarCarritoSesion: jest.fn().mockResolvedValue(true)
        };

        const mockOrdenCreada = {
            id: 99,
            numeroOrden: 'ORD-TEST-1234',
            total: 2050
        };

        const mockRepoOrdenes = {
            crearOrdenConDetalles: jest.fn().mockResolvedValue({
                orden: mockOrdenCreada,
                detalles: [{ id: 1 }, { id: 2 }]
            })
        };

        const mockConexionBd = {
            transaction: jest.fn(async (callback) => {
                const transaccionFalsa = {};
                return await callback(transaccionFalsa);
            })
        };

        const servicio = new ServicioGestionOrdenes(mockRepoOrdenes, mockRepoCarrito, mockConexionBd);
        const resultado = await servicio.procesarCreacionOrden({
            sessionId: 'sesion-activa',
            nombreCliente: 'Carlos Ruiz',
            telefonoCliente: '987654321',
            direccionEnvio: 'Avenida Siempreviva 742'
        });

        expect(resultado.orden.total).toBe(2050);
        expect(mockRepoCarrito.vaciarCarritoSesion).toHaveBeenCalledWith('sesion-activa');
        expect(mockRepoOrdenes.crearOrdenConDetalles).toHaveBeenCalled();
    });
});
