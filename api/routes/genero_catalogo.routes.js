const express = require('express');
const router = express.Router();
const generoController = require('../controllers/genero_catalogo.controller');

router.get('/', generoController.getAll);
router.get('/:id', generoController.getById);
router.post('/', generoController.create);
router.put('/:id', generoController.update);
router.delete('/:id', generoController.delete);

module.exports = router;
