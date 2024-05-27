const express = require('express')
const router = express.Router();

const burndownData = [
    { fecha: "2024-05-06", estimate: 107.000000, real: 107.000000 },
    { fecha: "2024-05-07", estimate: 101.904762, real: 107.000000 },
    { fecha: "2024-05-08", estimate: 96.809524, real: 107.000000 },
    { fecha: "2024-05-09", estimate: 91.714286, real: 99.333333 },
    { fecha: "2024-05-10", estimate: 86.619048, real: 99.333333 },
    { fecha: "2024-05-11", estimate: 81.523810, real: 89.666667 },
    { fecha: "2024-05-12", estimate: 76.428571, real: 89.666667 },
    { fecha: "2024-05-13", estimate: 71.333333, real: 88.666667 },
    { fecha: "2024-05-14", estimate: 66.238095, real: 88.666667 },
    { fecha: "2024-05-15", estimate: 61.142857, real: 79.333333 },
    { fecha: "2024-05-16", estimate: 56.047619, real: 79.333333 },
    { fecha: "2024-05-17", estimate: 50.952381, real: 79.333333 },
    { fecha: "2024-05-18", estimate: 45.857143, real: 79.333333 },
    { fecha: "2024-05-19", estimate: 40.761905, real: 65.666667 },
    { fecha: "2024-05-20", estimate: 35.666667, real: 65.666667 },
    { fecha: "2024-05-21", estimate: 30.571429, real: 42.166667 },
    { fecha: "2024-05-22", estimate: 25.476190, real: 42.166667 },
    { fecha: "2024-05-23", estimate: 20.380952, real: 38.166667 },
    { fecha: "2024-05-24", estimate: 15.285714, real: 38.166667 },
    { fecha: "2024-05-25", estimate: 10.190476, real: 26.666667 },
    { fecha: "2024-05-26", estimate: 5.095238, real: 26.666667 },
    { fecha: "2024-05-27", estimate: 0.000000, real: 18.666667 }
];

router.get('/', (req, res) => {
    res.json({ burndownData });
});

module.exports = router;
