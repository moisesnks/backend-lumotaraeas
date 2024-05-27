// Path: controller/auth/createUser.cjs

const admin = require('firebase-admin');
const { isValidEmail, isValidPassword, setAdmin, generatePhotoURL } = require('../../utils.cjs');
const User = require('../../models/userModel.cjs');


async function createUser(data) {
    const { email, password, displayName, isAdmin = false, rut, cargo, capacidad, equipo, tasks = [] } = data;
    let { photoURL } = data;
    if (!photoURL) {
        let urlName = displayName.replace(/\s+/g, '_');
        urlName = urlName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        urlName = urlName.toLowerCase();
        photoURL = generatePhotoURL(urlName);
    }

    // if (!isValidEmail(email)) {
    //     throw new Error('El email no es válido');
    // }

    // try {
    //     isValidPassword(password);
    // } catch (error) {
    //     throw new Error(error.message);
    // }



    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
            photoURL: photoURL || generatePhotoURL(displayName)
        });

        const uid = userRecord.uid;

        if (isAdmin) {
            await setAdmin(uid, true);
        }

        const userData = {
            email,
            displayName,
            photoURL: photoURL || generatePhotoURL(displayName),
            rut,
            cargo,
            capacidad,
            equipo,
            tasks
        };

        await createUserInDB(uid, userData);

    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

async function createUserInDB(uid, userData) {
    const { displayName, rut, email, cargo, capacidad, equipo, tasks = [] } = userData;
    const photoURL = userData.photoURL || generatePhotoURL(displayName);

    // Crear una nueva instancia del usuario con un objeto
    const user = new User({ id: uid, displayName, email, photoURL, rut, cargo, capacidad, equipo });

    // Inicializar las tareas (si hay alguna)
    await user.initTasks();

    // Guardar el usuario en Firestore
    await user.save();

    return user;
}

module.exports = createUser;
