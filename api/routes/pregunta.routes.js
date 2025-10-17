const express = require('express');
const router = express.Router();
const preguntaController = require('../controllers/pregunta.controller');

router.get('/', preguntaController.getAll);
router.get('/:id', preguntaController.getById);
router.post('/', preguntaController.create);
router.put('/:id', preguntaController.update);
router.delete('/:id', preguntaController.delete);

module.exports = router;
