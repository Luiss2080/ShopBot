# Especificación de Mejoras (ShopBot)

## 1. Introducción
El objetivo de esta especificación es definir las mejoras estructurales, de interfaz de usuario (frontend), pruebas automáticas y nuevas funcionalidades para el proyecto ShopBot. 

## 2. Requisitos Funcionales (Notación EARS)

### Arquitectura
- **Cuando** se inicie el servidor, **el sistema deberá** utilizar un patrón de inyección de dependencias para los controladores y servicios, facilitando el testing.
- **En todo momento**, **el sistema deberá** centralizar el manejo de errores en un middleware dedicado.

### Frontend (Interfaz de Usuario)
- **Cuando** el usuario interactúe con el chat, **el sistema deberá** mostrar animaciones fluidas utilizando Tailwind CSS.
- **Si** el usuario cambia el tema del sistema operativo, **el sistema deberá** adaptar los colores a modo oscuro/claro automáticamente.
- **Cuando** el cliente visualice sus órdenes en el perfil, **el sistema deberá** proporcionar una línea de tiempo gráfica de seguimiento de envío.
- **Cuando** el cliente esté en el proceso de checkout, **el sistema deberá** permitir ingresar y validar cupones de descuento en el resumen de orden.

### Tests
- **Cuando** se haga una modificación en el modelo NLP, **el sistema deberá** ejecutar un conjunto de pruebas unitarias usando Jest o Vitest para asegurar su precisión.
- **En todo momento**, **el sistema deberá** mantener una cobertura de código de al menos 70% en el servidor (alcanzado >80%).

### Funcionalidades
- **Cuando** el cliente solicite el catálogo de productos, **el sistema deberá** devolver una lista enriquecida con imágenes y enlaces de pago.
- **Si** el bot no entiende la solicitud, **el sistema deberá** ofrecer un menú interactivo con las opciones más comunes.
- **Cuando** el cliente solicite el estado o rastreo de su compra al asistente, **el sistema deberá** verificar el número de pedido o la última orden de la sesión y responder con el estado actual y fecha de emisión.
- **Cuando** el usuario consulte al asistente por promociones o descuentos, **el sistema deberá** responder con los cupones activos disponibles e incentivar la compra.

## 3. Restricciones
- El backend seguirá utilizando Express y Sequelize.
- El frontend seguirá utilizando Vite + Tailwind CSS.
- Todo código nuevo debe contar con su especificación aquí antes de ser implementado.
