const express = require('express');
const router = express.Router();
const { createUser, deleteUser, getUser, getUsers, updateUser } = require('../controller/users/index.cjs');
const requiereAdmin = require('../middleware/requiereAdmin.cjs');
const requiereRol = require('../middleware/requiereRol.cjs');
const { getUid } = require('../utils.cjs');


router.get('/', requiereAdmin(getUsersController)); // devuelve todos los usuarios, solo si es admin

router.get('/:uid', requiereRol(getUserAdminController, getUserUserController)); // si es admin, devuelve el usuario, si es usuario, solo puede ver su propio usuario

router.post('/', requiereAdmin, createUserController); // crea un usuario, solo si es admin

router.delete('/:uid', requiereAdmin(deleteUserController)); // elimina un usuario, solo si es admin

router.put('/:uid', requiereRol(updateUserAdminController, updateUserUserController)); // si es admin, actualiza el usuario, si es usuario, solo puede actualizar su propio usuario y solo los campos displayName y photoURL
router.patch('/:uid', requiereRol(updateUserAdminController, updateUserUserController)); // si es admin, actualiza el usuario, si es usuario, solo puede actualizar su propio usuario y solo los campos displayName y photoURL


async function updateUserAdminController(req, res) {
    try {
        const { uid } = req.params;
        const userData = req.body;
        await updateUser(uid, userData);
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUserUserController(req, res) {
    const editableFields = ['displayName', 'photoURL'];
    const uid = getUid(req);
    if (uid !== req.params.uid) {
        return res.status(403).json({ error: 'No tienes permisos para actualizar este usuario' });
    }

    const userData = req.body;
    const userDataKeys = Object.keys(userData);
    const isValid = userDataKeys.every(key => editableFields.includes(key));
    const noValidFields = userDataKeys.filter(key => !editableFields.includes(key));

    if (!isValid) {
        return res.status(400).json({ error: `Los campos ${noValidFields.join(', ')} no son editables` });
    }

    try {
        await updateUser(uid, userData);
        res.json({ message: 'Usuario actualizado correctamente' });
    }

    catch (error) {
        res.status(500).json({ error: error.message });
    }

}


async function getUsersController(req, res) {
    try {
        const users = await getUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createUserController(req, res) {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function getUserAdminController(req, res) {
    try {
        const user = await getUser(req.params.uid);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserUserController(req, res) {
    const uid = getUid(req);
    if (uid !== req.params.uid) {
        return res.status(403).json({ error: 'No tienes permisos para ver este usuario' });
    }

    try {
        const user = await getUser(uid);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUserController(req, res) {
    try {
        console.log('Tratando de eliminar usuario:', req.params.uid);
        await deleteUser(req.params.uid);
        res.status(204).end();
    } catch (error) {
        console.error('Error en el controlador al eliminar usuario:', error);
        res.status(500).json({ error: error.message });
    }
}
module.exports = router;