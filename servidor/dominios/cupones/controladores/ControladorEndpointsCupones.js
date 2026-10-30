'use strict';

const ServicioGestionCupones = require('../servicios/ServicioGestionCupones');
const ValidadorAplicacionCupon = require('../validadores/ValidadorAplicacionCupon');
const CodigosEstadoHttp = require('../../../constantes/CodigosEstadoHttp');

class ControladorEndpointsCupones {
    constructor(servicioCupones = new ServicioGestionCupones()) {
        this.servicioCupones = servicioCupones;
        this.validar = this.validar.bind(this);
        this.obtenerVigentes = this.obtenerVigentes.bind(this);
    }

    async validar(req, res, next) {
        try {
            const validacion = ValidadorAplicacionCupon.validarSolicitudCupon(req.body);
            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    exito: false,
                    error: validacion.mensajeError
                });
            }

            const { codigo, montoTotal } = validacion.datosLimpios;
            const resultado = await this.servicioCupones.validarYAplicarCupon(codigo, montoTotal);

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                ...resultado
            });
        } catch (error) {
            return next(error);
        }
    }

    async obtenerVigentes(req, res, next) {
        try {
            const cupones = await this.servicioCupones.obtenerListaCuponesVigentes();
            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                cupones
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ControladorEndpointsCupones;

