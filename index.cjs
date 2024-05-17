const express = require('express');
const cors = require('cors');
const { db, auth, storage } = require('./config.cjs');

const usersRoutes = require('./routes/usersRoutes.cjs');
const tasksRoutes = require('./routes/tasksRoutes.cjs');
const authRoutes = require('./routes/authRoutes.cjs');


const app = express();

const logger = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        const date = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });

        console.log(`[${date}] [${req.method}] ${req.originalUrl} [${res.statusCode}]`);

        originalSend.call(this, body);
    };

    next();
};


app.use(express());

app.use(cors());
app.use(express.json());

// Routes
app.use(logger);
app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);
app.use('/auth', authRoutes);


// const uid = 'tetBpdOlLXSsHgabow3wNTG9Xx13';


// auth.getUser(uid).then(user => {
//     console.log(user.customClaims);
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on host: http://localhost:${PORT}`);
});