const express = require('express');
const router = express.Router();
const centroController = require('../controllers/centro.controller');

router.get('/', centroController.getAll);
router.get('/:id', centroController.getById);
router.post('/', centroController.create);
router.put('/:id', centroController.update);
router.delete('/:id', centroController.delete);

module.exports = router;
