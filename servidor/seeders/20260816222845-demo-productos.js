'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productos', [
      {
        nombre: 'MacBook Pro M3 Max 16"',
        descripcion: 'Portátil de altísimo rendimiento con chip M3 Max, 36GB RAM y 1TB SSD. Ideal para profesionales creativos y desarrolladores exigentes.',
        precio: 3499.00,
        categoria: 'laptops',
        stock: 5,
        imagen: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Dell XPS 15',
        descripcion: 'Elegancia y potencia en Windows. Pantalla OLED 4K, Intel Core i9, 32GB RAM y NVIDIA RTX 4070. Chasis de aluminio mecanizado.',
        precio: 2299.99,
        categoria: 'laptops',
        stock: 12,
        imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Teclado Keychron Q1 Pro',
        descripcion: 'Teclado mecánico inalámbrico custom de formato 75%. Cuerpo de aluminio sólido, soporte QMK/VIA y conectividad Bluetooth.',
        precio: 199.00,
        categoria: 'accesorios',
        stock: 25,
        imagen: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Logitech MX Master 3S',
        descripcion: 'El ratón definitivo para la productividad. Clics silenciosos, sensor de 8K DPI para cualquier superficie y scroll MagSpeed.',
        precio: 99.99,
        categoria: 'accesorios',
        stock: 40,
        imagen: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Monitor LG UltraWide 34" Curved',
        descripcion: 'Inmersión total para tu setup. Panel Nano IPS, 144Hz, resolución WQHD (3440 x 1440) y soporte HDR 400.',
        precio: 650.00,
        categoria: 'monitores',
        stock: 8,
        imagen: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Auriculares Sony WH-1000XM5',
        descripcion: 'Cancelación de ruido líder en la industria. Audio Hi-Res inalámbrico y batería de 30 horas. Comodidad extrema.',
        precio: 348.00,
        categoria: 'audio',
        stock: 15,
        imagen: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Monitor Apple Studio Display',
        descripcion: 'Monitor Retina 5K de 27 pulgadas. Cámara ultra gran angular de 12 MP con Encuadre Centrado y audio espacial.',
        precio: 1599.00,
        categoria: 'monitores',
        stock: 3,
        imagen: 'https://images.unsplash.com/photo-1551645120-d70bfe84c826?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Micrófono Shure SM7B',
        descripcion: 'El estándar de la industria para podcasting y streaming. Rechazo electromagnético avanzado y filtro anti-pop integrado.',
        precio: 399.00,
        categoria: 'audio',
        stock: 10,
        imagen: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=800',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};
