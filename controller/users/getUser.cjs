// Path: controller/users/getUser.cjs

const { db } = require('../../config.cjs');
const User = require('../../models/userModel.cjs');

async function getUser(uid) {
    try {
        const user = await db.collection('users').doc(uid).get();
        if (!user.exists) {
            return null;
        } else {
            const userData = user.data();
            const { id, cargo, displayName, email, horas, photoURL, rut, tasks } = userData;
            const userInstance = await User.build(id, cargo, displayName, email, horas, photoURL, rut, tasks);
            return userInstance;
        }
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
    }
}

module.exports = getUser;
