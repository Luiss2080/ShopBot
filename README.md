# ShopBot V3 - E-Commerce Asistido por IA 🚀

![ShopBot Banner](https://via.placeholder.com/1200x400/2563eb/ffffff?text=ShopBot+V3+-+React+%2B+Node.js)

ShopBot V3 es una plataforma de comercio electrónico moderna, impulsada por Inteligencia Artificial y construida bajo una estricta arquitectura **MVC** en el backend y **React (SPA)** en el frontend.

Diseñada con **Tailwind CSS**, la nueva interfaz ofrece una experiencia premium e intuitiva, permitiendo a los usuarios navegar por productos, manejar su carrito y hablar con un asistente virtual de IA (NLP) en tiempo real.

---

## ✨ Novedades en la Versión 3

- **Frontend Moderno (React + Vite):** Todo el sistema visual ahora es una Single Page Application (SPA), garantizando tiempos de carga instantáneos sin recargar la página.
- **Diseño Premium con Tailwind CSS v3:** Interfaz moderna, tarjetas de producto con efectos de elevación, chat flotante y notificaciones elegantes (Toasts).
- **Arquitectura Backend MVC:** Código estructurado profesionalmente separando Modelos, Vistas (React) y Controladores.
- **Base de Datos ORM (Sequelize):** Manejo robusto de la base de datos (SQLite) mediante migraciones y seeders.
- **Asistente NLP Integrado:** Chatbot inteligente capaz de entender el lenguaje natural e interactuar con el carrito.

---

## 🛠️ Tecnologías Utilizadas

### Frontend (Cliente)
- **React 18** (vía Vite)
- **Tailwind CSS v3** para estilizado utilitario.
- **Axios** para consumo de API REST.
- **Lucide React** para iconografía moderna.
- **React Hot Toast** para notificaciones.

### Backend (Servidor)
- **Node.js** con **Express**.
- **Sequelize ORM** (con SQLite para fácil portabilidad).
- **Node-NLP** para procesamiento de lenguaje natural.
- **Concurrently** para orquestación de servicios en una sola terminal.

---

## 🚀 Instalación y Ejecución

Olvídate de abrir múltiples terminales. Hemos integrado todo en un solo flujo.

### Prerrequisitos
- Node.js (v18+)
- NPM o Yarn

### Paso 1: Clonar y Ejecutar
Simplemente ejecuta el script de inicio mágico que instalará todas las dependencias (si faltan) y arrancará tanto la API como el cliente React en la misma consola.

**En la terminal integrada de VS Code, ejecuta:**
```bash
./scripts/start.bat
```
*(O puedes correr manualmente `npm install` y luego `npm run dev:all` en la raíz del proyecto).*

### Paso 2: Navegar
- **Frontend (App):** Abre tu navegador en `http://localhost:5173`
- **Backend (API):** Operando en `http://localhost:3000/api`

---

## 📂 Estructura del Proyecto

El proyecto está organizado de manera modular, manteniendo archivos pequeños y enfocados:

```text
ShopBot/
├── cliente/                  # ⚛️ Frontend React (Vite)
│   ├── src/
│   │   ├── components/       # Componentes de UI modulares (< 200 líneas)
│   │   │   ├── Header.jsx
│   │   │   ├── ProductList.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   └── ChatWidget.jsx
│   │   ├── services/         # Consumo de API (api.js)
│   │   ├── App.jsx           # Layout principal
│   │   └── index.css         # Configuración Tailwind
│   └── tailwind.config.js    # Paleta de colores "brand" y utilidades
│
├── servidor/                 # ⚙️ Backend Node.js
│   ├── controladores/        # Lógica de negocio (MVC)
│   ├── models/               # Modelos de Sequelize (Producto, Carrito)
│   ├── migrations/           # Historial de versiones de BD
│   ├── seeders/              # Datos iniciales (Demo productos)
│   ├── rutas/                # Endpoints API REST (/api/*)
│   └── utilidades/           # NLP y configuraciones globales
│
├── scripts/                  # 🚀 Utilidades automatizadas
│   └── start.bat             # Launcher unificado
│
├── shopbot-dev.sqlite        # 🗄️ Base de datos local
└── index.js                  # Punto de entrada Express
```

---

## 🤖 El Asistente IA (ShopBot)

El ChatWidget flotante (esquina inferior derecha) se conecta al motor `Node-NLP` del servidor. 
- **Saluda:** *"Hola", "Buenos días"*
- **Pide ayuda:** *"¿Qué puedes hacer?", "Ayuda"*
- **Interactúa con el carrito:** Puedes decirle "Quiero agregar esto al carrito" y el bot disparará la acción en tu interfaz conectada a React.

---

## 📝 Licencia

Este proyecto fue desarrollado bajo estrictos lineamientos de calidad para demostrar la integración de IA clásica con arquitecturas web de vanguardia.
