import firebase from '../firebase.js';
import Task from '../models/taskModel.js';

import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

const db = getFirestore(firebase);

export const createTask = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, "tasks"), data);
        res.status(201).send("Task created successfully");
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
            tasks.forEach((doc) => {
                const task = new Task(
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
        const task = doc(db, 'tasks', id);
        const data = await getDoc(task);
        if (data.exists()) {
            res.status(200).send(data.data());
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