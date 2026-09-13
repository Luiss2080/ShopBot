# 🛍️ ShopBot V3 Ultra - E-Commerce Asistido por IA

> **El futuro del comercio electrónico impulsado por Inteligencia Artificial y un diseño excepcional.**

![ShopBot Banner](https://via.placeholder.com/1200x400/2563eb/ffffff?text=ShopBot+V3+Ultra+-+E-Commerce+%2B+AI)

Bienvenido a **ShopBot V3 Ultra**, una plataforma de comercio electrónico de última generación. Construida con una sólida arquitectura basada en el estándar **SDD (Spec-Driven Development)**, integra de manera nativa un asistente virtual conversacional, un diseño fluido adaptativo y un entorno altamente testeado.

---

## ✨ Novedades y Funcionalidades Clave

### 🎨 Diseño Premium e Interactivo
- **Dark Mode (Modo Oscuro) Nativo:** Adaptación instantánea a tus preferencias del sistema operativo o interruptor manual, potenciado por Tailwind CSS.
- **Glassmorphism & Micro-interacciones:** Modales, widgets de chat y tarjetas que reaccionan a tus movimientos usando **Framer Motion**.
- **SPA Inmersiva:** Navegación fluida sin recargas de página con React Router v6.

### 🤖 Asistente de IA (ShopBot AI)
- **Comprensión Avanzada:** Capaz de entender tus intenciones mediante `Node-NLP`.
- **Catálogo Interactivo:** Ya no solo devuelve texto. Si consultas por productos, el bot te mostrará de forma visual las tarjetas de producto en el mismo chat, con botones rápidos de compra.
- **Smart Fallbacks:** Si el bot se confunde, te ofrecerá respuestas rápidas (*Quick Replies*) para redirigirte al instante.

### 🏗️ Arquitectura Escalable (SDD)
- **Desarrollo Guiado por Especificación:** Todo el código dice la verdad basándose en los documentos generados en la carpeta `spect/`.
- **Inyección de Servicios:** Patrón Arquitectónico claro separando los `controladores` de los `servicios` para un mantenimiento ágil.
- **Testing Continuo:** Cobertura de pruebas sólidas implementadas con `Jest` y `Supertest`.

---

## 🛠️ Stack Tecnológico

| Entorno | Tecnologías |
| :--- | :--- |
| **Frontend** | React 18 (Vite), Tailwind CSS v3, Framer Motion, Lucide React, React Router DOM v6 |
| **Backend** | Node.js, Express 5, Node-NLP, Sequelize ORM |
| **Testing & BD** | Jest, Supertest, SQLite |

---

## 🚀 Instalación y Despliegue Rápido

Ejecutar todo el entorno de desarrollo nunca fue tan fácil.

### 1. Clona e instala dependencias
```bash
# Backend
npm install

# Frontend
cd cliente
npm install
```

### 2. Arranca el Entorno Completo
Hemos automatizado el despliegue concurrente. Desde la raíz del proyecto, ejecuta:
```bash
npm run dev:all
```
*(Este comando iniciará el servidor API y el cliente Vite al mismo tiempo).*

### 3. Ejecuta los Tests
Para verificar la salud del backend y sus endpoints:
```bash
npm test
```

---

## 📍 Rutas de Acceso

- 🖥️ **Plataforma Web (React):** [http://localhost:5173](http://localhost:5173)
- 🔌 **Servidor API:** [http://localhost:3000/api](http://localhost:3000/api)
- 📚 **Swagger (Documentación):** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 🧠 Prueba el ChatBot

Una vez que la aplicación esté corriendo, haz clic en el icono inferior derecho y dile al bot:

1. *"Quiero comprar un producto"* ➡️ El bot te devolverá un mini-catálogo renderizado en el chat con botones para añadir directamente al carrito.
2. *"Adgjlj"* (texto al azar) ➡️ El bot te responderá educadamente y te ofrecerá botones interactivos (Quick Replies) para ayudarte a encontrar tu camino.

---

<p align="center">
  <b>Hecho con ❤️ para la revolución del E-Commerce | ShopBot Inc. © 2026</b>
</p>
