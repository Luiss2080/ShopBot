'use strict';

const ServicioGestionOrdenes = require('../servicios/ServicioGestionOrdenes');
const ValidadorCreacionOrden = require('../validadores/ValidadorCreacionOrden');
const CodigosEstadoHttp = require('../../../constantes/CodigosEstadoHttp');

class ControladorEndpointsOrdenes {
    constructor(servicioOrdenes = new ServicioGestionOrdenes()) {
        this.servicioOrdenes = servicioOrdenes;
        this.crearOrden = this.crearOrden.bind(this);
        this.obtenerPorNumero = this.obtenerPorNumero.bind(this);
        this.obtenerHistorialSesion = this.obtenerHistorialSesion.bind(this);
    }

    async crearOrden(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            const validacion = ValidadorCreacionOrden.validarDatosCheckout({
                sessionId,
                nombreCliente: req.body.nombreCliente,
                telefonoCliente: req.body.telefonoCliente,
                direccionEnvio: req.body.direccionEnvio
            });

            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    exito: false,
                    error: validacion.mensajeError
                });
            }

            const resultado = await this.servicioOrdenes.procesarCreacionOrden(validacion.datosLimpios);

            return res.status(CodigosEstadoHttp.CREADO).json({
                exito: true,
                mensaje: 'Orden generada y procesada exitosamente.',
                orden: resultado.orden,
                detalles: resultado.detalles
            });
        } catch (error) {
            return next(error);
        }
    }

    async obtenerPorNumero(req, res, next) {
        try {
            const { numeroOrden } = req.params;
            const orden = await this.servicioOrdenes.consultarOrdenPorNumero(numeroOrden);

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                orden
            });
        } catch (error) {
            return next(error);
        }
    }

    async obtenerHistorialSesion(req, res, next) {
        try {
            const sessionId = req.headers['x-session-id'];
            if (!sessionId) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    exito: false,
                    error: 'Falta la cabecera obligatoria x-session-id.'
                });
            }

            const historial = await this.servicioOrdenes.consultarHistorialOrdenesSesion(sessionId);

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                ordenes: historial
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ControladorEndpointsOrdenes;
