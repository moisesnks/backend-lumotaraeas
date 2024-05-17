// Path: controller/users/updateUser.cjs

const { auth, db } = require('../../config.cjs');


async function updateUser(uid, data) {
    const { email, displayName, photoURL } = data;

    try {
        try {
            await auth.updateUser(uid, {
                email,
                displayName,
                photoURL
            });
        } catch (authError) {
            throw authError;
        }


        await updateUserInDB(uid, {
            email,
            displayName,
            photoURL
        });
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

function updateUserInDB(uid, data) {
    try {
        return db.collection('users').doc(uid).update(data);
    } catch (error) {
        throw error;
    }
}

module.exports = updateUser;
