'use strict';

const RepositorioCuponesSequelize = require('../repositorios/RepositorioCuponesSequelize');

class ServicioGestionCupones {
    constructor(repositorioCupones = new RepositorioCuponesSequelize()) {
        this.repositorioCupones = repositorioCupones;
    }

    async validarYAplicarCupon(codigo, montoTotal) {
        const cupon = await this.repositorioCupones.obtenerPorCodigo(codigo);

        if (!cupon) {
            const error = new Error(`El cupón "${codigo}" no existe.`);
            error.codigoHttp = 404;
            throw error;
        }

        if (!cupon.activo) {
            const error = new Error(`El cupón "${codigo}" ya no está activo.`);
            error.codigoHttp = 400;
            throw error;
        }

        if (cupon.fechaExpiracion && new Date(cupon.fechaExpiracion) < new Date()) {
            const error = new Error(`El cupón "${codigo}" ha expirado.`);
            error.codigoHttp = 400;
            throw error;
        }

        if (cupon.montoMinimo && Number(montoTotal) < Number(cupon.montoMinimo)) {
            const error = new Error(`El cupón "${codigo}" requiere una compra mínima de $${Number(cupon.montoMinimo).toFixed(2)}.`);
            error.codigoHttp = 400;
            throw error;
        }

        let descuentoCalculado = 0;
        if (cupon.porcentajeDescuento > 0) {
            descuentoCalculado = (Number(montoTotal) * Number(cupon.porcentajeDescuento)) / 100;
        } else if (cupon.descuentoFijo > 0) {
            descuentoCalculado = Number(cupon.descuentoFijo);
        }

        descuentoCalculado = Math.min(Number(montoTotal), descuentoCalculado);
        const montoFinal = Math.max(0, Number(montoTotal) - descuentoCalculado);

        return {
            valido: true,
            codigo: cupon.codigo,
            descripcion: cupon.descripcion,
            porcentajeDescuento: cupon.porcentajeDescuento,
            descuentoFijo: cupon.descuentoFijo,
            descuento: Number(descuentoCalculado.toFixed(2)),
            montoFinal: Number(montoFinal.toFixed(2))
        };
    }

    async obtenerListaCuponesVigentes() {
        const cupones = await this.repositorioCupones.obtenerCuponesVigentes();
        return cupones.map(c => (c.toJSON ? c.toJSON() : c));
    }
}

module.exports = ServicioGestionCupones;
