// Path: utils/index.js


export const parsearFecha = (fecha) => {
    const fechaUnix = fecha.seconds * 1000 + fecha.nanoseconds / 1000000;
    return new Date(fechaUnix);
}

export const extraerReferencia = (referencia) => {
    if (referencia && referencia.path) {
        const segments = referencia.path.split('/');
        return segments[segments.length - 1];
    }
    return null;
};