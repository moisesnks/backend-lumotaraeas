// Path: controller/tasks/deleteTask.cjs

const { db } = require('../../config.cjs');

async function deleteTask(taskId) {
    try {
        await db.collection('tasks').doc(taskId).delete();
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        throw error;
    }
};

module.exports = deleteTask;