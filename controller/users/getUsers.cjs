// Path: controller/users/getUsers.cjs

const { db } = require('../../config.cjs');

async function getUsers() {
    try {
        const users = await db.collection('users').get();
        return users.docs.map(user => user.data());
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

module.exports = getUsers;