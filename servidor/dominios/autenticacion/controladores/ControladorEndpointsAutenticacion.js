'use strict';

const ServicioGestionAutenticacion = require('../servicios/ServicioGestionAutenticacion');
const ValidadorCredencialesUsuario = require('../validadores/ValidadorCredencialesUsuario');
const CodigosEstadoHttp = require('../../../constantes/CodigosEstadoHttp');

class ControladorEndpointsAutenticacion {
    constructor(servicioAutenticacion = new ServicioGestionAutenticacion()) {
        this.servicioAutenticacion = servicioAutenticacion;
        this.registrar = this.registrar.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
        this.obtenerPerfil = this.obtenerPerfil.bind(this);
    }

    async registrar(req, res, next) {
        try {
            const validacion = ValidadorCredencialesUsuario.validarRegistro(req.body);

            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    exito: false,
                    error: validacion.mensajeError
                });
            }

            const usuarioCreado = await this.servicioAutenticacion.registrarNuevoUsuario(validacion.datosLimpios);

            return res.status(CodigosEstadoHttp.CREADO).json({
                exito: true,
                mensaje: 'Usuario registrado exitosamente.',
                usuario: usuarioCreado
            });
        } catch (error) {
            return next(error);
        }
    }

    async iniciarSesion(req, res, next) {
        try {
            const validacion = ValidadorCredencialesUsuario.validarInicioSesion(req.body);

            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    exito: false,
                    error: validacion.mensajeError
                });
            }

            const perfilUsuario = await this.servicioAutenticacion.autenticarUsuario(validacion.datosLimpios);

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                mensaje: 'Sesión iniciada correctamente.',
                usuario: perfilUsuario
            });
        } catch (error) {
            return next(error);
        }
    }

    async obtenerPerfil(req, res, next) {
        try {
            const { id } = req.params;
            const perfil = await this.servicioAutenticacion.consultarPerfilPorId(Number(id));

            return res.status(CodigosEstadoHttp.OK).json({
                exito: true,
                usuario: perfil
            });
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ControladorEndpointsAutenticacion;

