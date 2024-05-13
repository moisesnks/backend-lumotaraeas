// id: 
// autorName "Moisés Leiva" (cadena)
// autorReference /users/tetBpdOlLXSsHgabow3wNTG9Xx13 (referencia)
// cargo "back" (cadena)
// descripcion "Se necesita implementar funcionalidad para conectarse a la API de Binance y recuperar datos en tiempo real de precios de criptomonedas." (cadena)
// esfuerzo 0 (número)
// fechaCreacion 8 de mayo de 2024, 1:33:08 p.m. UTC-4 (marca de tiempo)
// horas 0 (número)
// incertidumbre 0 (número)
// numeroTareas 2 (número)
// responsables (array) status
// "completed" (cadena) subtasks
// (array)
// 0 (mapa)
//  completada false (booleano)
//  label "Configurar las credenciales necesarias para acceder a la API de Binance." (cadena)
// 1 (mapa)
// completada false (booleano)
// label "Desarrollar las funciones en backend que realizarán las llamadas a la API y procesarán los datos recibidos." (cadena)
// tipo "features" (cadena)
// titulo "API" (cadena)

class Task {
    constructor(id, autorName, autorReference, cargo, descripcion, esfuerzo, fechaCreacion, horas, incertidumbre, numeroTareas, responsables, status, subtasks, tipo, titulo) {
        this.id = id;
        this.autorName = autorName;
        this.autorReference = this.extraerReferencia(autorReference);
        this.cargo = cargo;
        this.descripcion = descripcion;
        this.esfuerzo = esfuerzo;
        this.fechaCreacion = this.parsearFecha(fechaCreacion);
        this.horas = horas;
        this.incertidumbre = incertidumbre;
        this.numeroTareas = numeroTareas;
        this.responsables = responsables;
        this.status = status;
        this.subtasks = subtasks;
        this.tipo = tipo;
        this.titulo = titulo;
    }

    parsearFecha(fecha) {
        const fechaUnix = fecha.seconds * 1000 + fecha.nanoseconds / 1000000;
        return new Date(fechaUnix);
    }

    extraerReferencia(referencia) {
        if (referencia && referencia._key && referencia._key.path && referencia._key.path.segments) {
            return referencia._key.path.segments.join('/');
        } else {
            return null;
        }
    }
}

export default Task;

