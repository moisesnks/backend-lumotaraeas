const Task = require('../../models/taskModel.cjs');

async function getTasks() {
    try {
        const tasks = await Task.find();
        return tasks;
    }
    catch (error) {
        console.error('Error al obtener tareas:', error);
        throw error;
    }
}

module.exports = getTasks;

