// Utilidad para cargar componentes HTML dinámicamente
class CargadorComponentes {
    /**
     * Carga un componente HTML en un contenedor específico
     * @param {string} rutaComponente - Ruta al archivo HTML del componente
     * @param {string} selectorContenedor - Selector CSS del contenedor
     */
    static async cargarComponente(rutaComponente, selectorContenedor) {
        try {
            const respuesta = await fetch(rutaComponente);
            if (!respuesta.ok) {
                throw new Error(`Error al cargar componente: ${rutaComponente}`);
            }
            
            const html = await respuesta.text();
            const contenedor = document.querySelector(selectorContenedor);
            
            if (contenedor) {
                contenedor.innerHTML = html;
            } else {
                console.error(`Contenedor no encontrado: ${selectorContenedor}`);
            }
        } catch (error) {
            console.error('Error en cargarComponente:', error);
        }
    }

    /**
     * Carga múltiples componentes en paralelo
     * @param {Array} componentes - Array de objetos {ruta, selector}
     */
    static async cargarMultiplesComponentes(componentes) {
        const promesas = componentes.map(comp => 
            this.cargarComponente(comp.ruta, comp.selector)
        );
        await Promise.all(promesas);
    }
}

// Exportar para uso global
window.CargadorComponentes = CargadorComponentes;
