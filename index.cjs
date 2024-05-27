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

const logger = (req, res, next) => {
    const originalSend = res.send;
    res.send = function (body) {
        const date = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
        console.log(`[${date}] [${req.method}] ${req.originalUrl} [${res.statusCode}]`);
        originalSend.call(this, body);
    };
    next();
};

const requestLimit = (req, res, next) => {
    const ip = req.ip; // Obtiene la dirección IP del cliente
    const now = Date.now();
    const interval = 10 * 1000; // Intervalo de 10 segundos
    const maxRequests = 10; // Número máximo de peticiones permitidas en el intervalo

    // Verificar si existe el registro de peticiones del usuario
    if (!requests[ip]) {
        requests[ip] = [];
    }

    // Filtrar las peticiones dentro del intervalo de tiempo
    const requestsWithinInterval = requests[ip].filter(timestamp => now - timestamp < interval);

    // Verificar si el número de peticiones supera el límite
    if (requestsWithinInterval.length >= maxRequests) {
        // El usuario ha excedido el límite de peticiones, aplicar ban temporal
        res.status(429).json({ error: 'Too Many Requests. Please try again later.' });
    } else {
        // Añadir la marca de tiempo de la nueva petición
        requests[ip].push(now);
        next();
    }
};

// Objeto para almacenar las marcas de tiempo de las peticiones por dirección IP
const requests = {};

app.use(cors({ origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'] }));
app.use(express.json());

// Routes
app.use(logger);
app.use(requestLimit); // Aplicar middleware de limitación de peticiones
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
