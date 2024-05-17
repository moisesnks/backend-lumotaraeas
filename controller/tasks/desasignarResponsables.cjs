const { db } = require('../../config.cjs');

async function desasignarResponsables(id, responsables) {
    console.log('Llegó a desasignarResponsables', id, responsables);

    const usuariosRef = db.collection('users');
    const usuariosSnapshot = await usuariosRef.get();
    const usuariosMap = new Map(usuariosSnapshot.docs.map(doc => [doc.id, doc]));

    // Verificar que todos los uids de responsables existan en la base de datos
    const responsablesNoExistentes = responsables.filter(uid => !usuariosMap.has(uid));
    if (responsablesNoExistentes.length) {
        throw new Error(`Los siguientes uids no existen: ${responsablesNoExistentes.join(', ')}`);
    }

    const taskRef = db.collection('tasks').doc(id);

    try {
        await db.runTransaction(async (transaction) => {
            const taskDoc = await transaction.get(taskRef);
            if (!taskDoc.exists) {
                throw new Error('La tarea no existe');
            }

            const taskData = taskDoc.data();
            const responsablesActuales = new Set(taskData.responsables || []);
            responsables.forEach(uid => responsablesActuales.delete(uid));
            const responsablesFinales = Array.from(responsablesActuales);

            // Actualizar la tarea con los responsables restantes
            transaction.update(taskRef, { responsables: responsablesFinales });

            // Actualizar la lista de tareas de cada usuario responsable
            for (const uid of responsables) {
                const userDoc = usuariosMap.get(uid);
                const userTasks = new Set(userDoc.data().tasks || []);
                userTasks.delete(id);
                transaction.update(usuariosRef.doc(uid), { tasks: Array.from(userTasks) });
            }
        });

        console.log('Responsables desasignados y tareas actualizadas exitosamente');
    } catch (error) {
        console.error('Error al desasignar responsables y tareas:', error);
        throw error;
    }
}

module.exports = desasignarResponsables;
