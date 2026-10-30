'use strict';

const RepositorioUsuariosSequelize = require('../repositorios/RepositorioUsuariosSequelize');
const ServicioCriptografiaContrasenas = require('./ServicioCriptografiaContrasenas');

class ServicioGestionAutenticacion {
    constructor(
        repositorioUsuarios = new RepositorioUsuariosSequelize(),
        servicioCriptografia = ServicioCriptografiaContrasenas
    ) {
        this.repositorioUsuarios = repositorioUsuarios;
        this.servicioCriptografia = servicioCriptografia;
    }

    async registrarNuevoUsuario({ nombre, email, password }) {
        const usuarioExistente = await this.repositorioUsuarios.buscarPorEmail(email);

        if (usuarioExistente) {
            const error = new Error('Ya existe una cuenta registrada con este correo electrónico.');
            error.codigoHttp = 409;
            throw error;
        }

        const salt = this.servicioCriptografia.generarSalAleatoria();
        const passwordHash = this.servicioCriptografia.hashearContrasena(password, salt);

        const nuevoUsuario = await this.repositorioUsuarios.crearUsuario({
            nombre,
            email,
            passwordHash,
            salt,
            rol: 'CLIENTE'
        });

        return nuevoUsuario.obtenerPerfilPublico();
    }

    async autenticarUsuario({ email, password }) {
        const usuario = await this.repositorioUsuarios.buscarPorEmail(email);

        if (!usuario) {
            const error = new Error('Credenciales incorrectas. Verifique su correo y contraseña.');
            error.codigoHttp = 401;
            throw error;
        }

        const esValida = this.servicioCriptografia.verificarContrasena(
            password,
            usuario.passwordHash,
            usuario.salt
        );

        if (!esValida) {
            const error = new Error('Credenciales incorrectas. Verifique su correo y contraseña.');
            error.codigoHttp = 401;
            throw error;
        }

        return usuario.obtenerPerfilPublico();
    }

    async consultarPerfilPorId(idUsuario) {
        const usuario = await this.repositorioUsuarios.buscarPorId(idUsuario);
        if (!usuario) {
            const error = new Error('El usuario no existe.');
            error.codigoHttp = 404;
            throw error;
        }
        return usuario.obtenerPerfilPublico();
    }
}

module.exports = ServicioGestionAutenticacion;
