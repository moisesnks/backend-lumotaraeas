import express from 'express';

import {
    createTask,
    getTask,
    getTasks,
    updateTask,
    deleteTask,
    asignarResponsables,
    desasignarResponsables,
} from '../controllers/taskControllers.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/new', createTask);
router.get('/:id', getTask);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.post('/:id/asignar', asignarResponsables);
router.post('/:id/desasignar', desasignarResponsables);


export default router;