import express from 'express';
import cors from 'cors';

import config from './config.js';

import taskRoute from './routes/taskRoute.js';

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Welcome to Task Manager API');
});

app.use('/tasks', taskRoute);


app.listen(config.port, () =>
    console.log(`Server is live @ ${config.hostUrl}`),
);
