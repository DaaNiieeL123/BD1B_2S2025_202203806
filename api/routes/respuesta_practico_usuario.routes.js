const express = require('express');
const router = express.Router();
const respuestaPracticoController = require('../controllers/respuesta_practico_usuario.controller');

router.get('/', respuestaPracticoController.getAll);
router.get('/:id', respuestaPracticoController.getById);
router.post('/', respuestaPracticoController.create);
router.put('/:id', respuestaPracticoController.update);
router.delete('/:id', respuestaPracticoController.delete);

module.exports = router;
