// Path: utils/index.js

import { getDoc } from "firebase/firestore";
import Task from "../models/taskModel.js";

export const parsearFecha = (fecha) => {
    const fechaUnix = fecha.seconds * 1000 + fecha.nanoseconds / 1000000;
    return new Date(fechaUnix);
}

export const extraerReferencia = (referencia) => {
    if (referencia && referencia.path) {
        const segments = referencia.path.split('/');
        return segments[segments.length - 1];
    }
    return null;
};

export const generatePhotoURL = (displayName) => {
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=${randomColor()}&color=fff&size=200`;
    return avatarUrl;
};

export const getUserDataFromRef = async (userRef) => {
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
    const { id, displayName, email, photoURL } = userData;
    return { id, displayName, email, photoURL };
};

export const getTaskDataFromRef = async (taskRef) => {
    const doc = await getDoc(taskRef);
    const task = await Task.build(
        doc.id,
        doc.data().autorName,
        doc.data().autorReference,
        doc.data().cargo,
        doc.data().descripcion,
        doc.data().esfuerzo,
        doc.data().fechaCreacion,
        doc.data().horas,
        doc.data().incertidumbre,
        doc.data().numeroTareas,
        doc.data().responsables,
        doc.data().status,
        doc.data().subtasks,
        doc.data().tipo,
        doc.data().titulo
    );
    return task;
};

export const toReference = (db, collectionName, docId) => {
    return doc(db, collectionName, docId);
}

export const getUserRefs = async (userIds) => {
    const userRefsPromises = userIds.map(userId => {
        const userRef = doc(db, 'users', userId);
        return getDoc(userRef);
    });

    const userSnapshots = await Promise.all(userRefsPromises);
    return userSnapshots.filter(snapshot => snapshot.exists).map(snapshot => snapshot.ref);
};

