// Path: controller/users/getUsers.cjs

const User = require('../../models/userModel.cjs');
const { db } = require('../../config.cjs');

async function getUsers() {
    try {
        const usersSnapshot = await db.collection('users').get(); // Obtener todos los documentos de la colección 'users'
        const users = []; // Array para almacenar los usuarios

        // Iterar sobre los documentos y construir instancias de User
        usersSnapshot.forEach(doc => {
            const userData = doc.data(); // Obtener los datos del documento
            const user = new User(userData); // Construir instancia de User
            users.push(user); // Agregar usuario al array
        });

        return users; // Devolver el array de usuarios
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

module.exports = getUsers;
