const express = require('express');
const router = express.Router();
const respuestaUsuarioController = require('../controllers/respuesta_usuario.controller');

router.get('/', respuestaUsuarioController.getAll);
router.get('/:id', respuestaUsuarioController.getById);
router.post('/', respuestaUsuarioController.create);
router.put('/:id', respuestaUsuarioController.update);
router.delete('/:id', respuestaUsuarioController.delete);

module.exports = router;
