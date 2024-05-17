// Path: controller/tasks/getTask.cjs

const { db } = require('../../config.cjs');
const Task = require('../../models/taskModel.cjs');

async function getTask(taskId) {
    try {
        const task = await db.collection('tasks').doc(taskId).get();
        if (!task.exists) {
            return null;
        } else {
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
            return taskInstance;
        }
    }
    catch (error) {
        console.error('Error al obtener tarea:', error);
        throw error;
    }
}

module.exports = getTask;
