// Path: controller/tasks/index.cjs

const getTask = require('./getTask.cjs');
const getTasks = require('./getTasks.cjs');
const getTasksByUser = require('./getTasksByUser.cjs');
const { updateTaskAdmin, updateTaskUser } = require('./updateTask.cjs');
const deleteTask = require('./deleteTask.cjs');
const createTask = require('./createTask.cjs');
const asignarResponsables = require('./asignarResponsables.cjs');
const desasignarResponsables = require('./desasignarResponsables.cjs');
module.exports = {
    getTask,
    getTasks,
    getTasksByUser,
    updateTaskAdmin,
    updateTaskUser,
    deleteTask,
    createTask,
    asignarResponsables,
    desasignarResponsables

};