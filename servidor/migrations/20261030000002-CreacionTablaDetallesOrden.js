'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetallesOrden', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ordenId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ordenes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productoId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      nombreProducto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      precioUnitario: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    await queryInterface.dropTable('DetallesOrden');
  }
};
