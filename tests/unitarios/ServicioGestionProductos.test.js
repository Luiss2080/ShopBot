'use strict';

const ServicioGestionProductos = require('../../servidor/dominios/productos/servicios/ServicioGestionProductos');

describe('ServicioGestionProductos - Pruebas Unitarias Aisladas', () => {
    it('debe listar todo el catálogo delegando en el repositorio', async () => {
        const repositorioMock = {
            obtenerTodos: jest.fn().mockResolvedValue([
                { id: 1, nombre: 'Laptop Pro', precio: 1200 },
                { id: 2, nombre: 'Mouse Inalámbrico', precio: 40 }
            ])
        };

        const servicio = new ServicioGestionProductos(repositorioMock);
        const productos = await servicio.listarCatalogoCompleto();

        expect(productos).toHaveLength(2);
        expect(productos[0].nombre).toBe('Laptop Pro');
        expect(repositorioMock.obtenerTodos).toHaveBeenCalledTimes(1);
    });

    it('debe lanzar excepción con código 404 cuando el producto no existe', async () => {
        const repositorioMock = {
            obtenerPorId: jest.fn().mockResolvedValue(null)
        };

        const servicio = new ServicioGestionProductos(repositorioMock);

        await expect(servicio.obtenerDetalleProducto(999)).rejects.toThrow(
            'El producto con ID 999 no fue encontrado.'
        );
    });

    it('debe retornar el detalle correcto cuando el producto sí existe', async () => {
        const productoMock = { id: 10, nombre: 'Teclado Mecánico', precio: 80 };
        const repositorioMock = {
            obtenerPorId: jest.fn().mockResolvedValue(productoMock)
        };

        const servicio = new ServicioGestionProductos(repositorioMock);
        const resultado = await servicio.obtenerDetalleProducto(10);

        expect(resultado).toEqual(productoMock);
        expect(repositorioMock.obtenerPorId).toHaveBeenCalledWith(10);
    });
});
