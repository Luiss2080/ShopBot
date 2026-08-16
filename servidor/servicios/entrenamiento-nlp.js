const { NlpManager } = require('node-nlp');
const fs = require('fs');
const path = require('path');

const manager = new NlpManager({ languages: ['es'], forceNER: true });
const modelPath = path.join(__dirname, '..', '..', 'modelo.nlp');

async function entrenar() {
    // Saludos
    manager.addDocument('es', 'hola', 'saludo');
    manager.addDocument('es', 'buenos dias', 'saludo');
    manager.addDocument('es', 'buenas tardes', 'saludo');
    manager.addDocument('es', 'buenas noches', 'saludo');
    manager.addDocument('es', 'que tal', 'saludo');

    // Despedidas
    manager.addDocument('es', 'adios', 'despedida');
    manager.addDocument('es', 'hasta luego', 'despedida');
    manager.addDocument('es', 'nos vemos', 'despedida');
    manager.addDocument('es', 'chao', 'despedida');

    // Consulta de producto
    manager.addDocument('es', 'estoy buscando %producto%', 'consulta_producto');
    manager.addDocument('es', 'tienen %producto%', 'consulta_producto');
    manager.addDocument('es', 'quiero comprar %producto%', 'consulta_producto');
    manager.addDocument('es', 'muestrame sus %producto%', 'consulta_producto');
    manager.addDocument('es', 'que %producto% tienen', 'consulta_producto');

    // Consulta de precio
    manager.addDocument('es', 'cuanto cuesta %producto%', 'consulta_precio');
    manager.addDocument('es', 'que precio tiene %producto%', 'consulta_precio');
    manager.addDocument('es', 'cual es el valor de %producto%', 'consulta_precio');
    manager.addDocument('es', 'precio de %producto%', 'consulta_precio');

    // Agregar al carrito
    manager.addDocument('es', 'agregar al carrito', 'agregar_carrito');
    manager.addDocument('es', 'añadir al carro', 'agregar_carrito');
    manager.addDocument('es', 'comprar esto', 'agregar_carrito');
    manager.addDocument('es', 'me lo llevo', 'agregar_carrito');
    manager.addDocument('es', 'ponlo en mi carrito', 'agregar_carrito');

    // Ver carrito
    manager.addDocument('es', 'ver mi carrito', 'ver_carrito');
    manager.addDocument('es', 'que tengo en el carrito', 'ver_carrito');
    manager.addDocument('es', 'mostrar carrito', 'ver_carrito');

    console.log('🧠 Entrenando modelo NLP...');
    await manager.train();
    manager.save(modelPath);
    console.log('✅ Modelo NLP entrenado y guardado en', modelPath);
}

module.exports = { manager, entrenar, modelPath };

// Si se ejecuta directamente
if (require.main === module) {
    entrenar();
}
