// Path: controller/tasks/getTaskByUser.cjs

const { db } = require('../../config.cjs');
const getTask = require('./getTask.cjs')

async function getTasksByUser(uid) {
    try {
        const user = await db.collection('users').doc(uid).get();
        const tasks = user.data().tasks;

        const tasksData = [];

        for (const taskId of tasks) {
            const task = await getTask(taskId);
            tasksData.push(task);
        }

        return tasksData;
    }
    catch (error) {
        console.error('Error al obtener tareas por usuario:', error);
        throw error;
    }
}

module.exports = getTasksByUser;