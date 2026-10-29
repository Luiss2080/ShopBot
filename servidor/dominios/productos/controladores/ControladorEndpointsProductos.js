'use strict';

const ServicioGestionProductos = require('../servicios/ServicioGestionProductos');
const ValidadorConsultaProductos = require('../validadores/ValidadorConsultaProductos');
const CodigosEstadoHttp = require('../../../constantes/CodigosEstadoHttp');

class ControladorEndpointsProductos {
    constructor(servicioProductos = new ServicioGestionProductos()) {
        this.servicioProductos = servicioProductos;
        this.obtenerTodos = this.obtenerTodos.bind(this);
        this.obtenerPorId = this.obtenerPorId.bind(this);
        this.buscar = this.buscar.bind(this);
        this.obtenerPorCategoria = this.obtenerPorCategoria.bind(this);
    }

    async obtenerTodos(req, res, next) {
        try {
            const catalogo = await this.servicioProductos.listarCatalogoCompleto();
            return res.status(CodigosEstadoHttp.OK).json(catalogo);
        } catch (error) {
            return next(error);
        }
    }

    async obtenerPorId(req, res, next) {
        try {
            const validacion = ValidadorConsultaProductos.validarIdentificadorProducto(req.params.id);
            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    error: validacion.mensajeError
                });
            }

            const producto = await this.servicioProductos.obtenerDetalleProducto(validacion.idNumerico);
            return res.status(CodigosEstadoHttp.OK).json(producto);
        } catch (error) {
            return next(error);
        }
    }

    async buscar(req, res, next) {
        try {
            const validacion = ValidadorConsultaProductos.validarTerminoBusqueda(req.query.q);
            if (!validacion.esValido) {
                return res.status(CodigosEstadoHttp.SOLICITUD_INCORRECTA).json({
                    error: validacion.mensajeError
                });
            }

            const resultados = await this.servicioProductos.buscarProductosPorCoincidencia(validacion.valorSanitizado);
            return res.status(CodigosEstadoHttp.OK).json(resultados);
        } catch (error) {
            return next(error);
        }
    }

    async obtenerPorCategoria(req, res, next) {
        try {
            const { categoria } = req.params;
            const productos = await this.servicioProductos.filtrarPorCategoria(categoria);
            return res.status(CodigosEstadoHttp.OK).json(productos);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = ControladorEndpointsProductos;

