const express = require('express')
const router = express.Router();

const tasks = [
    {
        "id": "1",
        "type": "feature",
        "cargo": "frontend",
        "responsible": "cmartinezs",
        "taskname": "mercado",
        "role": "tlead",
        "numtasks": "2",
        "storypoints": "8",
        "ratio": "4,00",
        "status": "done"
    },
    {
        "id": "2",
        "type": "feature",
        "cargo": "backend",
        "responsible": "msolis",
        "taskname": "implementación de base de datos",
        "role": "back",
        "numtasks": "6",
        "storypoints": "8",
        "ratio": "1,33",
        "status": "in progress"
    },
    {
        "id": "3",
        "type": "feature",
        "cargo": "frontend",
        "responsible": "babarca",
        "taskname": "vista de cartera modificada",
        "role": "front",
        "numtasks": "3",
        "storypoints": "5",
        "ratio": "1,67",
        "status": "done"
    },
    {
        "id": "4",
        "type": "feature",
        "cargo": "backend",
        "responsible": "nsepulveda",
        "taskname": "interfaz de usuario para la visualización de precios",
        "role": "back",
        "numtasks": "2",
        "storypoints": "5",
        "ratio": "2,50",
        "status": "done"
    },
    {
        "id": "5",
        "type": "feature",
        "cargo": "frontend",
        "responsible": "scarrascoi",
        "taskname": "boton logo",
        "role": "front",
        "numtasks": "6",
        "storypoints": "8",
        "ratio": "1,33",
        "status": "done"
    },
    {
        "id": "6",
        "type": "feature",
        "cargo": "devops",
        "responsible": "jmalca",
        "taskname": "workflow",
        "role": "infralead",
        "numtasks": "3"
    },
    {
        "id": "7",
        "type": "spike",
        "cargo": "qa",
        "responsible": "pvargasm",
        "taskname": "investigacion sobre pruebas automatizadas",
        "role": "qa",
        "numtasks": "3",
        "storypoints": "3",
        "ratio": "1,00",
        "status": "done"
    },
    {
        "id": "8",
        "type": "spike",
        "cargo": "sec",
        "responsible": "bmirandae",
        "taskname": "esquema de roles de usuario",
        "role": "sec",
        "numtasks": "3",
        "storypoints": "5",
        "ratio": "1,67",
        "status": "done"
    },
    {
        "id": "9",
        "type": "feature",
        "cargo": "backend",
        "responsible": "irojas",
        "taskname": "pub/sub",
        "role": "back",
        "numtasks": "4",
        "storypoints": "8",
        "ratio": "2,00",
        "status": "done"
    },
    {
        "id": "10",
        "type": "feature",
        "cargo": "backend",
        "responsible": "pgalvez",
        "taskname": "api",
        "role": "back",
        "numtasks": "2",
        "storypoints": "5",
        "ratio": "2,50",
        "status": "done"
    },
    {
        "id": "11",
        "type": "feature",
        "cargo": "infra",
        "responsible": "jmalca",
        "taskname": "creacion de pub/sub gcp",
        "role": "infralead",
        "numtasks": "5",
        "storypoints": "5",
        "ratio": "1,00",
        "status": "done"
    },
    {
        "id": "12",
        "type": "feature",
        "cargo": "infra",
        "responsible": "jmalca",
        "taskname": "clonar la rama sprint-2",
        "role": "infralead",
        "numtasks": "1",
        "storypoints": "5",
        "ratio": "5,00",
        "status": "done"
    },
    {
        "id": "13",
        "type": "feature",
        "cargo": "infra",
        "responsible": "jmalca",
        "taskname": "firebase",
        "role": "infralead",
        "numtasks": "2",
        "storypoints": "13",
        "ratio": "6,50",
        "status": "done"
    },
    {
        "id": "14",
        "type": "feature",
        "cargo": "infra",
        "responsible": "jmalca",
        "taskname": "pruebas del pubsub en el frontend",
        "role": "infralead",
        "numtasks": "4",
        "storypoints": "8",
        "ratio": "2,00",
        "status": "in progress"
    },
    {
        "id": "15",
        "type": "feature",
        "cargo": "infra",
        "responsible": "jmalca",
        "taskname": "implementación de un microservicio para enviar un pubsub (api)",
        "role": "infralead",
        "numtasks": "4",
        "storypoints": "8",
        "ratio": "2,00",
        "status": "in progress"
    },
    {
        "id": "16",
        "type": "feature",
        "cargo": "qa",
        "responsible": "pvargasm",
        "taskname": "brechas de seguridad",
        "role": "qa",
        "numtasks": "5",
        "storypoints": "5",
        "ratio": "1,00",
        "status": "done"
    },
    {
        "id": "17",
        "type": "feature",
        "cargo": "frontend",
        "responsible": "babarca",
        "taskname": "mejora vista perfil",
        "role": "front",
        "numtasks": "2",
        "storypoints": "8",
        "ratio": "4,00",
        "status": "done"
    }
];

const registros = [
    {
        "fecha": "09/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "3",
        "discount": "0",
        "faltan": "3",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "nicolás sepúlveda",
        "cargo": "feature",
        "id tarea": "4",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "pablo vargas",
        "cargo": "spike",
        "id tarea": "7",
        "discount": "0",
        "faltan": "3",
        "ratio": "3",
        "producto": "0"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "12",
        "discount": "1",
        "faltan": "0",
        "ratio": "5",
        "producto": "5"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "11",
        "discount": "0",
        "faltan": "5",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "italo rojas",
        "cargo": "feature",
        "id tarea": "9",
        "discount": "0",
        "faltan": "4",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "manuel solis",
        "cargo": "feature",
        "id tarea": "2",
        "discount": "0",
        "faltan": "6",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "manuel solis",
        "cargo": "feature",
        "id tarea": "2",
        "discount": "2",
        "faltan": "4",
        "ratio": "8",
        "producto": "16"
    },
    {
        "fecha": "09/05/2024",
        "responsable": "pablo gálvez",
        "cargo": "feature",
        "id tarea": "10",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "11/05/2024",
        "responsable": "pablo vargas",
        "cargo": "spike",
        "id tarea": "7",
        "discount": "0",
        "faltan": "3",
        "ratio": "3",
        "producto": "0"
    },
    {
        "fecha": "11/05/2024",
        "responsable": "fabían yefi",
        "cargo": "feature",
        "id tarea": "1",
        "discount": "0",
        "faltan": "2",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "11/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "3",
        "discount": "1",
        "faltan": "2",
        "ratio": "5",
        "producto": "5"
    },
    {
        "fecha": "11/05/2024",
        "responsable": "nicolás sepúlveda",
        "cargo": "feature",
        "id tarea": "4",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "11/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "11",
        "discount": "4",
        "faltan": "1",
        "ratio": "5",
        "producto": "20"
    },
    {
        "fecha": "11/05/2024",
        "responsable": "italo rojas",
        "cargo": "feature",
        "id tarea": "9",
        "discount": "2",
        "faltan": "2",
        "ratio": "8",
        "producto": "16"
    },
    {
        "fecha": "11/05/2024",
        "responsable": "pablo gálvez",
        "cargo": "feature",
        "id tarea": "10",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "13/05/2024",
        "responsable": "pablo gálvez",
        "cargo": "feature",
        "id tarea": "10",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "13/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "3",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "13/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "11",
        "discount": "0",
        "faltan": "1",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "13/05/2024",
        "responsable": "pablo vargas",
        "cargo": "spike",
        "id tarea": "7",
        "discount": "1",
        "faltan": "2",
        "ratio": "3",
        "producto": "3"
    },
    {
        "fecha": "13/05/2024",
        "responsable": "manuel solis",
        "cargo": "feature",
        "id tarea": "2",
        "discount": "0",
        "faltan": "4",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "13/05/2024",
        "responsable": "italo rojas",
        "cargo": "feature",
        "id tarea": "9",
        "discount": "0",
        "faltan": "2",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "15/05/2024",
        "responsable": "cristóbal martinez",
        "cargo": "feature",
        "id tarea": "1",
        "discount": "0",
        "faltan": "2",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "15/05/2024",
        "responsable": "italo rojas",
        "cargo": "feature",
        "id tarea": "9",
        "discount": "2",
        "faltan": "0",
        "ratio": "8",
        "producto": "16"
    },
    {
        "fecha": "15/05/2024",
        "responsable": "manuel solis",
        "cargo": "feature",
        "id tarea": "2",
        "discount": "2",
        "faltan": "2",
        "ratio": "8",
        "producto": "16"
    },
    {
        "fecha": "15/05/2024",
        "responsable": "pablo vargas",
        "cargo": "spike",
        "id tarea": "7",
        "discount": "0",
        "faltan": "2",
        "ratio": "3",
        "producto": "0"
    },
    {
        "fecha": "15/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "11",
        "discount": "0",
        "faltan": "1",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "15/05/2024",
        "responsable": "simon carrasco",
        "cargo": "feature",
        "id tarea": "5",
        "discount": "2",
        "faltan": "4",
        "ratio": "8",
        "producto": "16"
    },
    {
        "fecha": "15/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "3",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "17/05/2024",
        "responsable": "pablo gálvez",
        "cargo": "feature",
        "id tarea": "10",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "17/05/2024",
        "responsable": "pablo vargas",
        "cargo": "spike",
        "id tarea": "7",
        "discount": "0",
        "faltan": "2",
        "ratio": "3",
        "producto": "0"
    },
    {
        "fecha": "17/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "3",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "17/05/2024",
        "responsable": "cristóbal martinez",
        "cargo": "feature",
        "id tarea": "1",
        "discount": "0",
        "faltan": "2",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "19/05/2024",
        "responsable": "pablo gálvez",
        "cargo": "feature",
        "id tarea": "10",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "19/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "3",
        "discount": "2",
        "faltan": "0",
        "ratio": "5",
        "producto": "10"
    },
    {
        "fecha": "19/05/2024",
        "responsable": "cristóbal martinez",
        "cargo": "feature",
        "id tarea": "1",
        "discount": "0",
        "faltan": "2",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "19/05/2024",
        "responsable": "nicolás sepúlveda",
        "cargo": "feature",
        "id tarea": "4",
        "discount": "0",
        "faltan": "2",
        "ratio": "5",
        "producto": "0"
    },
    {
        "fecha": "19/05/2024",
        "responsable": "bruno miranda",
        "cargo": "spike",
        "id tarea": "8",
        "discount": "3",
        "faltan": "0",
        "ratio": "5",
        "producto": "15"
    },
    {
        "fecha": "19/05/2024",
        "responsable": "manuel solis",
        "cargo": "feature",
        "id tarea": "2",
        "discount": "0",
        "faltan": "2",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "19/05/2024",
        "responsable": "simon carrasco",
        "cargo": "feature",
        "id tarea": "5",
        "discount": "4",
        "faltan": "0",
        "ratio": "8",
        "producto": "32"
    },
    {
        "fecha": "21/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "11",
        "discount": "1",
        "faltan": "0",
        "ratio": "5",
        "producto": "5"
    },
    {
        "fecha": "21/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "13",
        "discount": "2",
        "faltan": "0",
        "ratio": "13",
        "producto": "26"
    },
    {
        "fecha": "21/05/2024",
        "responsable": "nicolás sepúlveda",
        "cargo": "feature",
        "id tarea": "4",
        "discount": "1",
        "faltan": "1",
        "ratio": "5",
        "producto": "5"
    },
    {
        "fecha": "21/05/2024",
        "responsable": "pablo vargas",
        "cargo": "spike",
        "id tarea": "7",
        "discount": "2",
        "faltan": "0",
        "ratio": "3",
        "producto": "6"
    },
    {
        "fecha": "21/05/2024",
        "responsable": "pablo gálvez",
        "cargo": "feature",
        "id tarea": "10",
        "discount": "2",
        "faltan": "0",
        "ratio": "5",
        "producto": "10"
    },
    {
        "fecha": "23/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "17",
        "discount": "1",
        "faltan": "1",
        "ratio": "8",
        "producto": "8"
    },
    {
        "fecha": "25/05/2024",
        "responsable": "benjamín abarca",
        "cargo": "feature",
        "id tarea": "17",
        "discount": "1",
        "faltan": "0",
        "ratio": "8",
        "producto": "8"
    },
    {
        "fecha": "25/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "14",
        "discount": "0",
        "faltan": "4",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "25/05/2024",
        "responsable": "josé malca",
        "cargo": "feature",
        "id tarea": "15",
        "discount": "0",
        "faltan": "4",
        "ratio": "8",
        "producto": "0"
    },
    {
        "fecha": "25/05/2024",
        "responsable": "pablo vargas",
        "cargo": "feature",
        "id tarea": "16",
        "discount": "5",
        "faltan": "0",
        "ratio": "5",
        "producto": "25"
    },
    {
        "fecha": "25/05/2024",
        "responsable": "nicolás sepúlveda",
        "cargo": "feature",
        "id tarea": "4",
        "discount": "1",
        "faltan": "0",
        "ratio": "5",
        "producto": "5"
    },
    {
        "fecha": "27/05/2024",
        "responsable": "cristóbal martinez",
        "cargo": "feature",
        "id tarea": "1",
        "discount": "1",
        "faltan": "1",
        "ratio": "8",
        "producto": "8"
    },
    {
        "fecha": "27/05/2024",
        "responsable": "cristóbal martinez",
        "cargo": "feature",
        "id tarea": "1",
        "discount": "1",
        "faltan": "0",
        "ratio": "8",
        "producto": "8"
    }
];

router.get('/cargo/:cargo', (req, res) => {
    const cargo = req.params.cargo.toLowerCase();
    const validCargos = ['frontend', 'backend', 'devops', 'qa', 'infra', 'sec'];

    if (!validCargos.includes(cargo)) {
        return res.status(400).json({ error: 'Cargo no válido' });
    }

    const uniqueTaskIds = new Set();

    registros.forEach(registro => {
        if (registro.cargo === cargo) {
            uniqueTaskIds.add(registro["id tarea"]);
        }
    });

    const totalTasks = uniqueTaskIds.size;

    let terminadas = 0;
    let inProgress = 0;

    uniqueTaskIds.forEach(taskId => {
        const tarea = tasks.find(t => t.id === taskId && t.cargo === cargo);
        if (tarea) {
            const taskStatus = registros.find(r => r["id tarea"] === taskId && r.cargo === cargo);
            if (taskStatus.discount === "0") {
                terminadas++;
            } else {
                inProgress++;
            }
        }
    });

    const porcentajeTerminadas = (terminadas / totalTasks) * 100;
    const porcentajeInProgress = (inProgress / totalTasks) * 100;

    res.json({
        total: totalTasks,
        terminadas: {
            cantidad: terminadas,
            porcentaje: porcentajeTerminadas.toFixed(2) + '%'
        },
        inProgress: {
            cantidad: inProgress,
            porcentaje: porcentajeInProgress.toFixed(2) + '%'
        }
    });
});


router.get('/usuario/:usuario', (req, res) => {
    const usuario = req.params.usuario.toLowerCase();

    const validUsers = ['cmartinezs', 'msolis', 'babarca', 'benjamín abarca', 'nicolás sepúlveda', 'pablo vargas', 'josé malca', 'italo rojas'];

    if (!validUsers.includes(usuario)) {
        return res.status(400).json({ error: 'Usuario no válido' });
    }

    const uniqueTaskIds = new Set();

    registros.forEach(registro => {
        if (registro.responsable.toLowerCase() === usuario) {
            uniqueTaskIds.add(registro["id tarea"]);
        }
    });

    const totalTasks = uniqueTaskIds.size;

    let terminadas = 0;
    let inProgress = 0;

    uniqueTaskIds.forEach(taskId => {
        const tarea = tasks.find(t => t.id === taskId);
        if (tarea) {
            const taskStatus = registros.find(r => r["id tarea"] === taskId);
            if (taskStatus.discount === "0") {
                terminadas++;
            } else {
                inProgress++;
            }
        }
    });

    const porcentajeTerminadas = (terminadas / totalTasks) * 100;
    const porcentajeInProgress = (inProgress / totalTasks) * 100;

    res.json({
        total: totalTasks,
        terminadas: {
            cantidad: terminadas,
            porcentaje: porcentajeTerminadas.toFixed(2) + '%'
        },
        inProgress: {
            cantidad: inProgress,
            porcentaje: porcentajeInProgress.toFixed(2) + '%'
        }
    });
});


module.exports = router;



