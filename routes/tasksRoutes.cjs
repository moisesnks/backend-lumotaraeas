const express = require('express');
const router = express.Router();
const {
    getTask,
    getTasks,
    getTasksByUser,
    updateTaskAdmin,
    updateTaskUser,
    createTask,
    deleteTask,
    asignarResponsables,
    desasignarResponsables
} = require('../controller/tasks/index.cjs');

const requiereAuth = require('../middleware/requiereAuth.cjs');
const requiereRol = require('../middleware/requiereRol.cjs');
const requiereAdmin = require('../middleware/requiereAdmin.cjs');

const { getUid } = require('../utils.cjs');

router.get('/', requiereAuth(getTasksAdmin)); // devuelve todas las tareas, solo si es admin

router.get('/user/:uid', requiereAdmin(getTasksByUserController)); // devuelve las tareas de un usuario, solo si es admin

router.get('/:id', requiereRol(getTaskAdmin, getTaskUser)); // si es admin, devuelve la tarea, si es usuario, devuelve la tarea ssi es responsable

router.put('/:id', requiereRol(updateTaskAdminController, updateTaskUserController)); // si es admin, actualiza la tarea, si es usuario, actualiza la tarea ssi es responsable

router.patch('/:id', requiereRol(updateTaskAdminController, updateTaskUserController)); // si es admin, actualiza la tarea, si es usuario, actualiza la tarea ssi es responsable

router.delete('/:id', requiereAdmin(deleteTaskController)); // elimina la tarea, solo si es admin

router.post('/', requiereAdmin(createTaskController)); // crea una tarea, solo si es admin

router.post('/:id/asignar', requiereAdmin(asignarResponsablesController)); // asigna responsables a una tarea, solo si es admin

router.post('/:id/desasignar', requiereAdmin(desasignarResponsablesController)); // desasigna responsables a una tarea, solo si es admin

async function desasignarResponsablesController(req, res) {
    try {
        const { id } = req.params;
        const { responsables } = req.body;
        await desasignarResponsables(id, responsables);
        res.json({ message: 'Responsables desasignados correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function asignarResponsablesController(req, res) {
    try {
        const { id } = req.params;
        const { responsables } = req.body;
        await asignarResponsables(id, responsables);
        res.json({ message: 'Responsables asignados correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


async function createTaskController(req, res) {
    try {
        const taskData = req.body;
        await createTask(taskData);
        res.json({ message: 'Tarea creada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteTaskController(req, res) {
    try {
        const { id } = req.params;
        await deleteTask(id);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTaskAdminController(req, res) {
    try {
        const { id } = req.params;
        const taskData = req.body;
        await updateTaskAdmin(id, taskData);
        res.json({ message: 'Tarea actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateTaskUserController(req, res) {
    try {
        const uid = await getUid(req);
        const { id } = req.params;
        const taskData = req.body;
        const task = await getTask(id);
        const isResponsible = task.responsables.some(responsible => responsible.id === uid);

        if (!isResponsible) {
            res.status(401).json({ error: 'Usted no es responsable de esta tarea, por lo que no puede modificarla' });
            return;
        }

        await updateTaskUser(id, taskData);
        res.json({ message: 'Tarea actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTaskAdmin(req, res) {
    try {
        const { id } = req.params;
        const task = await getTask(id);
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTaskUser(req, res) {
    try {
        const { id } = req.params;
        const uid = await getUid(req);
        const task = await getTask(id);
        // el array de responsables es un array de objetos, donde el object.id es el uid del usuario responsable
        const isResponsible = task.responsables.some(responsible => responsible.id === uid);

        if (!isResponsible) {
            res.status(401).json({ error: 'Usted no es responsable de esta tarea, por lo que no puede verla' });
            return;
        } else {
            res.json(task);
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTasksAdmin(req, res) {
    try {
        const tasks = await getTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTasksUser(req, res) {
    try {
        const uid = await getUid(req);
        const tasks = await getTasksByUser(uid);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getTasksByUserController(req, res) {
    try {
        const { uid } = req.params;
        const tasks = await getTasksByUser(uid);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = router;
