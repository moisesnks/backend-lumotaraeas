import express from 'express';
import cors from 'cors';
import path from 'path';
import config from './config.js';

import taskRoute from './routes/taskRoute.js';
import userRoute from './routes/userRoute.js';

const __dirname = path.resolve();


const app = express();

app.use(cors());
app.use(express.json());

// Rutas
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use('/tasks', taskRoute);
app.use('/users', userRoute);

app.listen(config.port, () =>
    console.log(`Server is live @ ${config.hostUrl}`),
);
