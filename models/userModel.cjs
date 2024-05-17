const { generatePhotoURL } = require('../utils.cjs');
const Task = require('./taskModel.cjs');
const { db } = require('../config.cjs')

// User model se refiere a un documento de la colección 'users', un documento de la coleccion users tiene:
// cargo: string
// displayName: string
// email: string
// horas: number
// id: string
// photoURL: string
// rut: string
// tasks: string[]

class User {
    constructor(id, cargo, displayName, email, horas, photoURL, rut, tasks) {
        this.id = id;
        this.cargo = cargo;
        this.displayName = displayName;
        this.email = email;
        this.horas = horas;
        this.photoURL = photoURL || generatePhotoURL();
        this.rut = rut;
        this.tasks = tasks;
    }

    async initTasks() {
        const tasksData = [];
        for (const taskID of this.tasks) {
            const docRef = db.doc(`tasks/${taskID}`);
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                const taskData = docSnap.data();
                const task = await Task.build(
                    docSnap.id,
                    taskData.autorId,
                    taskData.autorName,
                    taskData.cargo,
                    taskData.descripcion,
                    taskData.esfuerzo,
                    taskData.fechaCreacion,
                    taskData.horas,
                    taskData.incertidumbre,
                    taskData.numeroTareas,
                    taskData.responsables,
                    taskData.status,
                    taskData.subtasks,
                    taskData.tipo,
                    taskData.titulo
                );
                tasksData.push(task);
            } else {
                console.error(`No se encontró la tarea con ID ${taskID}.`);
            }
        }
        this.tasks = tasksData;
    }

    static async build(id, cargo, displayName, email, horas, photoURL, rut, tasks) {
        const user = new User(id, cargo, displayName, email, horas, photoURL, rut, tasks);
        await user.initTasks();
        return user;
    }

    toJSON() {
        return {
            id: this.id,
            cargo: this.cargo,
            displayName: this.displayName,
            email: this.email,
            horas: this.horas,
            photoURL: this.photoURL,
            rut: this.rut,
            tasks: this.tasks
        };
    }
}

module.exports = User;