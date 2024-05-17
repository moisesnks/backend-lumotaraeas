// Path: controller/users/index.cjs

const createUser = require('./createUser.cjs');
const deleteUser = require('./deleteUser.cjs');
const getUser = require('./getUser.cjs');
const getUsers = require('./getUsers.cjs');
const updateUser = require('./updateUser.cjs');

module.exports = {
    createUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser,
};