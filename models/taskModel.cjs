const { parsearFecha } = require('../utils.cjs');
const User = require('./userModel.cjs');
const { db } = require('../config.cjs');

// TaskModel se refiere a un documento de la colección 'tasks', un documento de la coleccion tasks tiene:
// autorId: string
// autorName: string
// cargo: string
// descripcion: string
// esfuerzo: number
// fechaCreacion: Timestamp
// horas: number
// incertidumbre: number
// numeroTareas: number
// responsables: string[]
// status: string
// subtasks: string[]
// tipo: string
// titulo: string

class Task {
    constructor(id, autorId, autorName, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo) {
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
            // Sin el user build
            this.autor = {
                id: docSnap.id,
                cargo: autorData.cargo,
                displayName: autorData.displayName,
                email: autorData.email,
                photoURL: autorData.photoURL,
                rut: autorData.rut,
            }
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
                // Sin el user build
                const responsable =
                {
                    id: docSnap.id,
                    cargo: responsableData.cargo,
                    displayName: responsableData.displayName,
                    email: responsableData.email,
                    photoURL: responsableData.photoURL,
                    rut: responsableData.rut,
                }
                responsablesData.push(responsable);
            } else {
                console.error(`No se encontró el usuario con ID ${responsableID}.`);
            }
        }
        this.responsables = responsablesData;
    }


    static async build(id, autorId, autorName, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo) {
        const task = new Task(id, autorId, autorName, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo);
        await task.initResponsables();
        await task.initAutor();
        return task;

    }

}

module.exports = Task;

