import firebase from '../firebase.js';
import Task from '../models/taskModel.js';

import { getUserRefs, getUserDataFromRef } from '../utils/utils.js';

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore";


const db = getFirestore(firebase);

// Función para obtener la referencia de un documento
const toReference = (db, collectionName, docId) => {
    return doc(db, collectionName, docId);
}

export const createTask = async (req, res, next) => {
    try {
        const data = req.body;
        const Task = {
            autorName: data.autorName,
            autorReference: toReference(db, 'users', data.autorReference),
            cargo: data.cargo,
            descripcion: data.descripcion,
            esfuerzo: data.esfuerzo,
            fechaCreacion: data.fechaCreacion ? data.fechaCreacion : new Date(),
            horas: data.horas,
            incertidumbre: data.incertidumbre,
            numeroTareas: data.numeroTareas,
            responsables: data.responsables,
            status: data.status,
            subtasks: data.subtasks,
            tipo: data.tipo,
            titulo: data.titulo
        };
        await addDoc(collection(db, "tasks"), Task);
        res.status(200).send("Task created successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await getDocs(collection(db, "tasks"));
        const tasksArray = [];

        if (tasks.empty) {
            res.status(400).send("No tasks found");
        } else {
            tasks.forEach(async (doc) => {
                const taskData = doc.data();
                const autorRef = taskData.autorReference;
                const autorData = await getUserDataFromRef(autorRef);

                const responsables = [];
                for (const responsableRef of taskData.responsables) {
                    const responsableData = await getUserDataFromRef(responsableRef);
                    if (responsableData) {
                        responsables.push(responsableData);
                    }
                }

                const task = new Task(
                    doc.id,
                    taskData.autorName,
                    autorData,
                    taskData.cargo,
                    taskData.descripcion,
                    taskData.esfuerzo,
                    taskData.fechaCreacion,
                    taskData.horas,
                    taskData.incertidumbre,
                    taskData.numeroTareas,
                    responsables,
                    taskData.status,
                    taskData.subtasks,
                    taskData.tipo,
                    taskData.titulo
                );
                tasksArray.push(task);
            });
            res.status(200).send(tasksArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const taskRef = doc(db, 'tasks', id);
        const taskData = (await getDoc(taskRef)).data();

        if (taskData) {
            const autorRef = taskData.autorReference;
            const autorData = await getUserDataFromRef(autorRef);

            const responsables = [];
            for (const responsableRef of taskData.responsables) {
                const responsableData = await getUserDataFromRef(responsableRef);
                if (responsableData) {
                    responsables.push(responsableData);
                }
            }

            const task = new Task(
                taskRef.id,
                taskData.autorName,
                autorData,
                taskData.cargo,
                taskData.descripcion,
                taskData.esfuerzo,
                taskData.fechaCreacion,
                taskData.horas,
                taskData.incertidumbre,
                taskData.numeroTareas,
                responsables,
                taskData.status,
                taskData.subtasks,
                taskData.tipo,
                taskData.titulo
            );

            res.status(200).send(task);
        } else {
            res.status(404).send("Task not found");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const task = doc(db, 'tasks', id);
        await updateDoc(task, data);
        res.status(200).send("Task updated successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = doc(db, 'tasks', id);
        await deleteDoc(task);
        res.status(200).send("Task deleted successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}



// Función para actualizar la tarea
const updateTaskResponsables = async (taskRef, assignedUserRefs) => {
    const taskSnapshot = await getDoc(taskRef);
    const taskData = taskSnapshot.data();

    const updatedResponsables = [...taskData.responsables, ...assignedUserRefs];
    await updateDoc(taskRef, { responsables: updatedResponsables });
}

// Función para actualizar las referencias de tareas en los documentos de usuario
const updateUserTareasReference = async (userRefs, taskRef) => {
    const userUpdatePromises = userRefs.map(userRef => {
        return updateDoc(userRef, {
            tareasReference: arrayUnion(taskRef) // Utiliza arrayUnion para Firebase
        });
    });

    await Promise.all(userUpdatePromises);
}

// Controlador para asignar responsables a una tarea
export const asignarResponsables = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const { responsables } = req.body;

        // Obtener la tarea
        const taskRef = doc(db, 'tasks', taskId);
        const taskSnapshot = await getDoc(taskRef);

        if (!taskSnapshot.exists()) {
            return res.status(404).send("Tarea no encontrada");
        }

        // Obtener las referencias de los usuarios
        const userRefs = await getUserRefs(responsables);

        if (userRefs.length !== responsables.length) {
            return res.status(404).send("Algunos usuarios no existen");
        }

        // Actualizar la tarea
        await updateTaskResponsables(taskRef, userRefs);

        // Actualizar las referencias de tareas en los documentos de usuario
        await updateUserTareasReference(userRefs, taskRef);

        res.status(200).send("Responsables asignados correctamente");
    } catch (error) {
        console.error("Error al asignar responsables:", error);
        res.status(500).send("Se produjo un error al asignar responsables");
    }
}

// Función para eliminar responsables de la tarea
const removeTaskResponsables = async (taskRef, assignedUserRefs) => {
    const taskSnapshot = await getDoc(taskRef);
    const taskData = taskSnapshot.data();

    const updatedResponsables = taskData.responsables.filter(responsable => {
        return !assignedUserRefs.some(assignedUserRef => responsable.id === assignedUserRef.id);
    });
    await updateDoc(taskRef, { responsables: updatedResponsables });
}

// Función para eliminar referencias de tareas de los documentos de usuario
const removeUserTareasReference = async (userRefs, taskRef) => {
    const userUpdatePromises = userRefs.map(userRef => {
        return updateDoc(userRef, {
            tareasReference: arrayRemove(taskRef) // Utiliza arrayRemove para Firebase
        });
    });

    await Promise.all(userUpdatePromises);
}

// Controlador para desasignar responsables de una tarea
export const desasignarResponsables = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const { responsables } = req.body;

        // Obtener la tarea
        const taskRef = doc(db, 'tasks', taskId);
        const taskSnapshot = await getDoc(taskRef);

        if (!taskSnapshot.exists()) {
            return res.status(404).send("Tarea no encontrada");
        }

        // Obtener las referencias de los usuarios
        const userRefs = await getUserRefs(responsables);

        if (userRefs.length !== responsables.length) {
            return res.status(404).send("Algunos usuarios no existen");
        }

        // Eliminar responsables de la tarea
        await removeTaskResponsables(taskRef, userRefs);

        // Eliminar las referencias de tareas de los documentos de usuario
        await removeUserTareasReference(userRefs, taskRef);

        res.status(200).send("Responsables desasignados correctamente");
    } catch (error) {
        console.error("Error al desasignar responsables:", error);
        res.status(500).send("Se produjo un error al desasignar responsables");
    }
}
