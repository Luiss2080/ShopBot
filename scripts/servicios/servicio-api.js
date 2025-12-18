// Servicio para comunicación con el API
class ServicioAPI {
    constructor() {
        this.urlBase = '/api';
    }

    /**
     * Realiza una petición GET
     * @param {string} endpoint - Endpoint del API
     * @returns {Promise}
     */
    async obtener(endpoint) {
        try {
            const respuesta = await fetch(`${this.urlBase}${endpoint}`);
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            return await respuesta.json();
        } catch (error) {
            console.error('Error en petición GET:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición POST
     * @param {string} endpoint - Endpoint del API
     * @param {object} datos - Datos a enviar
     * @returns {Promise}
     */
    async enviar(endpoint, datos) {
        try {
            const respuesta = await fetch(`${this.urlBase}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            
            return await respuesta.json();
        } catch (error) {
            console.error('Error en petición POST:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición PUT
     * @param {string} endpoint - Endpoint del API
     * @param {object} datos - Datos a actualizar
     * @returns {Promise}
     */
    async actualizar(endpoint, datos) {
        try {
            const respuesta = await fetch(`${this.urlBase}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos)
            });
            
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            
            return await respuesta.json();
        } catch (error) {
            console.error('Error en petición PUT:', error);
            throw error;
        }
    }

    /**
     * Realiza una petición DELETE
     * @param {string} endpoint - Endpoint del API
     * @returns {Promise}
     */
    async eliminar(endpoint) {
        try {
            const respuesta = await fetch(`${this.urlBase}${endpoint}`, {
                method: 'DELETE'
            });
            
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }
            
            return await respuesta.json();
        } catch (error) {
            console.error('Error en petición DELETE:', error);
            throw error;
        }
    }
}

window.ServicioAPI = new ServicioAPI();
