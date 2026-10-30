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
- [x] Soporte completo de Dark/Light mode accesible (`ProveedorPreferenciaTema.jsx`).
- [x] Búsqueda global reactiva conectada al catálogo con query params.

## Fase 5: Dominio de Órdenes y Checkout Transaccional
- [x] Crear migraciones de base de datos para `Ordenes` y `DetallesOrden`.
- [x] Implementar dominio de órdenes en backend (`servidor/dominios/ordenes`).
- [x] Transacciones gestionadas ACID para crear orden y vaciar carrito en una sola operación.
- [x] Desacoplar `Checkout.jsx` en componentes atómicos (`FormularioDatosEnvio`, `FormularioMetodoPago`, `PanelResumenOrden`, `TarjetaConfirmacionExitosa`).
- [x] Implementar cliente HTTP `ClienteApiOrdenes` y hook `useFlujoProcesoCheckout`.
- [x] Añadir pruebas unitarias y de integración de órdenes (10 suites, 23 tests pasando).

## Fase 6: Dominio de Autenticación y Cuentas de Usuario
- [x] Crear migración de base de datos para la tabla `Usuarios` con email único.
- [x] Implementar servicio de hashing criptográfico seguro con `scrypt` y sal aleatoria (`crypto` nativo).
- [x] Implementar dominio de autenticación backend (`servidor/dominios/autenticacion`).
- [x] Crear contexto de estado global `ProveedorEstadoSesion.jsx` con persistencia en `localStorage`.
- [x] Conectar formulario interactivo de login y registro en el frontend (`FormularioCredencialesCliente.jsx`).
- [x] Actualizar cabecera con perfil de usuario y opción de cierre de sesión (`CabeceraNavegacionPrincipal.jsx`).
- [x] Añadir pruebas unitarias y de integración de autenticación (12 suites, 31 tests pasando al 100%).

## Fase 7: Perfeccionamiento Conversacional, Historial de Pedidos y Cobertura Formal
- [x] Implementar intenciones conversacionales `consulta_precio` y `agregar_carrito` con extracción de stop-words y búsqueda contextual en `GeneradorRespuestasContextuales.js`.
- [x] Crear suite de pruebas unitarias exhaustiva `GeneradorRespuestasContextuales.test.js` (12 nuevos tests, 100% de cobertura de líneas del generador).
- [x] Implementar visualizador de historial de pedidos `HistorialPedidosCliente.jsx` conectado a `ClienteApiOrdenes.obtenerHistorialOrdenesSesion()`.
- [x] Integrar selector de pestaña entre Perfil y Mis Pedidos en `FormularioCredencialesCliente.jsx`.
- [x] Eliminar shims obsoletos (`cliente/src/components` y `cliente/src/services/api.js`) y migrar rutas directas en `App.jsx`, `Home.jsx`, `Catalog.jsx`, `Offers.jsx`.
- [x] Crear `WidgetChatbotConversacional.jsx` en el módulo de asistente-conversacional.
- [x] Configurar `jest.config.js` y script `"test:coverage"` en `package.json` con umbral mínimo de 70% de cobertura.
- [x] Cobertura global alcanzada de 78% y 100% tests aprobados (13 suites, 43 pruebas unitarias e integración).
