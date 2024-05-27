// Path: controller/users/updateUser.cjs

const { auth } = require('../../config.cjs');
const User = require('../../models/userModel.cjs');

async function updateUser(uid, data) {
    const { email, displayName, photoURL } = data;

    try {
        // Actualizar la información del usuario en Firebase Authentication
        await auth.updateUser(uid, {
            email,
            displayName,
            photoURL
        });

        // Obtener el usuario de la base de datos
        const user = await User.getUser(uid);
        await user.update({ id: uid, ...data });

        return user;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error;
    }
}

module.exports = updateUser;
