'use strict';

const ServicioGestionCarrito = require('../servicios/ServicioGestionCarrito');
const ValidadorOperacionesCarrito = require('../validadores/ValidadorOperacionesCarrito');
const CodigosEstadoHttp = require('../../../constantes/CodigosEstadoHttp');

class ControladorEndpointsCarrito {
    constructor(servicioCarrito = new ServicioGestionCarrito()) {
        this.servicioCarrito = servicioCarrito;
        this.obtenerCarrito = this.obtenerCarrito.bind(this);
        this.agregarProducto = this.agregarProducto.bind(this);
        this.eliminarProducto = this.eliminarProducto.bind(this);
    }

    async obtenerCarrito(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            if (!sessionId) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    error: 'Falta cabecera obligatoria x-session-id'
                });
            }

            const carrito = await this.servicioCarrito.obtenerResumenCarrito(sessionId);
            return res.status(CodigosEstadoHttp.OK).json(carrito);
        } catch (error) {
            return next(error);
        }
    }

    async agregarProducto(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            const validacion = ValidadorOperacionesCarrito.validarAgregarItem({
                sessionId,
                productoId: req.body.productoId,
                cantidad: req.body.cantidad
            });

            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    error: validacion.mensajeError
                });
            }

            const { productoId, cantidad } = validacion.datosLimpios;
            const resultado = await this.servicioCarrito.agregarOActualizarProducto(
                sessionId,
                productoId,
                cantidad
            );

            return res.status(CodigosEstadoHttp.CREADO).json({
                mensaje: 'Producto agregado al carrito exitosamente',
                resultado
            });
        } catch (error) {
            return next(error);
        }
    }

    async eliminarProducto(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            const validacion = ValidadorOperacionesCarrito.validarEliminarItem(req.params.itemId, sessionId);

            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    error: validacion.mensajeError
                });
            }

            await this.servicioCarrito.eliminarProducto(validacion.idItemNumerico, validacion.sessionId);
            return res.status(CodigosEstadoHttp.OK).json({
                mensaje: 'Producto eliminado del carrito'
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ControladorEndpointsCarrito;
