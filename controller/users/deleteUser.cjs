// Path: controller/users/deleteUser.cjs

const admin = require('firebase-admin');

async function deleteUser(uid) {
    try {
        console.log('Tratando de eliminar usuario:', uid);
        await admin.auth().deleteUser(uid);
        console.log('Usuario eliminado de la autenticación:', uid);

        await deleteUserInDB(uid);
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error;
    }
}

async function deleteUserInDB(uid) {
    try {
        console.log('Tratando de eliminar usuario de la base de datos:', uid);
        await admin.firestore().collection('users').doc(uid).delete();
        console.log('Usuario eliminado de la base de datos:', uid);
    } catch (error) {
        console.error('Error al eliminar usuario de la base de datos:', error);
        throw error;
    }
}

module.exports = deleteUser;
