'use strict';

const GeneradorRespuestasContextuales = require('../../servidor/dominios/asistente-chat/generadores/GeneradorRespuestasContextuales');
const MensajesSistemaConversacional = require('../../servidor/constantes/MensajesSistemaConversacional');

describe('GeneradorRespuestasContextuales (Pruebas Unitarias)', () => {
    let mockServicioProductos;
    let mockServicioCarrito;
    let generador;

    const productosFicticios = [
        { id: 1, nombre: 'Laptop Gamer Ultra', precio: 1200.0, toJSON: () => ({ id: 1, nombre: 'Laptop Gamer Ultra', precio: 1200.0 }) },
        { id: 2, nombre: 'Monitor 4K HDR', precio: 450.0, toJSON: () => ({ id: 2, nombre: 'Monitor 4K HDR', precio: 450.0 }) }
    ];

    beforeEach(() => {
        mockServicioProductos = {
            obtenerMuestraProductosChat: jest.fn().mockResolvedValue(productosFicticios),
            buscarProductosPorTermino: jest.fn().mockImplementation((termino) => {
                if (termino.includes('laptop')) {
                    return Promise.resolve([productosFicticios[0]]);
                }
                return Promise.resolve([]);
            })
        };
        mockServicioCarrito = {
            agregarOActualizarProducto: jest.fn().mockResolvedValue({ id: 10, cantidad: 1 })
        };
        generador = new GeneradorRespuestasContextuales(mockServicioProductos, mockServicioCarrito);
    });

    test('debe responder adecuadamente a la intención de saludo', async () => {
        const respuesta = await generador.generarRespuesta({ intencion: 'saludo' });
        expect(MensajesSistemaConversacional.SALUDOS).toContain(respuesta.text);
        expect(respuesta.options).toEqual(['Ver catálogo', 'Consultar ofertas']);
        expect(respuesta.products).toBeNull();
    });

    test('debe responder adecuadamente a la intención de despedida', async () => {
        const respuesta = await generador.generarRespuesta({ intencion: 'despedida' });
        expect(MensajesSistemaConversacional.DESPEDIDAS).toContain(respuesta.text);
        expect(respuesta.options).toBeNull();
        expect(respuesta.products).toBeNull();
    });

    test('debe responder adecuadamente a la intención de ver_carrito', async () => {
        const respuesta = await generador.generarRespuesta({ intencion: 'ver_carrito' });
        expect(respuesta.text).toContain('icono del carrito');
        expect(respuesta.options).toEqual(['Ir a pagar', 'Continuar comprando']);
        expect(respuesta.products).toBeNull();
    });

    test('debe buscar productos específicos cuando la intención es consulta_producto con término', async () => {
        const respuesta = await generador.generarRespuesta(
            { intencion: 'consulta_producto' },
            '¿Tienen laptop?'
        );
        expect(mockServicioProductos.buscarProductosPorTermino).toHaveBeenCalledWith('laptop');
        expect(respuesta.products.length).toBe(1);
        expect(respuesta.products[0].nombre).toBe('Laptop Gamer Ultra');
    });

    test('debe retornar muestra general si no hay término específico en consulta_producto', async () => {
        const respuesta = await generador.generarRespuesta(
            { intencion: 'consulta_producto' },
            'ver catalogo'
        );
        expect(mockServicioProductos.obtenerMuestraProductosChat).toHaveBeenCalled();
        expect(respuesta.products.length).toBe(2);
    });

    test('debe responder a consulta_precio con productos encontrados', async () => {
        const respuesta = await generador.generarRespuesta(
            { intencion: 'consulta_precio' },
            '¿Cuánto cuesta la laptop gamer?'
        );
        expect(respuesta.text).toContain('Encontré 1 producto(s)');
        expect(respuesta.products[0].nombre).toBe('Laptop Gamer Ultra');
    });

    test('debe responder a consulta_precio con muestra destacada si no hay coincidencia exacta', async () => {
        const respuesta = await generador.generarRespuesta(
            { intencion: 'consulta_precio' },
            '¿Cuánto cuesta el dron espacial inexistente?'
        );
        expect(respuesta.text).toContain('precios de algunos de nuestros productos');
        expect(mockServicioProductos.obtenerMuestraProductosChat).toHaveBeenCalled();
    });

    test('debe mutar el carrito directamente en agregar_carrito cuando hay sessionId y producto', async () => {
        const respuesta = await generador.generarRespuesta(
            { intencion: 'agregar_carrito' },
            'Quiero agregar la laptop al carrito',
            'sesion-usuario-123'
        );
        expect(mockServicioCarrito.agregarOActualizarProducto).toHaveBeenCalledWith('sesion-usuario-123', 1, 1);
        expect(respuesta.carritoModificado).toBe(true);
        expect(respuesta.text).toContain('He añadido "Laptop Gamer Ultra"');
    });

    test('debe responder guiando al usuario si no hay sessionId en agregar_carrito con producto', async () => {
        const respuesta = await generador.generarRespuesta(
            { intencion: 'agregar_carrito' },
            'Quiero agregar laptop',
            null
        );
        expect(respuesta.text).toContain('Haz clic en "+ Añadir"');
        expect(respuesta.carritoModificado).toBe(false);
    });

    test('debe manejar error de adición en el carrito con fallback defensivo', async () => {
        mockServicioCarrito.agregarOActualizarProducto.mockRejectedValueOnce(new Error('Fallo DB'));
        const respuesta = await generador.generarRespuesta(
            { intencion: 'agregar_carrito' },
            'Quiero agregar laptop',
            'sesion-123'
        );
        expect(respuesta.text).toContain('Haz clic en "+ Añadir"');
        expect(respuesta.carritoModificado).toBe(false);
    });

    test('debe responder a agregar_carrito general si no se menciona un producto', async () => {
        const respuesta = await generador.generarRespuesta(
            { intencion: 'agregar_carrito' },
            'agregar al carro por favor'
        );
        expect(respuesta.text).toContain('pulsando "+ Añadir" en cualquiera');
        expect(respuesta.products.length).toBe(2);
        expect(respuesta.carritoModificado).toBe(false);
    });

    test('debe emitir fallback cuando la intención es desconocida', async () => {
        const respuesta = await generador.generarRespuesta({ intencion: 'consulta_clima' }, '¿va a llover hoy?');
        expect(MensajesSistemaConversacional.FALLBACK_DESCONOCIDO).toContain(respuesta.text);
        expect(respuesta.options).toEqual(MensajesSistemaConversacional.OPCIONES_RAPIDAS_DEFECTO);
        expect(respuesta.products).toBeNull();
    });

    test('debe manejar selección aleatoria vacía defensivamente', () => {
        expect(generador.seleccionarAleatorio([])).toBe('');
        expect(generador.seleccionarAleatorio(null)).toBe('');
    });

    test('debe extraer términos de búsqueda defensivamente con texto vacío o inválido', () => {
        expect(generador._extraerTerminoBusqueda(null)).toBe('');
        expect(generador._extraerTerminoBusqueda('')).toBe('');
    });
});
