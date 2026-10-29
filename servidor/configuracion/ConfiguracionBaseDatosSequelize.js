'use strict';

const { Sequelize } = require('sequelize');
const rutaConfiguracion = require('../config/config.json');

const entornoActual = process.env.NODE_ENV || 'development';
const parametrosConexion = rutaConfiguracion[entornoActual];

let instanciaSequelize;

if (parametrosConexion.use_env_variable && process.env[parametrosConexion.use_env_variable]) {
    instanciaSequelize = new Sequelize(process.env[parametrosConexion.use_env_variable], {
        logging: false
    });
} else {
    instanciaSequelize = new Sequelize(
        parametrosConexion.database,
        parametrosConexion.username,
        parametrosConexion.password,
        {
            host: parametrosConexion.host || '127.0.0.1',
            dialect: parametrosConexion.dialect || 'mysql',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

module.exports = instanciaSequelize;
