// Path: routes/authRoutes.cjs

const express = require('express');

const router = express.Router();

const {
    registerUser
} = require('../controller/auth/index.cjs');

router.post('/register', registerUser);

module.exports = router;