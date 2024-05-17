// Path: controller/tasks/createTask.cjs

const { db } = require('../../config.cjs');

async function createTask(taskData) {
    try {
        await db.collection('tasks').add(taskData);
    } catch (error) {
        console.error('Error al crear tarea:', error);
        throw error;
    }
}

module.exports = createTask;