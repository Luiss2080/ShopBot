'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productos', [
      {
        nombre: 'Laptop Dell XPS 13',
        descripcion: 'Laptop ultraligera ideal para desarrollo y diseño',
        precio: 1299.99,
        categoria: 'laptops',
        stock: 15,
        imagen: 'laptop.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Mouse Logitech MX Master 3',
        descripcion: 'Mouse ergonómico inalámbrico con carga rápida',
        precio: 99.99,
        categoria: 'accesorios',
        stock: 50,
        imagen: 'mouse.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Monitor LG UltraWide 34"',
        descripcion: 'Monitor curvo para máxima productividad',
        precio: 450.00,
        categoria: 'monitores',
        stock: 10,
        imagen: 'monitor.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};
