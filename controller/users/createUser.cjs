// Path: controller/auth/createUser.cjs

const admin = require('firebase-admin');
const { isValidEmail, isValidPassword, setAdmin } = require('../../utils.cjs');
const User = require('../../models/userModel.cjs');


async function createUser(data) {

    const { email, password, displayName, photoURL, isAdmin = false, rut } = data;

    if (!isValidEmail(email)) {
        throw new Error('El email no es válido');
    }

    try {
        isValidPassword(password);
    } catch (error) {
        throw new Error(error.message);
    }

    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
            photoURL
        });

        const uid = userRecord.uid;

        if (isAdmin === true) {
            await setAdmin(uid, true);
        }

        const data = {
            email,
            displayName,
            photoURL,
            rut
        };

        await createUserInDB(userRecord.uid, data);

    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

async function createUserInDB(uid, userData) {
    try {
        const photoURL = userData.photoURL;
        const email = userData.email;
        const displayName = userData.displayName || 'no especificado';
        const cargo = userData.cargo || 'no especificado';
        const horas = userData.horas || 0;
        const rut = userData.rut || 'no especificado';
        const tasks = userData.tasks || [];
        const user = new User(uid, cargo, displayName, email, horas, photoURL, rut, tasks);
        const data = user.toJSON();
        return admin.firestore().collection('users').doc(uid).set(data);

    } catch (error) {
        console.error('Error al crear usuario en la base de datos:', error);
        throw error;
    }
}

module.exports = createUser;
