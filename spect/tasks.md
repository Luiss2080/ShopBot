# Tareas de Arquitectura y Especificación (ShopBot)

## Fase 1: Arquitectura y Modularización por Dominios
- [x] Crear middleware centralizado de manejo de errores (`InterceptorManejoErroresCentralizado.js`).
- [x] Unificar capa de persistencia en Sequelize ORM eliminando SQLite crudo.
- [x] Modularizar backend por dominios funcionales (`productos`, `carrito`, `asistente-chat`).
- [x] Implementar Inyección de Dependencias por Constructor (DIP) en servicios y controladores.

## Fase 2: Tests y Calidad de Código
- [x] Configurar script de testing con `--forceExit` para evitar bloqueos del event loop.
- [x] Escribir pruebas unitarias aisladas para `ServicioGestionProductos` con repositorios mock.
- [x] Escribir pruebas unitarias aisladas para `ServicioGestionCarrito` con validación de subtotales y cantidades.
- [x] Escribir pruebas unitarias para el motor conversacional `ClasificadorIntencionesNlp`.
- [x] Escribir pruebas de integración HTTP para endpoints de `/api/productos`, `/api/carrito` y `/api/chat`.

## Fase 3: Frontend y Desacoplamiento de Componentes
- [x] Modularizar el monolito de chat (`ChatWidget.jsx`) en componentes y hooks especializados < 110 líneas.
- [x] Reemplazar el archivo genérico `api.js` por clientes de dominio (`ClienteApiProductos`, `ClienteApiCarrito`, `ClienteApiChatbot`).
- [x] Desacoplar `CartDrawer` y `LoginModal` en subcomponentes atómicos con responsabilidad única.

## Fase 4: Funcionalidades Enriquecidas
- [x] Respuestas enriquecidas del chatbot con tarjetas de producto y botones de compra directa.
- [x] Sistema de fallback interactivo con opciones rápidas de navegación (chips).
- [x] Manejo de sesión persistente transparente con `x-session-id`.
