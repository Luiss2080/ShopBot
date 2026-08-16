// Servicio para comunicación con el API
class ServicioAPI {
    constructor() {
        this.urlBase = '/api';
        this.sessionId = this.obtenerOSetearSessionId();
    }

    obtenerOSetearSessionId() {
        let id = localStorage.getItem('shopbot_session_id');
        if (!id) {
            // Generar UUID v4 simple para el cliente
            id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            localStorage.setItem('shopbot_session_id', id);
        }
        return id;
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'x-session-id': this.sessionId
        };
    }

    /**
     * Realiza una petición GET
     * @param {string} endpoint - Endpoint del API
     * @returns {Promise}
     */
    async obtener(endpoint) {
        try {
            const respuesta = await fetch(`${this.urlBase}${endpoint}`, {
                headers: this.getHeaders()
            });
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
                headers: this.getHeaders(),
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
                headers: this.getHeaders(),
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
                method: 'DELETE',
                headers: this.getHeaders()
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
