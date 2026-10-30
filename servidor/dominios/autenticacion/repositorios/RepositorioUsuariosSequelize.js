'use strict';

const ModeloUsuarioSequelize = require('../modelos/ModeloUsuarioSequelize');

class RepositorioUsuariosSequelize {
    constructor(modelo = ModeloUsuarioSequelize) {
        this.modelo = modelo;
    }

    async buscarPorEmail(email) {
        return await this.modelo.findOne({
            where: { email: email.toLowerCase() }
        });
    }

    async buscarPorId(idUsuario) {
        return await this.modelo.findByPk(idUsuario);
    }

    async crearUsuario({ nombre, email, passwordHash, salt, rol }) {
        return await this.modelo.create({
            nombre,
            email: email.toLowerCase(),
            passwordHash,
            salt,
            rol: rol || 'CLIENTE'
        });
    }
}

module.exports = RepositorioUsuariosSequelize;
