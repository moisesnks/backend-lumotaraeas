import { extraerReferencia, parsearFecha } from '../utils/utils.js';

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

    parsearResponsables(responsables) {
        return responsables.map((responsable) => extraerReferencia(responsable));
    }

}

export default Task;

