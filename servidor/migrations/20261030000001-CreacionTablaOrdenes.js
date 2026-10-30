'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ordenes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numeroOrden: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      sessionId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nombreCliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefonoCliente: {
        type: Sequelize.STRING,
        allowNull: false
      },
      direccionEnvio: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0.0
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'COMPLETADO'
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ordenes');
  }
};
