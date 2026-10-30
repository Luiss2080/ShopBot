'use strict';

const ModeloOrdenSequelize = require('../modelos/ModeloOrdenSequelize');
const ModeloDetalleOrdenSequelize = require('../modelos/ModeloDetalleOrdenSequelize');
const instanciaSequelize = require('../../../configuracion/ConfiguracionBaseDatosSequelize');

class RepositorioOrdenesSequelize {
    constructor(
        modeloOrden = ModeloOrdenSequelize,
        modeloDetalle = ModeloDetalleOrdenSequelize,
        conexionBd = instanciaSequelize
    ) {
        this.modeloOrden = modeloOrden;
        this.modeloDetalle = modeloDetalle;
        this.conexionBd = conexionBd;
    }

    async crearOrdenConDetalles({ datosOrden, itemsDetalle }, transaccion = null) {
        const ejecutarCreacion = async (t) => {
            const nuevaOrden = await this.modeloOrden.create(datosOrden, { transaction: t });
            
            const detallesConOrdenId = itemsDetalle.map(item => ({
                ...item,
                ordenId: nuevaOrden.id
            }));

            const detallesCreados = await this.modeloDetalle.bulkCreate(detallesConOrdenId, { transaction: t });

            return {
                orden: nuevaOrden,
                detalles: detallesCreados
            };
        };

        if (transaccion) {
            return await ejecutarCreacion(transaccion);
        }

        return await this.conexionBd.transaction(async (t) => {
            return await ejecutarCreacion(t);
        });
    }

    async obtenerPorId(idOrden) {
        return await this.modeloOrden.findByPk(idOrden, {
            include: [{
                model: this.modeloDetalle,
                as: 'detalles'
            }]
        });
    }

    async obtenerPorNumeroOrden(numeroOrden) {
        return await this.modeloOrden.findOne({
            where: { numeroOrden },
            include: [{
                model: this.modeloDetalle,
                as: 'detalles'
            }]
        });
    }

    async obtenerPorSesion(sessionId) {
        return await this.modeloOrden.findAll({
            where: { sessionId },
            include: [{
                model: this.modeloDetalle,
                as: 'detalles'
            }],
            order: [['createdAt', 'DESC']]
        });
    }
}

module.exports = RepositorioOrdenesSequelize;

