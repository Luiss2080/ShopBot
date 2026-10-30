'use strict';

const { Op } = require('sequelize');
const ModeloCuponSequelize = require('../modelos/ModeloCuponSequelize');

class RepositorioCuponesSequelize {
    constructor(modeloCupon = ModeloCuponSequelize) {
        this.modeloCupon = modeloCupon;
    }

    async obtenerPorCodigo(codigo) {
        if (!codigo || typeof codigo !== 'string') return null;
        return await this.modeloCupon.findOne({
            where: {
                codigo: codigo.trim().toUpperCase()
            }
        });
    }

    async obtenerCuponesVigentes() {
        const ahora = new Date();
        return await this.modeloCupon.findAll({
            where: {
                activo: true,
                [Op.or]: [
                    { fechaExpiracion: null },
                    { fechaExpiracion: { [Op.gte]: ahora } }
                ]
            }
        });
    }

    async crearCupon(datosCupon) {
        return await this.modeloCupon.create(datosCupon);
    }
}

module.exports = RepositorioCuponesSequelize;

