const { auth } = require('./config.cjs');

function parsearFecha(fecha) {
    const fechaUnix = fecha.seconds * 1000 + fecha.nanoseconds / 1000000;
    return new Date(fechaUnix).toLocaleDateString('es-CL',
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        });
}

function generatePhotoURL(displayName) {
    const avatarURL = `https://ui-avatars.com/api/?name=${displayName}&background=random`;
    return avatarURL;
}

function isValidEmail(email) {
    // Expresión regular para validar el correo electrónico
    var re = /\S+@\S+\.\S+/;

    // Verificar si el correo electrónico cumple con los criterios
    if (!email) {
        // El correo electrónico está vacío
        console.log("El correo electrónico no puede estar vacío.");
        return false;
    } else if (!re.test(email)) {
        // El correo electrónico no cumple con el formato especificado
        console.log("El correo electrónico no tiene un formato válido.");
        return false;
    }

    // Si el correo electrónico es válido, devolver verdadero
    return true;
}

function isValidPassword(password) {
    // Expresión regular para validar la contraseña, debe permitir caracteres alfanuméricos y tener al menos 8 caracteres
    var re = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // Verificar si la contraseña cumple con los criterios
    if (!password) {
        // La contraseña está vacía
        console.log("La contraseña no puede estar vacía.");
        return false;
    } else if (password.length < 8) {
        // La contraseña es demasiado corta
        console.log("La contraseña debe tener al menos 8 caracteres.");
        return false;
    } else if (!/\d/.test(password)) {
        // La contraseña no contiene un número
        console.log("La contraseña debe contener al menos un número.");
        return false;
    } else if (!/[A-Z]/.test(password)) {
        // La contraseña no contiene una letra mayúscula
        console.log("La contraseña debe contener al menos una letra mayúscula.");
        return false;
    } else if (!re.test(password)) {
        // La contraseña no cumple con el formato especificado
        console.log("La contraseña no cumple con el formato especificado.");
        return false;
    }

    // Si la contraseña es válida, devolver verdadero
    return true;
}


async function setAdmin(uid, boolean) {
    try {
        await auth.setCustomUserClaims(uid, { admin: boolean });
        return true;
    } catch (error) {
        console.error('Error setting custom claims:', error);
        return false;
    }
}


async function getUid(req) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return null;
    }

    const claims = await auth.verifyIdToken(token);
    return claims.uid;
}



module.exports = {
    parsearFecha,
    generatePhotoURL,
    isValidEmail,
    isValidPassword,
    setAdmin,
    getUid,
};
