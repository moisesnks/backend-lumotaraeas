// Path: middleware/requiereAuth.cjs

const { auth } = require('../config.cjs');

function requiereAuth(handler) {
    return (req, res, next) => {
        // el req.header viene con `Bearer ${token}`
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No ha proporcionado un token' });
        }
        auth.verifyIdToken(token)
            .then((decodedToken) => {
                req.user = decodedToken;
                return handler(req, res, next);
            })
            .catch((error) => {
                console.error('Error al verificar token:', error);
                return res.status(401).json({ message: 'No autorizado' });
            });
    };
}

module.exports = requiereAuth;