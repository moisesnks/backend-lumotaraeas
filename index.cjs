const express = require('express');
const cors = require('cors');
const { db, auth, storage } = require('./config.cjs');

const usersRoutes = require('./routes/usersRoutes.cjs');
const tasksRoutes = require('./routes/tasksRoutes.cjs');
const authRoutes = require('./routes/authRoutes.cjs');
const logsRoutes = require('./routes/logsRoutes.cjs');
const bdownRoutes = require('./routes/bdownchart.cjs');
const statsRoutes = require('./routes/statsRoute.cjs');
const app = express();

// Objeto para almacenar las marcas de tiempo de todas las peticiones
const requestTimes = [];
let requestCount = 0;

// Middleware para limitar el número de solicitudes a 2000 por hora
const requestLimit = (req, res, next) => {
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // Intervalo de 1 hora en milisegundos
    const maxRequestsPerHour = 1000; // Número máximo de peticiones permitidas por hora

    // Limpiar las solicitudes que son más antiguas de 1 hora
    while (requestTimes.length > 0 && now - requestTimes[0] > oneHour) {
        requestTimes.shift();
        requestCount--;
    }

    // Verificar si el número de peticiones supera el límite por hora
    if (requestCount >= maxRequestsPerHour) {
        res.status(429).json({ error: 'Too Many Requests. Please try again later.' });
    } else {
        // Añadir la marca de tiempo de la nueva petición y aumentar el contador
        requestTimes.push(now);
        requestCount++;
        next();
    }
};

const logger = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        const date = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
        console.log(`[${date}] [${req.method}] ${req.originalUrl} [${res.statusCode}] [Requests in the last hour: ${requestCount}]`);
        originalSend.call(this, body);
    };
    next();
};

app.use(cors({ origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] }));
app.use(express.json());

// Routes
app.use(requestLimit); // Aplicar middleware de limitación de peticiones
app.use(logger);
app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);
app.use('/auth', authRoutes);
app.use('/logs', logsRoutes);
app.use('/bdownchart', bdownRoutes);
app.use('/stats', statsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on host: http://localhost:${PORT}`);
});
