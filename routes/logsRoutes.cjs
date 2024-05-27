const express = require('express');
const router = express.Router();

const logs = {
    "08-05-2024": {
        "ceremony": "Planning",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": true,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": true,
            "pgalvez": false,
            "irojas": true,
            "nsepulveda": false,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": false,
            "msolis": true
        }
    },
    "09-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": false,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": true,
            "pgalvez": true,
            "irojas": true,
            "nsepulveda": true,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": false,
            "msolis": true
        }
    },
    "11-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": false,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": false,
            "pgalvez": true,
            "irojas": true,
            "nsepulveda": true,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": true,
            "msolis": true
        }
    },
    "13-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": false,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": false,
            "pgalvez": true,
            "irojas": true,
            "nsepulveda": false,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": false,
            "msolis": true
        }
    },
    "15-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": false,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": true,
            "pgalvez": false,
            "irojas": true,
            "nsepulveda": false,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": true,
            "msolis": true
        }
    },
    "17-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": false,
            "egarciadelahuerta": false,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": false,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": false,
            "pgalvez": true,
            "irojas": false,
            "nsepulveda": false,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": false,
            "msolis": false
        }
    },
    "19-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": false,
            "egarciadelahuerta": false,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": true,
            "pgalvez": true,
            "irojas": true,
            "nsepulveda": true,
            "bmirandae": true,
            "lmedinar": false,
            "mleiva": false,
            "msolis": true
        }
    },
    "21-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": false,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": true,
            "pgalvez": true,
            "irojas": true,
            "nsepulveda": true,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": true,
            "msolis": true
        }
    },
    "23-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": false,
            "cmartinezs": false,
            "ldroguett": false,
            "pvargasm": false,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": false,
            "pgalvez": true,
            "irojas": true,
            "nsepulveda": true,
            "bmirandae": false,
            "lmedinar": false,
            "mleiva": true,
            "msolis": true
        }
    },
    "24-05-2024": {
        "ceremony": "Retrospective",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": true,
            "cmartinezs": false,
            "ldroguett": false,
            "pvargasm": false,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": true,
            "pgalvez": true,
            "irojas": true,
            "nsepulveda": true,
            "bmirandae": false,
            "lmedinar": true,
            "mleiva": true,
            "msolis": true
        }
    },
    "25-05-2024": {
        "ceremony": "Sprint Check",
        "attendance": {
            "mluque": true,
            "jmalca": true,
            "egarciadelahuerta": true,
            "cmartinezs": true,
            "ldroguett": false,
            "pvargasm": true,
            "isilvaro": false,
            "babarca": true,
            "fyefi": false,
            "mreynoso": false,
            "scarrascoi": false,
            "pgalvez": false,
            "irojas": false,
            "nsepulveda": true,
            "bmirandae": false,
            "lmedinar": true,
            "mleiva": false,
            "msolis": true
        }
    }
};


router.get('/', (req, res) => {
    // Devuelve el objeto logs
    res.json({ logs });
});

router.post('/add-ceremony', (req, res) => {
    const { date, ceremony } = req.body;

    // Verificar si la fecha ya existe en los registros de logs
    if (logs[date]) {
        return res.status(400).send('La fecha ya tiene una ceremonia asignada.');
    }

    // Agregar la nueva ceremonia a los registros de logs
    logs[date] = { ceremony, attendance: {} };
    res.status(200).send('Ceremonia agregada correctamente.');
});

router.post('/change-attendance', (req, res) => {
    const { name, isChecked } = req.body;
    let { date } = req.body;

    // convertir date en string 'dd-mm-yyyy', ya que actualmente es 
    // 2024-05-07T04:00:00.000Z string 
    const dateArray = date.split('-');
    const day = dateArray[2].split('T')[0];
    const month = dateArray[1];
    const year = dateArray[0];
    const newDate = `${day}-${month}-${year}`;

    date = newDate;


    // Verificar si la fecha existe en los registros de logs
    if (!logs[date]) {
        console.error('La fecha especificada no tiene una ceremonia asignada.', date);
        return res.status(400).send('La fecha especificada no tiene una ceremonia asignada.');
    }

    // Cambiar el estado de asistencia para el nombre especificado en la fecha especificada
    logs[date].attendance[name] = isChecked;
    res.status(200).send('Asistencia cambiada correctamente.');
});

module.exports = router;

