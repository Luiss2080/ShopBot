'use strict';

const ServicioGestionCarrito = require('../../servidor/dominios/carrito/servicios/ServicioGestionCarrito');

describe('ServicioGestionCarrito - Pruebas Unitarias Aisladas', () => {
    it('debe calcular correctamente el total general del carrito', async () => {
        const registrosMock = [
            {
                id: 1,
                cantidad: 2,
                producto: { toJSON: () => ({ id: 101, nombre: 'Mouse Gamer', precio: 50.00 }) }
            },
            {
                id: 2,
                cantidad: 1,
                producto: { toJSON: () => ({ id: 102, nombre: 'Teclado RGB', precio: 100.00 }) }
            }
        ];

        const mockRepoCarrito = {
            obtenerPorSesionConProductos: jest.fn().mockResolvedValue(registrosMock)
        };
        const mockRepoProductos = {};

        const servicio = new ServicioGestionCarrito(mockRepoCarrito, mockRepoProductos);
        const resumen = await servicio.obtenerResumenCarrito('sesion-test-123');

        expect(resumen.total).toBe(200.00);
        expect(resumen.cantidadTotalArticulos).toBe(3);
        expect(resumen.items).toHaveLength(2);
        expect(resumen.items[0].subtotal).toBe(100.00);
    });

    it('debe rechazar agregar producto si no existe en el catálogo', async () => {
        const mockRepoCarrito = {};
        const mockRepoProductos = {
            obtenerPorId: jest.fn().mockResolvedValue(null)
        };

        const servicio = new ServicioGestionCarrito(mockRepoCarrito, mockRepoProductos);

        await expect(
            servicio.agregarOActualizarProducto('sesion-test-123', 9999, 1)
        ).rejects.toThrow('El producto no existe.');
    });

    it('debe actualizar la cantidad si el producto ya estaba en el carrito', async () => {
        const mockRepoCarrito = {
            buscarItemPorSesionYProducto: jest.fn().mockResolvedValue({
                id: 5,
                cantidad: 2
            }),
            actualizarCantidad: jest.fn().mockResolvedValue([1])
        };
        const mockRepoProductos = {
            obtenerPorId: jest.fn().mockResolvedValue({ id: 200, nombre: 'Monitor 4K' })
        };

        const servicio = new ServicioGestionCarrito(mockRepoCarrito, mockRepoProductos);
        const resultado = await servicio.agregarOActualizarProducto('sesion-test-123', 200, 3);

        expect(resultado.actualizado).toBe(true);
        expect(resultado.cantidad).toBe(5);
        expect(mockRepoCarrito.actualizarCantidad).toHaveBeenCalledWith(5, 5);
    });
});

