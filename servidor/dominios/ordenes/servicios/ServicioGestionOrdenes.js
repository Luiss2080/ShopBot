'use strict';

const crypto = require('crypto');
const RepositorioOrdenesSequelize = require('../repositorios/RepositorioOrdenesSequelize');
const RepositorioCarritoSequelize = require('../../carrito/repositorios/RepositorioCarritoSequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');

class ServicioGestionOrdenes {
    constructor(
        repositorioOrdenes = new RepositorioOrdenesSequelize(),
        repositorioCarrito = new RepositorioCarritoSequelize(),
        conexionBd = instanciaSequelize
    ) {
        this.repositorioOrdenes = repositorioOrdenes;
        this.repositorioCarrito = repositorioCarrito;
        this.conexionBd = conexionBd;
    }

    generarNumeroOrdenUnico() {
        const sufijoAleatorio = crypto.randomBytes(3).toString('hex').toUpperCase();
        return `ORD-${Date.now().toString().slice(-6)}-${sufijoAleatorio}`;
    }

    async procesarCreacionOrden({ sessionId, nombreCliente, telefonoCliente, direccionEnvio }) {
        const itemsCarrito = await this.repositorioCarrito.obtenerPorSesionConProductos(sessionId);

        if (!itemsCarrito || itemsCarrito.length === 0) {
            const error = new Error('No es posible generar una orden porque el carrito está vacío.');
            error.codigoHttp = 400;
            throw error;
        }

        let totalCalculado = 0;
        const itemsDetalle = itemsCarrito.map((registro) => {
            const producto = registro.producto ? registro.producto.toJSON() : {};
            const precioUnitario = Number(producto.precio || 0);
            const subtotal = Number((precioUnitario * registro.cantidad).toFixed(2));
            totalCalculado += subtotal;

            return {
                productoId: registro.productoId,
                nombreProducto: producto.nombre || `Producto #${registro.productoId}`,
                cantidad: registro.cantidad,
                precioUnitario,
                subtotal
            };
        });

        const numeroOrden = this.generarNumeroOrdenUnico();
        const datosOrden = {
            numeroOrden,
            sessionId,
            nombreCliente,
            telefonoCliente,
            direccionEnvio,
            total: Number(totalCalculado.toFixed(2)),
            estado: 'COMPLETADO'
        };

        const resultado = await this.conexionBd.transaction(async (transaccion) => {
            const ordenCreada = await this.repositorioOrdenes.crearOrdenConDetalles(
                { datosOrden, itemsDetalle },
                transaccion
            );

            await this.repositorioCarrito.vaciarCarritoSesion(sessionId);

            return ordenCreada;
        });

        return resultado;
    }

    async consultarOrdenPorNumero(numeroOrden) {
        const orden = await this.repositorioOrdenes.obtenerPorNumeroOrden(numeroOrden);
        if (!orden) {
            const error = new Error(`La orden con número ${numeroOrden} no existe.`);
            error.codigoHttp = 404;
            throw error;
        }
        return orden;
    }

    async consultarHistorialOrdenesSesion(sessionId) {
        return await this.repositorioOrdenes.obtenerPorSesion(sessionId);
    }
}

module.exports = ServicioGestionOrdenes;
