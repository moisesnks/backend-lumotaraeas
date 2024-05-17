// Path: middleware/requiereAuth.cjs

const { auth } = require('../config.cjs');

function requiereAuth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    auth.verifyIdToken(token)
        .then((decodedToken) => {
            req.user = decodedToken;
            next();
        })
        .catch((error) => {
            console.error('Error al verificar token:', error);
            return res.status(401).json({ message: 'No autorizado' });
        });
}

module.exports = requiereAuth;