// Path: controller/tasks/updateTaskAdmin.cjs

const { db } = require('../../config.cjs');

async function updateTaskAdmin(taskId, taskData) {
    try {
        await db.collection('tasks').doc(taskId).update(taskData);
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        throw error;
    }
}

// el user, sólo puede actualizar ciertos campos de la tarea
// esos campos son: horas, status, subtasks (solo el campo completada),
// esfuerzo, incertidumbre 


async function updateTaskUser(taskId, taskData) {
    const allowedFields = ['horas', 'status', 'subtasks', 'esfuerzo', 'incertidumbre'];
    const taskDataKeys = Object.keys(taskData);
    const disallowedFields = taskDataKeys.filter(key => !allowedFields.includes(key));

    if (disallowedFields.length > 0) {
        throw new Error(`Usted no tiene permitido modificar los campos: ${disallowedFields.join(', ')}`);
    }

    const taskDataKeysFiltered = taskDataKeys.filter(key => allowedFields.includes(key));
    const taskDataFiltered = taskDataKeysFiltered.reduce((acc, key) => {
        acc[key] = taskData[key];
        return acc;
    }, {});

    // Validación adicional para subtasks
    if (taskData.subtasks && Array.isArray(taskData.subtasks)) {
        taskDataFiltered.subtasks = taskData.subtasks.map(subtask => ({
            ...subtask,
            completada: subtask.completada
        }));
    }

    try {
        await db.collection('tasks').doc(taskId).update(taskDataFiltered);
        console.log('Tarea actualizada exitosamente');
    } catch (error) {
        console.error('Error al actualizar tarea:', error);
        throw error;
    }
}

module.exports = {
    updateTaskAdmin,
    updateTaskUser
};
