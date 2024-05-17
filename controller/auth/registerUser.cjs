// Path: controller/auth/registerUser.cjs

const { createUser } = require('../users/index.cjs');
const loginUser = require('./loginUser.cjs');

const registerUser = async (req, res) => {
    try {
        const { email, password, displayName, photoURL, rut } = req.body;

        // Crea el usuario en Firebase Auth y Firestore
        const data = { email, password, displayName, photoURL, rut };
        await createUser(data, true);

        // Envía la respuesta al cliente con el usuario registrado
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = registerUser;