'use strict';

const express = require('express');
const ControladorEndpointsAutenticacion = require('../controladores/ControladorEndpointsAutenticacion');

function crearEnrutadorAutenticacion(controlador = new ControladorEndpointsAutenticacion()) {
    const enrutador = express.Router();

    enrutador.post('/registro', controlador.registrar);
    enrutador.post('/iniciar-sesion', controlador.iniciarSesion);
    enrutador.get('/perfil/:id', controlador.obtenerPerfil);

    return enrutador;
}

module.exports = crearEnrutadorAutenticacion;

