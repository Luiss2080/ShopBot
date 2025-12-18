// Utilidad para almacenamiento local
class AlmacenamientoLocal {
    /**
     * Guarda un dato en localStorage
     * @param {string} clave - Clave del dato
     * @param {any} valor - Valor a guardar
     */
    static guardar(clave, valor) {
        try {
            const valorSerializado = JSON.stringify(valor);
            localStorage.setItem(clave, valorSerializado);
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }

    /**
     * Obtiene un dato de localStorage
     * @param {string} clave - Clave del dato
     * @returns {any}
     */
    static obtener(clave) {
        try {
            const valorSerializado = localStorage.getItem(clave);
            return valorSerializado ? JSON.parse(valorSerializado) : null;
        } catch (error) {
            console.error('Error al obtener de localStorage:', error);
            return null;
        }
    }

    /**
     * Elimina un dato de localStorage
     * @param {string} clave - Clave del dato a eliminar
     */
    static eliminar(clave) {
        localStorage.removeItem(clave);
    }

    /**
     * Limpia todo el localStorage
     */
    static limpiarTodo() {
        localStorage.clear();
    }

    /**
     * Verifica si existe una clave
     * @param {string} clave - Clave a verificar
     * @returns {boolean}
     */
    static existe(clave) {
        return localStorage.getItem(clave) !== null;
    }
}

window.AlmacenamientoLocal = AlmacenamientoLocal;
