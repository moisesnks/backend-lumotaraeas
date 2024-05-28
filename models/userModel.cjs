const Task = require('./taskModel.cjs');
const { db } = require('../config.cjs');

class User {
    constructor({
        id, displayName, photoURL, rut, email, cargo, capacidad, equipo, tasks = []
    }) {
        this.id = id;
        this.displayName = displayName;
        this.photoURL = photoURL;
        this.rut = rut;
        this.email = email;
        this.cargo = cargo;
        this.capacidad = capacidad;
        this.equipo = equipo;
        this.tasks = tasks;
    }

    async initTasks() {
        const taskRefs = this.tasks.map(taskID => db.doc(`tasks/${taskID}`));
        const taskDocs = await Promise.all(taskRefs.map(ref => ref.get()));
        const tasksData = [];
        taskDocs.forEach(docSnap => {
            if (docSnap.exists) {
                const taskData = docSnap.data();
                tasksData.push(new Task(
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
                ));
            } else {
                console.error(`No se encontró la tarea con ID ${docSnap.id}.`);
            }
        });
        this.tasks = tasksData;
    }

    static async build({ id, displayName, photoURL, rut, email, cargo, capacidad, equipo, tasks }) {
        const user = new User({ id, displayName, photoURL, rut, email, cargo, capacidad, equipo, tasks });
        await user.initTasks();
        return user;
    }


    static async getUser(id) {
        const docRef = db.doc(`users/${id}`);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            const userData = docSnap.data();
            const user = new User({
                id: docSnap.id,
                ...userData
            });
            await user.initTasks();
            return user;
        } else {
            throw new Error(`No se encontró el usuario con ID ${id}.`);
        }
    }

    toFirestore() {
        return {
            id: this.id,
            displayName: this.displayName,
            photoURL: this.photoURL,
            rut: this.rut,
            email: this.email,
            cargo: this.cargo,
            capacidad: this.capacidad,
            equipo: this.equipo,
            tasks: this.tasks,
        };
    }


    async save() {
        const data = this.toFirestore();
        const docRef = db.doc(`users/${this.id}`);
        await docRef.set(data);
    }

    async addTask(task) {
        const docRef = db.doc(`users/${this.id}`);
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                throw new Error("Documento no existe");
            }
            const newTasks = doc.data().tasks || [];
            newTasks.push(task.id);
            transaction.update(docRef, { tasks: newTasks });
        });
        this.tasks.push(task.id);
    }

    async removeTask(taskID) {
        const docRef = db.doc(`users/${this.id}`);
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                throw new Error("Documento no existe");
            }
            const newTasks = doc.data().tasks || [];
            const index = newTasks.indexOf(taskID);
            if (index !== -1) {
                newTasks.splice(index, 1);
                transaction.update(docRef, { tasks: newTasks });
            }
        });
        this.tasks = this.tasks.filter(task => task.id !== taskID);
    }

    async delete() {
        const docRef = db.doc(`users/${this.id}`);
        await docRef.delete();
    }

    async update(data) {
        this.id = data.id || this.id;
        this.displayName = data.displayName || this.displayName;
        this.rut = data.rut || this.rut;
        this.photoURL = data.photoURL || this.photoURL;
        this.email = data.email || this.email;
        this.cargo = data.cargo || this.cargo || 'No asignado';
        this.capacidad = data.capacidad || this.capacidad || 0;
        this.equipo = data.equipo || this.equipo || 'No asignado';
        await this.save();
    }
}

module.exports = User;
