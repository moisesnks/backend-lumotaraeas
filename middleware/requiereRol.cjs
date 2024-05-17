// Path: middleware/requiereRol.cjs

const { auth } = require('../config.cjs');

// requiereRol es un middleware que verifica si el usuario tiene el claims de admin, si es así, ejecuta el adminController, de lo contrario, ejecuta el regularController
function requiereRol(adminController, regularController) {
    return (req, res, next) => {
        // el req.header viene con `Bearer ${token}`
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No ha proporcionado un token' });
        }

        auth.verifyIdToken(token)
            .then((claims) => {
                if (claims.admin) {
                    return adminController(req, res, next);
                } else {
                    return regularController(req, res, next);
                }
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    };
}

module.exports = requiereRol;