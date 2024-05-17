// Path: middleware/requiereAdmin.cjs

const { auth } = require('../config.cjs');

// requiereAdmin es un middleware que verifica si el usuario tiene el claims de admin,
// si es así, ejecuta el siguiente handler, de lo contrario, responde con un 401

function requiereAdmin(handler) {
    return (req, res, next) => {
        // el req.header viene con `Bearer ${token}`
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No ha proporcionado un token' });
        }

        auth.verifyIdToken(token)
            .then((claims) => {
                if (claims.admin) {
                    return handler(req, res, next);
                } else {
                    return res.status(401).json({ error: 'No tiene permisos para realizar esta acción' });
                }
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    };
}

module.exports = requiereAdmin;