const express = require('express');
const router = express.Router();
const preguntaPracticoController = require('../controllers/pregunta_practico.controller');

router.get('/', preguntaPracticoController.getAll);
router.get('/:id', preguntaPracticoController.getById);
router.post('/', preguntaPracticoController.create);
router.put('/:id', preguntaPracticoController.update);
router.delete('/:id', preguntaPracticoController.delete);

module.exports = router;
