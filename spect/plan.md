# Plan de Implementación

## Fase 1: Arquitectura y Refactorización del Backend
1. **Manejo de errores centralizado**: Crear un middleware `errorHandler.js` e integrarlo en `servidor/index.js`.
2. **Refactorización de Servicios**: Separar la lógica de negocio de los controladores a una capa de servicios (`servidor/servicios`).

## Fase 2: Configuración de Entorno de Pruebas
1. **Instalación**: Configurar Jest y Supertest en el backend.
2. **Pruebas de Modelos**: Crear tests básicos para los modelos de base de datos en `servidor/models`.
3. **Pruebas de NLP**: Crear un script de test para validar el umbral de confianza de `modelo.nlp`.

## Fase 3: Mejoras en Frontend
1. **UX/UI**: Refinar los estilos en `cliente/src` usando Tailwind para soportar dark mode.
2. **Componentización**: Dividir la interfaz de chat en componentes más pequeños y reutilizables.

## Fase 4: Nuevas Funcionalidades
1. **Catálogo Mejorado**: Actualizar los endpoints de productos para devolver metadata enriquecida.
2. **Fallback Interactivo**: Implementar un flujo de respuestas de fallback en el bot con opciones clickeables (botones rápidos).
