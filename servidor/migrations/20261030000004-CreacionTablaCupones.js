'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cupones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      codigo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true
      },
      porcentajeDescuento: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      descuentoFijo: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      montoMinimo: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      activo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      fechaExpiracion: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Cupones');
  }
};

