'use strict';

const path = require('path');
const { NlpManager } = require('node-nlp');

const rutaArchivoModelo = path.join(__dirname, '..', '..', '..', '..', 'modelo.nlp');

class EntrenadorCorpusConversacional {
    static async entrenarYGuardarModelo(gestorNlp = new NlpManager({ languages: ['es'], forceNER: true })) {
        // Saludos
        gestorNlp.addDocument('es', 'hola', 'saludo');
        gestorNlp.addDocument('es', 'buenos dias', 'saludo');
        gestorNlp.addDocument('es', 'buenas tardes', 'saludo');
        gestorNlp.addDocument('es', 'buenas noches', 'saludo');
        gestorNlp.addDocument('es', 'que tal', 'saludo');

        // Despedidas
        gestorNlp.addDocument('es', 'adios', 'despedida');
        gestorNlp.addDocument('es', 'hasta luego', 'despedida');
        gestorNlp.addDocument('es', 'nos vemos', 'despedida');
        gestorNlp.addDocument('es', 'chao', 'despedida');

        // Consulta de producto y catálogo
        gestorNlp.addDocument('es', 'estoy buscando %producto%', 'consulta_producto');
        gestorNlp.addDocument('es', 'tienen %producto%', 'consulta_producto');
        gestorNlp.addDocument('es', 'quiero comprar %producto%', 'consulta_producto');
        gestorNlp.addDocument('es', 'muestrame sus %producto%', 'consulta_producto');
        gestorNlp.addDocument('es', 'que %producto% tienen', 'consulta_producto');
        gestorNlp.addDocument('es', 'ver catalogo', 'consulta_producto');
        gestorNlp.addDocument('es', 'mostrar catalogo', 'consulta_producto');

        // Consulta de precios
        gestorNlp.addDocument('es', 'cuanto cuesta %producto%', 'consulta_precio');
        gestorNlp.addDocument('es', 'que precio tiene %producto%', 'consulta_precio');
        gestorNlp.addDocument('es', 'cual es el valor de %producto%', 'consulta_precio');
        gestorNlp.addDocument('es', 'precio de %producto%', 'consulta_precio');

        // Carrito
        gestorNlp.addDocument('es', 'agregar al carrito', 'agregar_carrito');
        gestorNlp.addDocument('es', 'añadir al carro', 'agregar_carrito');
        gestorNlp.addDocument('es', 'ver mi carrito', 'ver_carrito');
        gestorNlp.addDocument('es', 'mostrar carrito', 'ver_carrito');

        await gestorNlp.train();
        gestorNlp.save(rutaArchivoModelo);
        return gestorNlp;
    }
}

module.exports = {
    EntrenadorCorpusConversacional,
    rutaArchivoModelo
};
