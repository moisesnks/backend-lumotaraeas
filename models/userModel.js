import { extraerReferencia, generatePhotoURL, getTaskDataFromRef } from '../utils/utils.js';
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

    async initTareasData(tareas) {
        try {
            // obtener los datos de las tareas
            this.tareasData = await Promise.all(tareas.map(async (tarea) => {
                return await getTaskDataFromRef(tarea);
            }));
        } catch (error) {
            console.error("Error al obtener los datos de las tareas:", error);
        }
    }

    parsearTareas(tareas) {
        return tareas.map((tarea) => extraerReferencia(tarea));
    }

    static async build(id, displayName, email, photoURL, rol, rut, team, cargo, horas, tareas) {
        const user = new User(id, displayName, email, photoURL, rol, rut, team, cargo, horas, tareas);
        await user.initTareasData(tareas);
        console.log(user);
        return user;
    }

    toString() {
        return JSON.stringify(this);
    }
}

export default User;