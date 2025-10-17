const express = require('express');
const router = express.Router();
const consultasController = require('../controllers/consultas.controller');

// CONSULTA 1: Estadísticas por centro y escuela
router.get('/estadisticas-centros', consultasController.estadisticasPorCentro);

// CONSULTA 2: Ranking de evaluadores
router.get('/ranking-evaluadores', consultasController.rankingEvaluadores);

// CONSULTA 3: Pregunta más difícil
router.get('/pregunta-dificil', consultasController.preguntaMasDificil);

// CONSULTA GENERAL: SQL personalizado
router.post('/general', consultasController.consultaGeneral);

module.exports = router;
