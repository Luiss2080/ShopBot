'use strict';

module.exports = {
  up: async (queryInterface) => {
    const ahora = new Date();
    const fechaFutura = new Date(ahora.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 año de vigencia

    await queryInterface.bulkInsert('Cupones', [
      {
        codigo: 'SHOPBOT10',
        descripcion: '10% de descuento en toda la tienda',
        porcentajeDescuento: 10.0,
        descuentoFijo: 0.0,
        montoMinimo: 0.0,
        activo: true,
        fechaExpiracion: fechaFutura,
        createdAt: ahora,
        updatedAt: ahora
      },
      {
        codigo: 'BIENVENIDA20',
        descripcion: '$20 de descuento en compras mayores a $100',
        porcentajeDescuento: 0.0,
        descuentoFijo: 20.0,
        montoMinimo: 100.0,
        activo: true,
        fechaExpiracion: fechaFutura,
        createdAt: ahora,
        updatedAt: ahora
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Cupones', null, {});
  }
};

