// Middleware de validación de solicitudes
class ValidadorSolicitud {
    /**
     * Valida que el body tenga los campos requeridos
     * @param {Array} camposRequeridos - Lista de campos requeridos
     */
    static validarCampos(camposRequeridos) {
        return (req, res, next) => {
            const camposFaltantes = [];

            for (const campo of camposRequeridos) {
                if (!req.body[campo]) {
                    camposFaltantes.push(campo);
                }
            }

            if (camposFaltantes.length > 0) {
                return res.status(400).json({
                    exito: false,
                    error: 'Campos requeridos faltantes',
                    campos: camposFaltantes
                });
            }

            next();
        };
    }

    /**
     * Valida que un parámetro sea un ID válido
     */
    static validarId(nombreParametro = 'id') {
        return (req, res, next) => {
            const id = req.params[nombreParametro];

            if (!id || id.trim().length === 0) {
                return res.status(400).json({
                    exito: false,
                    error: `El parámetro ${nombreParametro} es inválido`
                });
            }

            next();
        };
    }
}

module.exports = ValidadorSolicitud;
