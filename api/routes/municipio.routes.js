const express = require('express');
const router = express.Router();
const municipioController = require('../controllers/municipio.controller');

router.get('/', municipioController.getAll);
router.get('/:id', municipioController.getById);
router.post('/', municipioController.create);
router.put('/:id', municipioController.update);
router.delete('/:id', municipioController.delete);

module.exports = router;
