import { extraerReferencia, generatePhotoURL } from '../utils/utils.js';
class User {
    constructor(id, displayName, email, photoURL, rol, rut, team, cargo, horas, tareas) {
        this.id = id;
        this.displayName = displayName;
        this.email = email;
        this.photoURL = photoURL || generatePhotoURL(displayName);
        this.rol = rol || 'user';
        this.rut = rut;
        this.team = team;
        this.cargo = cargo;
        this.horas = horas;
        this.tareas = this.parsearTareas(tareas);
    }

    parsearTareas(tareas) {
        return tareas.map((tarea) => extraerReferencia(tarea));
    }
}

export default User;