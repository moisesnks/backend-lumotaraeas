const { db } = require('../../config.cjs');
const Task = require('../../models/taskModel.cjs');

async function getTasks() {
    try {
        const tasksSnapshot = await db.collection('tasks').get();
        const tasksArray = [];

        for (const task of tasksSnapshot.docs) {
            const taskData = task.data();
            const { autorId,
                autorName,
                cargo,
                descripcion,
                esfuerzo,
                fechaCreacion,
                horas,
                incertidumbre,
                numeroTareas,
                responsables,
                status,
                subtasks,
                tipo,
                titulo
            } = taskData;

            const taskInstance = await Task.build(
                task.id,
                autorId,
                autorName,
                cargo,
                descripcion,
                esfuerzo,
                fechaCreacion,
                horas,
                incertidumbre,
                numeroTareas,
                responsables,
                status,
                subtasks,
                tipo,
                titulo
            );
            tasksArray.push(taskInstance);
        }

        return tasksArray;

    } catch (error) {
        console.error('Error al obtener tareas:', error);
        throw error;
    }
}

module.exports = getTasks;
