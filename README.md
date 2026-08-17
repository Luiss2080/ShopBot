# ShopBot V3 Ultra - E-Commerce Asistido por IA 🚀

![ShopBot Banner](https://via.placeholder.com/1200x400/2563eb/ffffff?text=ShopBot+V3+Ultra+-+E-Commerce+%2B+AI)

ShopBot V3 Ultra es la evolución definitiva de nuestra plataforma de comercio electrónico. Construida sobre una arquitectura robusta **MVC** en el backend y una **SPA** en React, esta versión incluye características de nivel de producción, diseño premium adaptativo (Dark Mode) y un asistente de Inteligencia Artificial integrado.

---

## ✨ Características Principales (V3 Ultra)

- **Arquitectura Multi-Página:** Enrutamiento real con `React Router` (Inicio, Catálogo, Ofertas, Acerca de, Checkout).
- **Animaciones Nativas (Framer Motion):** Transiciones de página sin cortes, modales de vista rápida y efectos de Hover premium en todo el sitio.
- **Dark Mode (Modo Oscuro):** Un interruptor interactivo que cambia completamente el estilo de la plataforma al instante usando Tailwind CSS.
- **Flujo de Checkout Realista:** Proceso animado de 3 pasos (Envío -> Pago -> Éxito) que finaliza vaciando la orden en la Base de Datos.
- **IA Conversacional:** El ChatBot flotante comprende tus intenciones (vía `Node-NLP`) y puede añadir productos a tu carrito por ti.
- **Imágenes Reales en Alta Calidad:** Seeder conectado a URLs dinámicas de Unsplash para darle vida al catálogo.

---

## 🛠️ Stack Tecnológico

### Frontend (Cliente)
- **React 18** (Vite)
- **React Router DOM v6** (Enrutamiento)
- **Tailwind CSS v3** (Estilos y Dark Mode)
- **Framer Motion** (Animaciones de UI complejas)
- **Lucide React** (Iconografía ligera y escalable)
- **React Hot Toast** (Notificaciones modernas)

### Backend (Servidor)
- **Node.js + Express 5** (API RESTFUL y Catch-all routing)
- **Sequelize ORM** (Modelado de datos)
- **SQLite** (Base de datos persistente)
- **Node-NLP** (Motor de procesamiento de lenguaje natural)

---

## 🚀 Instalación y Ejecución Rápida

Hemos creado un `launcher` automatizado para que no tengas que preocuparte por múltiples terminales.

**Abre la terminal de VS Code y ejecuta:**
```bash
./scripts/start.bat
```

*(O puedes correr manualmente `npm install` en la raíz, `npm install` en `/cliente` y luego `npm run dev:all`)*.

### Rutas Locales
- **Aplicación (React):** `http://localhost:5173`
- **Servidor API:** `http://localhost:3000/api`

---

## 📂 Estructura del Frontend (`/cliente`)

El Frontend fue rediseñado bajo estándares de escalabilidad:

```text
cliente/src/
├── components/
│   ├── layout/            # Header (con Dark Mode Toggle) y Mega-Footer
│   ├── CartDrawer.jsx     # Slide-over del carrito con Framer Motion
│   ├── ChatWidget.jsx     # Chat de IA con animaciones de escritura
│   ├── ProductCard.jsx    # Tarjeta de producto con Hover reveal
│   ├── ProductList.jsx    # Grid con filtros dinámicos
│   └── QuickViewModal.jsx # Modal expansivo (Glassmorphism)
├── pages/
│   ├── Home.jsx           # Landing page (Hero, Features, Newsletter)
│   ├── Catalog.jsx        # Catálogo Full-screen
│   ├── Offers.jsx         # Promociones con banner especial
│   ├── About.jsx          # Sección corporativa
│   └── Checkout.jsx       # Proceso de compra (3 pasos)
├── services/              # Llamadas Axios al backend
├── App.jsx                # Router Provider y <AnimatePresence>
└── main.jsx               # Punto de anclaje de React
```

---

## 🤖 Interactuando con la IA

Prueba abrir el chat flotante en la esquina inferior derecha y dile al bot:
> *"Hola, quiero comprar algo"* o *"Agregar producto al carrito"*.

El bot disparará un evento global en React que sincronizará la interfaz con el backend de manera inmediata.

---

**ShopBot Inc. © 2026** - *El Futuro del Comercio.*
