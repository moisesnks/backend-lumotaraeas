// Path: controller/users/getUser.cjs

const User = require('../../models/userModel.cjs');

async function getUser(uid) {
    try {
        // Llama al método estático getUser(uid) de la clase User
        const user = await User.getUser(uid);
        return user;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
}

module.exports = getUser;
