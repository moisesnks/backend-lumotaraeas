const { parsearFecha } = require('../utils.cjs');
const User = require('./userModel.cjs');
const { db } = require('../config.cjs');

class Task {
    constructor({ id, autorId, autorName, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo }) {
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
        // Obtener el autor de la tarea, el id del autor se encuentra en this.autorId
        const docRef = db.doc(`users/${this.autorId}`);
        const docSnap = await docRef.get();
        if (docSnap.exists) {
            const autorData = docSnap.data();
            // Crear una instancia de User utilizando el constructor actualizado
            this.autor = new User(autorData);
        } else {
            console.error(`No se encontró el usuario con ID ${this.autorId}.`);
        }
    }

    async initResponsables() {
        const responsablesData = [];
        for (const responsableID of this.responsables) {
            const docRef = db.doc(`users/${responsableID}`);
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                const responsableData = docSnap.data();
                // Crear una instancia de User utilizando el constructor actualizado
                const responsable = new User(responsableData);
                responsablesData.push(responsable);
            } else {
                console.error(`No se encontró el usuario con ID ${responsableID}.`);
            }
        }
        this.responsables = responsablesData;
    }


    static async build({ id, autorId, autorName, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo }) {
        const task = new Task({ id, autorId, autorName, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo });
        await task.initResponsables();
        await task.initAutor();
        return task;
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
            const task = await getTask(taskId);
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
            const task = await getTask(taskId);
            await task.delete();
        } catch (error) {
            console.error('Error al eliminar tarea:', error);
            throw error;
        }
    }
}

module.exports = Task;
