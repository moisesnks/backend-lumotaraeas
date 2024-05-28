const { parsearFecha } = require('../utils.cjs');
delete require.cache[require.resolve('./userModel.cjs')];
const User = require('./userModel.cjs');
const { db } = require('../config.cjs');
class Task {
    constructor({
        id, autorId, autorName, cargo, descripcion, esfuerzo, fechaCreacion,
        horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo
    }) {
        this.id = id;
        this.autorId = autorId;
        this.autorName = autorName;
        this.cargo = cargo;
        this.descripcion = descripcion;
        this.esfuerzo = esfuerzo;
        this.fechaCreacion = parsearFecha(fechaCreacion);
        this.horas = horas;
        this.incertidumbre = incertidumbre;
        this.numeroTareas = numeroTareas;
        this.responsables = responsables;
        this.status = status;
        this.subtasks = subtasks;
        this.tipo = tipo;
        this.titulo = titulo;
    }

    async initAutor() {
        try {
            const docRef = db.doc(`users/${this.autorId}`);
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                const autorData = docSnap.data();
                this.autor = new User(autorData);
            } else {
                console.error(`No se encontró el usuario con ID ${this.autorId}.`);
            }
        } catch (error) {
            console.error(`Error al obtener el autor con ID ${this.autorId}:`, error);
        }
    }

    async initResponsables() {
        try {
            const responsablesData = [];
            for (const responsableID of this.responsables) {
                const docRef = db.doc(`users/${responsableID}`);
                const docSnap = await docRef.get();
                if (docSnap.exists) {
                    const responsableData = docSnap.data();
                    responsablesData.push(new User(responsableData));
                } else {
                    console.error(`No se encontró el usuario con ID ${responsableID}.`);
                }
            }
            this.responsables = responsablesData;
        } catch (error) {
            console.error('Error al obtener responsables:', error);
        }
    }

    static async build(taskData) {
        const task = new Task(taskData);
        await task.initResponsables();
        await task.initAutor();
        return task;
    }

    async save() {
        try {
            const docRef = db.doc(`tasks/${this.id}`);
            await docRef.set(this.toFirestore());
        } catch (error) {
            console.error('Error al guardar la tarea:', error);
            throw error;
        }
    }

    async delete() {
        try {
            const docRef = db.doc(`tasks/${this.id}`);
            await docRef.delete();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            throw error;
        }
    }

    toFirestore() {
        return {
            id: this.id,
            autorId: this.autorId,
            autorName: this.autorName,
            cargo: this.cargo,
            descripcion: this.descripcion,
            esfuerzo: this.esfuerzo,
            fechaCreacion: this.fechaCreacion,
            horas: this.horas,
            incertidumbre: this.incertidumbre,
            numeroTareas: this.numeroTareas,
            responsables: this.responsables.map(responsable => responsable.id),
            status: this.status,
            subtasks: this.subtasks,
            tipo: this.tipo,
            titulo: this.titulo
        };
    }

    static async createTask(taskData) {
        try {
            const task = new Task(taskData);
            await task.save();
            return task;
        } catch (error) {
            console.error('Error al crear tarea:', error);
            throw error;
        }
    }

    static async getTask(taskId) {
        try {
            const docRef = db.doc(`tasks/${taskId}`);
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                const taskData = docSnap.data();
                const task = new Task(taskData);
                await task.initResponsables();
                await task.initAutor();
                return task;
            } else {
                throw new Error(`No se encontró la tarea con ID ${taskId}.`);
            }
        } catch (error) {
            console.error('Error al obtener tarea:', error);
            throw error;
        }
    }

    static async updateTask(taskId, newData) {
        try {
            const task = await Task.getTask(taskId);
            Object.assign(task, newData);
            await task.save();
            return task;
        } catch (error) {
            console.error('Error al actualizar tarea:', error);
            throw error;
        }
    }

    static async deleteTask(taskId) {
        try {
            const task = await Task.getTask(taskId);
            await task.delete();
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
            throw error;
        }
    }

    static async find() {
        try {
            const tasks = [];
            const querySnapshot = await db.collection('tasks').get();
            querySnapshot.forEach(doc => {
                const taskData = doc.data();
                tasks.push(new Task(taskData));
            });

            const tasksPromises = tasks.map(async task => {
                await task.initResponsables();
                await task.initAutor();
                return task;
            });

            return Promise.all(tasksPromises);


        } catch (error) {
            console.error('Error al obtener tareas:', error);
            throw error;
        }
    }

}

module.exports = Task;
