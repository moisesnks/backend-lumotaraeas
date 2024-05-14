import { extraerReferencia, parsearFecha, getUserDataFromRef } from '../utils/utils.js';

class Task {
    constructor(id, autorName, autorReference, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo) {
        this.id = id;
        this.autorName = autorName;
        this.autorReference = extraerReferencia(autorReference);
        this.cargo = cargo;
        this.descripcion = descripcion;
        this.esfuerzo = esfuerzo;
        this.fechaCreacion = parsearFecha(fechaCreacion);
        this.horas = horas;
        this.incertidumbre = incertidumbre;
        this.numeroTareas = numeroTareas;
        this.responsables = this.parsearResponsables(responsables);
        this.status = status;
        this.subtasks = subtasks;
        this.tipo = tipo;
        this.titulo = titulo;
    }

    async initAutorData(autorReference) {
        try {
            // obtener los datos del autor
            this.autorData = await getUserDataFromRef(autorReference);
        } catch (error) {
            console.error("Error al obtener los datos del autor:", error);
            // Manejar el error aquí si es necesario
        }
    }

    async initResponsablesData(responsables) {
        try {
            // obtener los datos de los responsables
            this.responsablesData = await Promise.all(responsables.map(async (responsable) => {
                return await getUserDataFromRef(responsable);
            }));
        } catch (error) {
            console.error("Error al obtener los datos de los responsables:", error);
            // Manejar el error aquí si es necesario
        }
    }

    async initResponsablesData(responsables) {
        try {
            // obtener los datos de los responsables
            this.responsablesData = await Promise.all(responsables.map(async (responsable) => {
                return await getUserDataFromRef(responsable);
            }));
        } catch (error) {
            console.error("Error al obtener los datos de los responsables:", error);
            // Manejar el error aquí si es necesario
        }
    }

    parsearResponsables(responsables) {
        return responsables.map((responsable) => extraerReferencia(responsable));
    }

    static async build(id, autorName, autorReference, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo) {
        const task = new Task(id, autorName, autorReference, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo);
        await task.initAutorData(autorReference);
        await task.initResponsablesData(responsables);
        return task;
    }
}

export default Task;
