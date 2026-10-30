'use strict';

const ServicioGestionCupones = require('../../servidor/dominios/cupones/servicios/ServicioGestionCupones');

describe('ServicioGestionCupones (Pruebas Unitarias)', () => {
    let mockRepositorio;
    let servicio;

    const cuponPorcentaje = {
        id: 1,
        codigo: 'SHOPBOT10',
        descripcion: '10% de descuento',
        porcentajeDescuento: 10.0,
        descuentoFijo: 0.0,
        montoMinimo: 0.0,
        activo: true,
        fechaExpiracion: new Date('2030-01-01'),
        toJSON: () => ({ codigo: 'SHOPBOT10', porcentajeDescuento: 10.0 })
    };

    const cuponFijo = {
        id: 2,
        codigo: 'BIENVENIDA20',
        descripcion: '$20 de descuento',
        porcentajeDescuento: 0.0,
        descuentoFijo: 20.0,
        montoMinimo: 100.0,
        activo: true,
        fechaExpiracion: null,
        toJSON: () => ({ codigo: 'BIENVENIDA20', descuentoFijo: 20.0 })
    };

    beforeEach(() => {
        mockRepositorio = {
            obtenerPorCodigo: jest.fn().mockImplementation((codigo) => {
                if (codigo === 'SHOPBOT10') return Promise.resolve(cuponPorcentaje);
                if (codigo === 'BIENVENIDA20') return Promise.resolve(cuponFijo);
                return Promise.resolve(null);
            }),
            obtenerCuponesVigentes: jest.fn().mockResolvedValue([cuponPorcentaje, cuponFijo])
        };
        servicio = new ServicioGestionCupones(mockRepositorio);
    });

    test('debe calcular correctamente el descuento porcentual', async () => {
        const resultado = await servicio.validarYAplicarCupon('SHOPBOT10', 200.0);
        expect(resultado.valido).toBe(true);
        expect(resultado.descuento).toBe(20.0);
        expect(resultado.montoFinal).toBe(180.0);
    });

    test('debe calcular correctamente el descuento fijo cumpliendo el monto mínimo', async () => {
        const resultado = await servicio.validarYAplicarCupon('BIENVENIDA20', 150.0);
        expect(resultado.valido).toBe(true);
        expect(resultado.descuento).toBe(20.0);
        expect(resultado.montoFinal).toBe(130.0);
    });

    test('debe lanzar error 404 si el cupón no existe', async () => {
        await expect(servicio.validarYAplicarCupon('NOEXISTE', 100)).rejects.toThrow('no existe');
    });

    test('debe lanzar error 400 si el cupón está inactivo', async () => {
        mockRepositorio.obtenerPorCodigo.mockResolvedValueOnce({
            ...cuponPorcentaje,
            activo: false
        });
        await expect(servicio.validarYAplicarCupon('SHOPBOT10', 100)).rejects.toThrow('ya no está activo');
    });

    test('debe lanzar error 400 si el cupón está expirado', async () => {
        mockRepositorio.obtenerPorCodigo.mockResolvedValueOnce({
            ...cuponPorcentaje,
            fechaExpiracion: new Date('2020-01-01')
        });
        await expect(servicio.validarYAplicarCupon('SHOPBOT10', 100)).rejects.toThrow('ha expirado');
    });

    test('debe lanzar error 400 si no se alcanza el monto mínimo de compra', async () => {
        await expect(servicio.validarYAplicarCupon('BIENVENIDA20', 50.0)).rejects.toThrow('requiere una compra mínima');
    });

    test('debe topar el descuento si supera el total de la orden evitando montos negativos', async () => {
        mockRepositorio.obtenerPorCodigo.mockResolvedValueOnce({
            id: 3,
            codigo: 'MEGACUPON',
            porcentajeDescuento: 0,
            descuentoFijo: 500.0,
            montoMinimo: 0,
            activo: true,
            fechaExpiracion: null
        });
        const resultado = await servicio.validarYAplicarCupon('MEGACUPON', 50.0);
        expect(resultado.descuento).toBe(50.0);
        expect(resultado.montoFinal).toBe(0.0);
    });

    test('debe listar cupones vigentes correctamente', async () => {
        const cupones = await servicio.obtenerListaCuponesVigentes();
        expect(cupones.length).toBe(2);
        expect(mockRepositorio.obtenerCuponesVigentes).toHaveBeenCalled();
    });
});

