import express from 'express';

import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
} from '../controllers/userControllers.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/new', createUser);
router.get('/:id', getUser);
router.put('/:id/udate', updateUser);
router.patch('/:id/update', updateUser);
router.delete('/:id/delete', deleteUser);

export default router;